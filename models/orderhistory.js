// Require Mongoose
var mongoose = require('mongoose');

// Define a scheme
var Schema = mongoose.Schema;

var OrderhistorySchema = new Schema({
    orderid:   	    {type: Number},
    item_id_list:   {type: Array},
    quantity_list:  {type: Array},
    order_date:     {type: String},
    size_list:  	{type: Array}
});

module.exports = mongoose.model('orderhistory', OrderhistorySchema);
