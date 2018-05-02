// Require Mongoose
var mongoose = require('mongoose');

// Define a scheme
var Schema = mongoose.Schema;

var OrderhistorySchema = new Schema({
	txn_id: 				{type: Number},
	payer_email: 			{type: String},
	payer_id: 				{type: Number},
	first_name: 			{type: String},
	last_name: 				{type: String},
	address_city: 			{type: String},
	address_state:  		{type: String},
	address_country_code:  	{type: String},
	address_name:  			{type: String},
	address_street:  		{type: String},
	address_zip:  			{type: Number},
	item_name1:  			{type: String},
	item_number1: 			{type: String},
	payment_gross:  		{type: Number},
	mc_gross: 				{type: Number},
	payment_date:  			{type: String},
	payment_status: 		{type: String},
	quantity1:  			{type: Number},
	option_selection1: 		{type: String},

    item_id_list:   {type: Array},
    quantity_list:  {type: Array},
    size_list:  	{type: Array}
});

module.exports = mongoose.model('orderhistorys', OrderhistorySchema);
