// File: ./models/artists.js

// Require Mongoose
var mongoose = require('mongoose');

// Define a scheme
var Schema = mongoose.Schema;

var myaccountSchema = new Schema({
    userID:         {type: Number},
    name:           {type: String},
    email:          {type: String},
    orderHistory:   {type: Array},
});

module.exports = mongoose.model('myaccount', myaccountSchema);
