var express = require('express');
var router = express.Router();

// Require controller modules
var tshirts_controller = require('../controllers/tshirtscontroller.js');

// GET catalog home page / list all tshirts in collection
//router.get('/', tshirts_controller.index);

router.get('/', tshirts_controller.additems);

module.exports = router;