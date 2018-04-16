var express = require('express');
var router = express.Router();

// Require controller modules
var myaccount_controller = require('../controllers/myaccountcontroller.js');

// GET list all artists in collection
router.get('/', myaccount_controller.myaccount_list);


module.exports = router;

