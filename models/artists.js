// File: ./models/artists.js

// Require Mongoose
var mongoose = require('mongoose');

// Define a scheme
var Schema = mongoose.Schema;

var ArtistsSchema = new Schema({
    artistid:       {type: Number},
    name:           {type: String},
    bio:            {type: String},
    designs:        {type: Array},
    portfoliolink:  {type: String}
});

module.exports = mongoose.model('artists', ArtistsSchema);
