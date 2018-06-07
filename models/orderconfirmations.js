// Require Mongoose
var mongoose = require('mongoose');

// Define a scheme
var Schema = mongoose.Schema;

var OrderConfirmationSchema = new Schema({
    email:       	{type: String},
    tx:       		{type: String},
    version: 		{type: String}
});

module.exports = mongoose.model('orderconfirmations', OrderConfirmationSchema);
