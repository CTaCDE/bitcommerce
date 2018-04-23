var express = require('express');
var router = express.Router();

// Require controller modules
var orderhistory_controller = require('../controllers/orderhistorycontroller.js');

// GET list all artists in collection
router.get('/', orderhistory_controller.orders_list);

module.exports = router;
