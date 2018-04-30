// File: ./models/users.js

// Require Mongoose
var mongoose = require('mongoose');

// Define a scheme
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    name:           {type: String},
    userID:         {type: Number},
    email:          {type: String},
    orders:         {type: Array},
    address:        {type: Array},
    role:  			{type: String}
});

module.exports = mongoose.model('users', UsersSchema);

