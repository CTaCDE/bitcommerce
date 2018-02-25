var express = require('express');
var router = express.Router();

// Require controller modules
var tshirts_controller = require('../controllers/tshirtscontroller.js');

// GET request for one tshirt
router.get('/:itemid', tshirts_controller.tshirts_detail);

// redirect a details request with no item id to index
router.get('/', tshirts_controller.index);

module.exports = router;
