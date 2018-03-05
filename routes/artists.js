var express = require('express');
var router = express.Router();

// Require controller modules
var artists_controller = require('../controllers/artistscontroller.js');

// GET list all artists in collection
router.get('/', artists_controller.artists_list);

// GET request for one artist
router.get('/:artistid', artists_controller.artist_detail);

module.exports = router;

