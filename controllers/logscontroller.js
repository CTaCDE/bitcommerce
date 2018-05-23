var Logs = require('../models/logs.js');
var async = require('async');

exports.logs_list = function(req, res) {
    //res.send("NOT IMPLEMENTED: Log Page");
    async.parallel({
        logs_count: function(callback) {
            Logs.count(callback);
        },
        logs_objects: function(callback) {
            Logs.find(callback).sort( { start_timestamp: -1 } );
        }
    }, function(err, results) {
        res.render('logs', {title: '193Tees Logs', error: err, data: results});
    });
};