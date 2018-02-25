var Tshirts = require('../models/tshirts.js');
var async = require('async');

exports.index = function(req, res) {
    //res.send("NOT IMPLEMENTED: Site Home Page");
    async.parallel({
        tshirts_count: function(callback) {
            Tshirts.count(callback);
        }

    }, function(err, results) {
        res.render('index', {title: '193Tees', error: err, countdata: results, testList: [1,2,3]});
    });
};

// Display list of all tshirts
exports.tshirts_list = function(req, res) {
    res.send('NOT IMPLEMENTED: tshirts_list');
};

// Display detail page for specific tshirts
exports.tshirts_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: tshirts_detail ' + req.params.itemid);
};

