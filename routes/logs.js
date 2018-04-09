var express = require('express');
var router = express.Router();

// Require controller modules
var logs_controller = require('../controllers/logscontroller.js');

// GET list all logs in collection
router.get('/', logs_controller.logs_list);


module.exports = router;

