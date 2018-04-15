var myaccount = require('../models/myaccount.js');
var async = require('async');

exports.myaccount_list = function(req, res) {
    //res.send("NOT IMPLEMENTED: Log Page");
    async.parallel({
        myaccount_count: function(callback) {
            myaccount.count(callback);
        },
        myaccount_objects: function(callback) {
            myaccount.find(callback);
        }
    }, function(err, results) {
        res.render('myaccount', {title: '193Tees myaccount', error: err, data: results});
    });
};
