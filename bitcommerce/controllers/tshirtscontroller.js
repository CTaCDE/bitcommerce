var tshirts = require('../models/tshirts.js');

exports.index = function(req, res) {
    res.send("NOT IMPLEMENTED: Site Home Page");
};

// Display list of all tshirts
exports.tshirts_list = function(req, res) {
    res.send('NOT IMPLEMENTED: tshirts_list');
};

// Display detail page for specific tshirts
exports.tshirts_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: tshirts_detail ' + req.params.itemid);
};

