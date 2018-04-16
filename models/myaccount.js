// File: ./models/artists.js

// Require Mongoose
var mongoose = require('mongoose');

// Define a scheme
var Schema = mongoose.Schema;

var MyaccountSchema = new Schema({
    orderid: 			{type: Number},
    item_id_list: 		{type: Array},
    quantity_list: 		{type: Array},
    order_date: 		{type: String},
    size_list: 			{type: Array}
});

module.exports = mongoose.model('myaccount', MyaccountSchema);
