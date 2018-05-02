var Artists = require('../models/artists.js');
var async = require('async');

exports.artists_list = function(req, res) {
    //res.send("NOT IMPLEMENTED: Site Home Page");
    async.parallel({
        artists_count: function(callback) {
            Artists.count(callback);
        },
        artists_objects: function(callback) {
            Artists.find(callback).sort( { artistid:-1 } );
        }
    }, function(err, results) {
        res.render('artists', {title: '193Tees Artists', error: err, data: results});
    });
};

// Display list of all tshirts
exports.artists_listss = function(req, res) {
    res.send('NOT IMPLEMENTED: artists_list');
};

// Display detail page for specific tshirts
exports.artist_detail = function(req, res) {
    //res.send('NOT IMPLEMENTED: tshirts_detail ' + req.params.itemid);
    async.parallel({
        artists_object: function(callback) {
            Artists.find({'artistid': req.params.artistid}, callback);
        }
    }, function(err, results) {
        res.render('artistsdetail', {title: '193Tees Artists', error:err, data: results});
    });
};
