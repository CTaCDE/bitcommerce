var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// For additional routes in the users route
router.get('/cool', function(req, res, next) {
    res.send('you helllaa cool');
});

module.exports = router;
