var Tshirts = require('../models/tshirts.js');
var async = require('async');
var ipn = require('../passport/ipnhandler');

exports.index = function(req, res) {
    //res.send("NOT IMPLEMENTED: Site Home Page");
    async.parallel({
        tshirts_count: function(callback) {
            Tshirts.count(callback);
        },
        tshirts_objects: function(callback) {
            Tshirts.find(callback).sort( { itemid:-1 } );
        }
    }, function(err, results) {
        res.render('index', {title: '193Tees', error: err, data: results});
    });
};

// Display add item page
exports.additems = function(req, res) {
    async.parallel({
        tshirts_count: function(callback) {
            Tshirts.count(callback);
        },
        tshirts_objects: function(callback) {
            Tshirts.find(callback).sort( { itemid:-1 } );
        }
    }, function(err, results) {
        res.render('additems', {title: '193Tees', error: err, data: results});
    });
};

// Add items to database and display confimation page
exports.additem_confirmation = function(req, res){
    var newt = new Tshirts({
                itemid: req.query.iid,
                name: req.query.tname,
                price: req.query.tprice,
                color: req.query.col,
                description: req.query.desc,
                sold: 0,
                stock: [0,0,0],
                sizes: ["Small","Medium","Large"],
                paypal_id: req.query.pid,
                pic_count: req.query.picc,
                artistid: req.query.aid,
                artistname: req.query.aname
            });

    if(newt.name) {
        newt.save()
            .then(item => {
                res.render('additems_confirmation', {title: 'Add Confirmation'});
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });
    } else {
        res.status(400).send("unable to save to database, no name given");
    }
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

// Display the about page
exports.about = function(req, res) {
    res.render('about', {title: 'About Us'});
}
// Display the submit design page
exports.submitdesign = function(req, res) {
    res.render('submitdesign', {title: 'submitdesign'});
}

// Display the order confimation page
exports.confirmation = function(req, res){
    res.render('confirmation', {title: 'Confirmation'});
}

// Display the Terms page
exports.terms = function(req, res) {
    res.render('terms', {title: 'Terms of Service'});
}

// Display the privacy policy page
exports.privacypolicy = function(req, res) {
    res.render('privacypolicy', {title: 'Privacy Policy'});
}

// handle paypal ipn posts
exports.paypalipn = function(req, res) {
    ipn.ipnHandler(req,res);
}
