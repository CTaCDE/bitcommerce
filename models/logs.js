// File: ./models/artists.js

// Require Mongoose
var mongoose = require('mongoose');

// Define a scheme
var Schema = mongoose.Schema;

var LogsSchema = new Schema({
    start_timestamp: 	{type: String},
    end_timestamp: 		{type: String},
    duration: 			{type: Number},
    contact: 			{type: String},
    error_code: 		{type: Number}
});

module.exports = mongoose.model('logs', LogsSchema);
