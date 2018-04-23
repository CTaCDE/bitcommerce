var Orderhistory = require('../models/orderhistory.js');
var async = require('async');

exports.orders_list = function(req, res) {
    //res.send("NOT IMPLEMENTED: Site Home Page");
    async.parallel({
        orderhistory_count: function(callback) {
            Orderhistory.count(callback);
        },
        orderhistory_objects: function(callback) {
            Orderhistory.find(callback);
        }
    }, function(err, results) {
        console.log(results);
        res.render('orderhistory', {title: '193Tees Orders', error: err, data: results});
    });
};
