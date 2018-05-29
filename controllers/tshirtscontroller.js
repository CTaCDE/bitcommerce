var Tshirts = require('../models/tshirts.js');
var async = require('async');
var ipn = require('../passport/ipnhandler');
var Artists = require('../models/artists');
var Newsletters = require('../models/newsletters');

exports.index = function(req, res) {
    //res.send("NOT IMPLEMENTED: Site Home Page");
    async.parallel({
        tshirts_count: function(callback) {
            Tshirts.count(callback);
        },
        tshirts_objects: function(callback) {
            Tshirts.find(callback).sort( { sold:-1, price:-1 } );
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
        },
        artists_objects: function(callback) {
            Artists.find(callback).sort( { artistid:-1 } );
        },
        newsletter_objects: function(callback) {
            Newsletters.find(callback);
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
                artistname: req.query.aname,
                display: "hidden"
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
        res.status(400).send("Add tshirt error: unable to save to database, no name given");
    }

    if(newt.name && newt.artistid) {
        Artists.findOneAndUpdate({artistid: newt.artistid}, {$push : {'designs' : newt.itemid}}, function(err, artist) {
            if(err) return console.error(err);
        });
    }
};


// Add ARTIST to database and display confimation page
exports.addartist_confirmation = function(req, res){
    var newa = new Artists({
                artistid: req.query.arid,
                name: req.query.arname,
                bio: req.query.bio,
                designs: req.query.designs,//array?
                portfoliolink: req.query.link,
                display: "hidden"
            });

    if(newa.name) {
        newa.save()
            .then(item => {
                res.render('additems_confirmation', {title: 'Add Confirmation'});
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });
    } else {
        console.log(newa);
        res.status(400).send("Add artist error: unable to save to database, no name given");

    }

    // if(newt.name && newt.artistid) {
    //     Artists.findOneAndUpdate({artistid: newt.artistid}, {$push : {'designs' : newt.itemid}}, function(err, artist) {
    //         if(err) return console.error(err);
    //     });
    // }
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

/**
 * POST /delete_entry/tshirt/
 * Delete user account.
 */
exports.postDeleteTshirt = (req, res, next) => {
  // removes from database
  // Tshirts.remove({ itemid: req.body.itemid }, (err) => {
  //   if (err) { return next(err); }
  //   req.flash('info', { msg: 'Tshirt ' + req.body.itemid + ' has been deleted.' });
  //   res.redirect('/additems');
  // });
  Tshirts.find({'itemid': req.body.itemid}, function(err, tshirt) {
    var toggle;
    if(err) return console.error(err);
    if(tshirt[0].display == "hidden") {
      toggle = "public";
    } else {
      toggle = "hidden";
    }
    Tshirts.findOneAndUpdate({itemid: req.body.itemid}, {$set : {'display' : toggle}}, function(err, tshirt) {
      if(err) return console.error(err);
      req.flash('info', { msg: 'Tshirt ' + req.body.itemid + ' display has been updated.' });
      res.redirect('/additems');
    });
  });
};

/**
 * POST /delete_entry/artist
 * Delete user account.
 */
exports.postDeleteArtist = (req, res, next) => {
  // removes from database
  // Artists.remove({ artistid: req.body.artistid }, (err) => {
  //   if (err) { return next(err); }
  //   req.flash('info', { msg: 'Artist ' + req.body.artistid + ' has been deleted.' });
  //   res.redirect('/additems');
  // });
  Artists.find({'artistid': req.body.artistid}, function(err, artist) {
    var toggle;
    if(err) return console.error(err);
    if(artist[0].display == "hidden") {
      toggle = "public";
    } else {
      toggle = "hidden";
    }
    Artists.findOneAndUpdate({artistid: req.body.artistid}, {$set : {'display' : toggle}}, function(err, artist) {
      if(err) return console.error(err);
      req.flash('info', { msg: 'Artist ' + req.body.artistid + ' display has been updated.' });
      res.redirect('/additems');
    });
  });
};