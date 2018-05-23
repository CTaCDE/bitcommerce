// Require Mongoose
var mongoose = require('mongoose');

// Define a scheme
var Schema = mongoose.Schema;

var NewslettersSchema = new Schema({
    email:       	{type: String},
    contact:        {type: String}
});

module.exports = mongoose.model('newsletters', NewslettersSchema);
