var Tshirts = require('../models/tshirts.js');
var async = require('async');

exports.index = function(req, res) {
    //res.send("NOT IMPLEMENTED: Site Home Page");
    async.parallel({
        tshirts_count: function(callback) {
            Tshirts.count(callback);
        },
        tshirts_objects: function(callback) {
            Tshirts.find(callback);
        }
    }, function(err, results) {
        res.render('index', {title: '193Tees', error: err, data: results});
    });
};

// Display list of all tshirts
exports.tshirts_list = function(req, res) {
    res.send('NOT IMPLEMENTED: tshirts_list');
};

// Display detail page for specific tshirts
exports.tshirts_detail = function(req, res) {
    //res.send('NOT IMPLEMENTED: tshirts_detail ' + req.params.itemid);
    async.parallel({
        tshirts_object: function(callback) {
            Tshirts.find({'itemid': req.params.itemid}, callback);
        }
    }, function(err, results) {
        res.render('details', {title: '193Tees', error:err, data: results});
    });
};

exports.about = function(req, res) {
    res.render('about', {title: 'About Us'});
}

exports.confirmation = function(req, res){
    res.render('confirmation', {title: 'Confirmation'});
}

