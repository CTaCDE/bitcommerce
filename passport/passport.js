var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/users');
var session = require('express-session');

module.exports = function(app, passport) {

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { secure: true } }));

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });

    passport.use(new FacebookStrategy({
        clientID: '2054747968144280',
        clientSecret: 'd34fb30aa553faf7c2238bcaaa44ed6d',
        callbackURL: "https://www.193tees.com/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email']
      },
      function(accessToken, refreshToken, profile, done) {
        console.log(profile);

        // User.findOrCreate(..., function(err, user) {
        //   if (err) { return done(err); }
        //   done(null, user);
        // });
        done(null, profile);
      }
    ));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/artists' }));

    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    return passport;
}


