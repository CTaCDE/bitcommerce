var Users = require('../models/users.js');
var async = require('async');

exports.users_list = function(req, res) {
    //res.send("NOT IMPLEMENTED: Site Home Page");
    async.parallel({
        users_count: function(callback) {
            Users.count(callback);
        },
        users_objects: function(callback) {
            Users.find(callback);
        }
    }, function(err, results) {
        res.render('users', {title: '193Tees User', error: err, data: results});
    });
};
