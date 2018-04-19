var Myaccount = require('../models/myaccount.js');
var async = require('async');

exports.myaccount_list = function(req, res) {
    //res.send("NOT IMPLEMENTED: Log Page");
    async.parallel({
        myaccount_count: function(callback) {
            Myaccount.count(callback);
        },
        myaccount_objects: function(callback) {
            Myaccount.find(callback);
            console.log(callback);
        }
    }, function(err, results) {
        console.log(results);
        res.render('myaccount', {title: '193Tees myaccount', error: err, data: results});
    });
};




 