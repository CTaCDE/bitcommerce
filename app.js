// Include dependency modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nconf = require('nconf');
var passport = require('passport');
const dotenv = require('dotenv');
const expressStatusMonitor = require('express-status-monitor');
const compression = require('compression');
const expressValidator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const lusca = require('lusca');
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, 'uploads') });

// Define all of the routes
var index = require('./routes/index');
var users = require('./routes/users');
var details = require('./routes/details');
var artists = require('./routes/artists');
var about = require('./routes/about');
var confirmation = require('./routes/confirmation');
var logs = require('./routes/logs');
var terms = require('./routes/terms');
var privacypolicy = require('./routes/privacypolicy');
var additems = require('./routes/additems');
// var submitdesign = require('./routes/submitdesign');
var orderhistory = require('./routes/orderhistory');
var paypalipn = require('./routes/paypalipn');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env' });


/**
 * Controllers (route handlers).
 */
const userController = require('./controllers/userscontroller');
const apiController = require('./controllers/api');
const orderController = require('./controllers/orderhistorycontroller');
const logs_controller = require('./controllers/logscontroller.js');
const tshirts_controller = require('./controllers/tshirtscontroller.js');

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');

/**
 * Create Express server.
 */
var app = express();

// Read in keys and secrets. Using nconf use can set secrets via
// environment variables, command-line arguments, or a keys.json file.
nconf.argv().env().file('keys.json');

// Set up mongoose connection
// extract info from keys.json
const user = nconf.get('mongoUser');
const pass = nconf.get('mongoPass');
const host = nconf.get('mongoHost');
const port = nconf.get('mongoPort');
var uri = `mongodb://${user}:${pass}@${host}:${port}`;
if (nconf.get('mongoDatabase')) {
    uri = `${uri}/${nconf.get('mongoDatabase')}`;
}
var mongoose = require('mongoose');
mongoose.connect(uri);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


/**
 * Express configuration.
 */
//app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
//app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(expressStatusMonitor());
app.use(compression());
// app.use(sass({
//   src: path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public')
// }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true,
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  if (req.path === '/api/upload') {
    next();
  } else if (req.path === '/submitdesign') {
    next();
  } else if (req.path === '/paypalipn') {
    next();
  } else {
    lusca.csrf()(req, res, next);
  }
});
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user &&
    req.path !== '/login' &&
    req.path !== '/signup' &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)) {
    req.session.returnTo = req.originalUrl;
  } else if (req.user &&
    (req.path === '/account' || req.path.match(/^\/api/))) {
    req.session.returnTo = req.originalUrl;
  }
  next();
});
//app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

// Allow https connections
app.enable("trust proxy");

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Primary app routes.
 */
//app.get('/', homeController.index);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
//app.get('/contact', contactController.getContact);
//app.post('/contact', contactController.postContact);
app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
app.get('/orderhistory', passportConfig.isAuthenticated, orderController.orders_list);
app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
app.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);

app.get('/logs', passportConfig.isAuthenticated, logs_controller.logs_list);
app.get('/additems', passportConfig.isAuthenticated, tshirts_controller.additems);
app.get('/additems', passportConfig.isAuthenticated, tshirts_controller.addartist_confirmation);
app.post('/additems', passportConfig.isAuthenticated, tshirts_controller.additem_confirmation);
app.post('/newsletters', userController.getNewsletter);
app.post('/unsubscribe', userController.unsubscribeNewsletter);
app.get('/editentry/tshirt/:itemid', passportConfig.isAuthenticated, tshirts_controller.editentry_shirt);

app.post('/delete_entry/tshirt', passportConfig.isAuthenticated, tshirts_controller.postDeleteTshirt);
app.post('/delete_entry/artist', passportConfig.isAuthenticated, tshirts_controller.postDeleteArtist);
app.post('/update_entry/tshirt', passportConfig.isAuthenticated, tshirts_controller.postUpdateTshirt);

// Our routes
app.use('/', index);
app.use('/users', users);
app.use('/details', details);
app.use('/artists', artists);
app.use('/about', about);
app.use('/confirmation', confirmation);
app.use('/terms',terms);
app.use('/privacypolicy', privacypolicy);
// app.use('/submitdesign', submitdesign);
// app.use('/orderhistory', orderhistory);
app.use('/paypalipn', paypalipn);
app.use('/logs', logs);
app.use('/additems', additems);


/**
 * API examples routes.
 */
app.get('/api', apiController.getApi);
// app.get('/api/twilio', apiController.getTwilio);
// app.post('/api/twilio', apiController.postTwilio);
// app.get('/api/clockwork', apiController.getClockwork);
// app.post('/api/clockwork', apiController.postClockwork);
// app.get('/api/facebook', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);
// app.get('/api/lob', apiController.getLob);
// app.get('/api/upload', apiController.getFileUpload);
// app.post('/api/upload', upload.single('myFile'), apiController.postFileUpload);

app.get('/submitdesign', passportConfig.isAuthenticated, apiController.getFileUpload);
app.post('/submitdesign', upload.single('myFile'), apiController.postFileUpload);

/**
 * OAuth authentication routes. (Sign in)
 */
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


/**
 * Google Analytics - Version Checking integration.
 */
'use strict';

app.enable('trust proxy');

// The following environment variable is set by app.yaml when running on App
// Engine, but will need to be set manually when running locally. See README.md.
const GA_TRACKING_ID = process.env.GA_TRACKING_ID;

function trackEvent (category, action, label, value, cb) {
  const data = {
    // API Version.
    v: '1',
    // Tracking ID / Property ID.
    tid: GA_TRACKING_ID,
    // Anonymous Client Identifier. Ideally, this should be a UUID that
    // is associated with particular user, device, or browser instance.
    cid: '555',
    // Event hit type.
    t: 'event',
    // Event category.
    ec: category,
    // Event action.
    ea: action,
    // Event label.
    el: label,
    // Event value.
    ev: value
  };

  return got.post('http://www.google-analytics.com/collect', {
    form: data
  });
}

app.get('/', (req, res, next) => {
  // Event value must be numeric.
  trackEvent('Example category', 'Example action', 'Example label', '100')
    .then(() => {
      res.status(200).send('Event tracked.').end();
    })
    // This sample treats an event tracking error as a fatal error. Depending
    // on your application's needs, failing to track an event may not be
    // considered an error.
    .catch(next);
});

module.exports = app;

