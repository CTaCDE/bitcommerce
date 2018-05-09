// Include dependency modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nconf = require('nconf');
var passport = require('passport');
//var events = require('events');

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
var submitdesign = require('./routes/submitdesign');
var orderhistory = require('./routes/orderhistory');
var paypalipn = require('./routes/paypalipn');

var app = express();
var social = require('./passport/passport')(app, passport);

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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/details', details);
app.use('/artists', artists);
app.use('/about', about);
app.use('/confirmation', confirmation);
app.use('/logs',logs);
app.use('/terms',terms);
app.use('/privacypolicy', privacypolicy);
app.use('/additems', additems);
app.use('/submitdesign', submitdesign);
app.use('/orderhistory', orderhistory);
app.use('/paypalipn', paypalipn);

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


module.exports = app;
