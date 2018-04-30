var express = require('express');
var router = express.Router();

// Require controller modules
var tshirts_controller = require('../controllers/tshirtscontroller.js');

// redirect a details request with no item id to index
router.post('/', tshirts_controller.paypalipn);

module.exports = router;