// File: ./models/tshirts.js

// Require Mongoose
var mongoose = require('mongoose');

// Define a scheme
var Schema = mongoose.Schema;

var TshirtsSchema = new Schema({
    itemid:         {type: Number},
    price:          {type: Number},
    name:           {type: String},
    color:          {type: String},
    description:    {type: String},
    sold:           {type: Number},
    stock:          {type: Array},
    sizes:          {type: Array},
    paypal_id:      {type: String},
    pic_count:      {type: Number}
});

module.exports = mongoose.model('tshirts', TshirtsSchema);

