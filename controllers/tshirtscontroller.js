var Tshirts = require('../models/tshirts.js');
var async = require('async');
var ipn = require('../passport/ipnhandler');
var Artists = require('../models/artists');
var Newsletters = require('../models/newsletters');
var OC = require('../models/orderconfirmations');

// original home page
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

// version 2 home page
exports.secondhome = function(req, res) {
    async.parallel({
        tshirts_count: function(callback) {
            Tshirts.count(callback);
        },
        tshirts_objects: function(callback) {
            Tshirts.find(callback).sort( { itemid: -1 } );
        }
    }, function(err, results) {
        res.render('v2/index', {title: '193Tees', error: err, data: results});
    });
}

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
    //get the paypal transaction ID from param
    if(req.user){
        var em = req.user.email; //get user's email
    } else {
        em = '';
    }
   
    var transaction = new OC({
        tx: req.query.tx,
        email: em
    });
    
    transaction.save()
        .then(item => {
            res.render('confirmation', {title: 'Confirmation'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
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

// GET page to edit tshirt entry
exports.editentry_shirt = function(req, res) {
    async.parallel({
        tshirt_info: function(callback) {
            Tshirts.find({'itemid': req.params.itemid}, callback);
        }
    }, function(err, results) {
        var stockstring = '';
        for(var i = 0; i < results.tshirt_info[0].stock.length; i++) {
            if(i != 0) {
                stockstring += ',';
            }
            stockstring += results.tshirt_info[0].stock[i];
        }
        results.stockstr=stockstring;
        res.render('editentryshirt', {title: '193Tees', error:err, data: results});
    });
};

// GET page to edit artist entry
exports.editentry_artist = function(req, res) {
    async.parallel({
        artist_info: function(callback) {
            Artists.find({'artistid': req.params.artistid}, callback);
        }
    }, function(err, results) {
        var designstring = '';
        for(var i = 0; i < results.artist_info[0].designs.length; i++) {
            if(i != 0) {
                designstring += ',';
            }
            designstring += results.artist_info[0].designs[i];
        }
        results.dstring=designstring;
        res.render('editentryartist', {title: '193Tees', error:err, data: results});
    });
};


/**
 * POST /update_entry/tshirt/
 */
exports.postUpdateTshirt = (req, res, next) => {
    var stocknew = req.body.stk.split(',');
                // sizes: ["Small","Medium","Large"],
                // 
  Tshirts.find({'itemid': req.body.iid}, function(err, tshirt) {
    if(err) return console.error(err);
    Tshirts.findOneAndUpdate({itemid: req.body.iid}, {$set : {'color' : req.body.col, 'name' : req.body.tname, 'price' : req.body.tprice, 'description' : req.body.desc, 'paypal_id' : req.body.pid, 'pic_count' : req.body.picc, 'artistid' : req.body.aid, 'artistname' : req.body.aname, 'stock' : stocknew} }, function(err, tshirt) {
      if(err) return console.error(err);
      req.flash('info', { msg: 'Tshirt ' + req.body.iid + ' has been updated.' });
      res.redirect('/additems');
    });
  });
};


/**
 * POST /update_entry/artist/
 */
exports.postUpdateArtist = (req, res, next) => {
  var designsnew = req.body.designs.split(',');                

  Artists.find({'artistid': req.body.arid}, function(err, artist) {
    if(err) return console.error(err);
    Artists.findOneAndUpdate({artistid: req.body.arid}, {$set : {'name' : req.body.arname, 'bio' : req.body.bio, 'designs' : designsnew, 'portfoliolink' : req.body.link} }, function(err, artist) {
      if(err) return console.error(err);
      req.flash('info', { msg: 'Artist ' + req.body.arid + ' has been updated.' });
      res.redirect('/additems');
    });
  });
};