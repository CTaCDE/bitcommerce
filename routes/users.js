var express = require('express');
var router = express.Router();

// Require controller modules
var users_controller = require('../controllers/userscontroller.js');

// GET list all artists in collection
router.get('/', users_controller.users_list);

module.exports = router;
