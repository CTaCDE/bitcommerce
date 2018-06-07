// Require Mongoose
var mongoose = require('mongoose');

// Define a scheme
var Schema = mongoose.Schema;

var OrderhistorySchema = new Schema({
	txn_id: 				{type: String},
	ipn_track_id: 			{type: String},
	verify_sign: 			{type: String},
	payment_date: 			{type: String},
    payment_status: 		{type: String},
    shipping_method: 		{type: String},
    num_cart_items: 		{type: Number},
	mc_gross: 				{type: Number},
	payment_gross:  		{type: Number},
    mc_fee: 				{type: Number},
    payment_fee: 			{type: Number},
    mc_shipping: 			{type: Number},
	payer_email: 			{type: String},
	payer_id: 				{type: String},
	first_name: 			{type: String},
	last_name: 				{type: String},
	address_city: 			{type: String},
	address_state:  		{type: String},
	address_country: 		{type: String},
	address_country_code:  	{type: String},
	address_name:  			{type: String},
	address_street:  		{type: String},
	address_zip:  			{type: String},
	receiver_email: 		{type: String},
	receiver_id: 			{type: String},
	item_name_list: 		{type: Array},
    item_number_list:   	{type: Array},
    quantity_list:  		{type: Array},
    size_list:  			{type: Array},
    tees_email: 			{type: String},
    version:    			{type: String}
});

module.exports = mongoose.model('orderhistorys', OrderhistorySchema);
