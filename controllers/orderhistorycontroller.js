var Orderhistory = require('../models/orderhistory.js');
var async = require('async');
var OC = require('../models/orderconfirmations.js');

merge_emails = function(req) {
    OC.find({'email': req.user.email}, function(err, em) {
        if(err) return console.error(err);
        for(var i = 0; i < em.length; i++) {
            Orderhistory.findOneAndUpdate({txn_id: em[i].tx}, {$set : {'tees_email' : req.user.email}}, function(err, oh) {
                if(err) return console.error(err);
            });
        }
    }); 
}

delete_merged_emails = function(req) {
    OC.remove({ 'email': req.user.email }, (err) => {
        if (err) { return next(err); }
    });
}

exports.orders_list = function(req, res) {
    merge_emails(req);
   // delete_merged_emails(req);

    async.parallel({
        orderhistory_count: function(callback) {
            Orderhistory.count(callback);
        },
//        orderhistory_objects: function(callback) {
//            Orderhistory.find({'payer_email': req.user.email}, callback);
//        },
        orderhistory_objects2: function(callback) {
            Orderhistory.find({'tees_email': req.user.email}, callback).sort( { payment_date:-1 } );
        },
    }, function(err, results) {
        res.render('orderhistory', {title: '193Tees Orders', error: err, data: results});
    });
};
