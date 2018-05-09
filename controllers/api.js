const util = require('util');
const request = require('request');
const graph = require('fbgraph');
// const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
// const clockwork = require('clockwork')({ key: process.env.CLOCKWORK_KEY });
// const lob = require('lob')(process.env.LOB_KEY);

/**
 * GET /api
 * List of API examples.
 */
exports.getApi = (req, res) => {
  res.render('api/index', {
    title: 'API Examples'
  });
};

/**
 * GET /api/facebook
 * Facebook API example.
 */
exports.getFacebook = (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === 'facebook');
  graph.setAccessToken(token.accessToken);
  graph.get(`${req.user.facebook}?fields=id,name,email,first_name,last_name,gender,link,locale,timezone`, (err, profile) => {
    if (err) { return next(err); }
    res.render('api/facebook', {
      title: 'Facebook API',
      profile
    });
  });
};

/**
 * GET /api/twilio
 * Twilio API example.
 */
// exports.getTwilio = (req, res) => {
//   res.render('api/twilio', {
//     title: 'Twilio API'
//   });
// };

/**
 * POST /api/twilio
 * Send a text message using Twilio.
 */
// exports.postTwilio = (req, res, next) => {
//   req.assert('number', 'Phone number is required.').notEmpty();
//   req.assert('message', 'Message cannot be blank.').notEmpty();

//   const errors = req.validationErrors();

//   if (errors) {
//     req.flash('errors', errors);
//     return res.redirect('/api/twilio');
//   }

//   const message = {
//     to: req.body.number,
//     from: '+13472235148',
//     body: req.body.message
//   };
//   twilio.sendMessage(message, (err, responseData) => {
//     if (err) { return next(err.message); }
//     req.flash('success', { msg: `Text sent to ${responseData.to}.` });
//     res.redirect('/api/twilio');
//   });
// };

/**
 * GET /api/clockwork
 * Clockwork SMS API example.
 */
// exports.getClockwork = (req, res) => {
//   res.render('api/clockwork', {
//     title: 'Clockwork SMS API'
//   });
// };

/**
 * POST /api/clockwork
 * Send a text message using Clockwork SMS
 */
// exports.postClockwork = (req, res, next) => {
//   const message = {
//     To: req.body.telephone,
//     From: 'Hackathon',
//     Content: 'Hello from the Hackathon Starter'
//   };
//   clockwork.sendSms(message, (err, responseData) => {
//     if (err) { return next(err.errDesc); }
//     req.flash('success', { msg: `Text sent to ${responseData.responses[0].to}` });
//     res.redirect('/api/clockwork');
//   });
// };


/**
 * GET /api/lob
 * Lob API example.
 */
exports.getLob = (req, res, next) => {
  lob.routes.list({ zip_codes: ['10007'] }, (err, routes) => {
    if (err) { return next(err); }
    res.render('api/lob', {
      title: 'Lob API',
      routes: routes.data[0].routes
    });
  });
};

/**
 * GET /api/upload
 * File Upload API example.
 */

// exports.getFileUpload = (req, res) => {
//   res.render('api/upload', {
//     title: 'File Upload'
//   });
// };

// exports.postFileUpload = (req, res) => {
//   req.flash('success', { msg: 'File was uploaded successfully.' });
//   res.redirect('/api/upload');
// };

