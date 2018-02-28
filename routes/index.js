var express = require('express');
var router = express.Router();

// Require controller modules
var tshirts_controller = require('../controllers/tshirtscontroller.js');

/*
// GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: '193Tees', testList: [1,2,3], countdata: {tshirts_count:5} });
  //res.redirect('/catalog');
});
*/

// GET catalog home page / list all tshirts in collection
router.get('/', tshirts_controller.index);

router.get('/index', tshirts_controller.index);

module.exports = router;
