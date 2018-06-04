/**
 * Sample PayPal IPN Listener implemented for Google Clound Functions.
 */

const querystring = require("querystring");
const request = require("request");
var Order = require('../models/orderhistory');
var Tshirts = require('../models/tshirts');

/**
 * @const {boolean} sandbox Indicates if the sandbox endpoint is used.
 */
const sandbox = true;

/** Production Postback URL */
const PRODUCTION_VERIFY_URI = "https://ipnpb.paypal.com/cgi-bin/webscr";
/** Sandbox Postback URL */
const SANDBOX_VERIFY_URI = "https://ipnpb.sandbox.paypal.com/cgi-bin/webscr";

/**
 * Determine endpoint to post verification data to.
 * 
 * @return {String}
 */
function getPaypalURI() {
  return sandbox ? SANDBOX_VERIFY_URI : PRODUCTION_VERIFY_URI;
}

/**
 * @param {Object} req Cloud Function request context for IPN notification event.
 * @param {Object} res Cloud Function response context.
 */
exports.ipnHandler = function ipnHandler(req, res) {
  console.log("IPN Notification Event Received");

  if (req.method !== "POST") {
    console.error("Request method not allowed.");
    res.status(405).send("Method Not Allowed");
  } else {
    // Return empty 200 response to acknowledge IPN post success.
    console.log("IPN Notification Event received successfully.");
    res.status(200).end();
  }

  // JSON object of the IPN message consisting of transaction details.
  var ipnTransactionMessage = req.body;
  // Convert JSON ipn data to a query string since Google Cloud Function does not expose raw request data.
  var formUrlEncodedBody = querystring.stringify(ipnTransactionMessage);
  // Build the body of the verification post message by prefixing 'cmd=_notify-validate'.
  var verificationBody = `cmd=_notify-validate&${formUrlEncodedBody}`;


  console.log(`Verifying IPN: ${verificationBody}`);

  var options = {
    method: "POST",
    uri: getPaypalURI(),
    body: verificationBody,
  };

  // POST verification IPN data to paypal to validate.
  request(options, function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      // Check the response body for validation results.
      // if (body === "VERIFIED") {
      //   console.log(
      //     `Verified IPN: IPN message for Transaction ID: ${ipnTransactionMessage.txn_id} is verified.`
      //   );
        // TODO: Implement post verification logic on ipnTransactionMessage
        // save transaction info to database
        //if(ipnTransactionMessage.receiver_email == "193tees@gmail.com") {
        //  console.log("valid sender");
          var c_item_name_list = [];
          var c_item_number_list = [];
          var c_quantity_list = [];
          var c_size_list = [];
          var r_item_name_list = [];
          var r_item_number_list = [];
          var r_quantity_list = [];
          var r_size_list = [];
          for(var key in ipnTransactionMessage) {
            if(key.substring(0,9) == 'item_name') {
              c_item_name_list.push([key, ipnTransactionMessage[key]]);
            }
            else if(key.substring(0,11) == 'item_number') {
              c_item_number_list.push([key, ipnTransactionMessage[key]]);
            }
            else if(key.substring(0,8) == 'quantity') {
              c_quantity_list.push([key, ipnTransactionMessage[key]]);
            }
            else if(key.substring(0,17) == 'option_selection1') {
              c_size_list.push([key, ipnTransactionMessage[key]]);
            }
          }
          c_item_name_list.sort();
          c_item_number_list.sort();
          c_quantity_list.sort();
          c_size_list.sort();

          for(var i = 0; i < c_item_name_list.length; i++) {
            r_item_name_list.push(c_item_name_list[i][1]);
          }
          for(var i = 0; i < c_item_number_list.length; i++) {
            r_item_number_list.push(c_item_number_list[i][1].split("-",1)[0]);
          }
          for(var i = 0; i < c_quantity_list.length; i++) {
            r_quantity_list.push(c_quantity_list[i][1]);
          }
          for(var i = 0; i < c_size_list.length; i++) {
            r_size_list.push(c_size_list[i][1]);
          }
          var ord = new Order({
            txn_id: ipnTransactionMessage.txn_id,
            ipn_track_id: ipnTransactionMessage.ipn_track_id,
            verify_sign: ipnTransactionMessage.verify_sign,
            payment_date: ipnTransactionMessage.payment_date,
            payment_status: ipnTransactionMessage.payment_status,
            shipping_method: ipnTransactionMessage.shipping_method,
            num_cart_items: ipnTransactionMessage.num_cart_items,
            mc_gross: ipnTransactionMessage.mc_gross,
            payment_gross: ipnTransactionMessage.payment_gross,
            mc_fee: ipnTransactionMessage.mc_fee,
            payment_fee: ipnTransactionMessage.payment_fee,
            mc_shipping: ipnTransactionMessage.mc_shipping,
            payer_id: ipnTransactionMessage.payer_id,
            first_name: ipnTransactionMessage.first_name,
            last_name: ipnTransactionMessage.last_name,
            payer_email: ipnTransactionMessage.payer_email,
            address_name: ipnTransactionMessage.address_name,
            address_street: ipnTransactionMessage.address_street,
            address_city: ipnTransactionMessage.address_city,
            address_state: ipnTransactionMessage.address_state,
            address_country: ipnTransactionMessage.address_country,
            address_country_code: ipnTransactionMessage.address_country_code,
            address_zip: ipnTransactionMessage.address_zip,
            receiver_email: ipnTransactionMessage.receiver_email,
            receiver_id: ipnTransactionMessage.receiver_id,
            item_name_list: r_item_name_list,
            item_number_list: r_item_number_list,
            quantity_list: r_quantity_list,
            size_list: r_size_list,
            tees_email: ''
          });
          ord.save(function(err, ord) {
            if(err) return console.error(err);
          });
          for(var i = 0; i < r_item_number_list.length; i++) {
            var shirtid = Number(r_item_number_list[i]);
            if(r_quantity_list[i]) {
              var quant = Number(r_quantity_list[i]);  
            } else {
              quant = 0;
            }
            
            Tshirts.findOneAndUpdate({itemid: shirtid}, {$inc : {'sold' : quant}}, function(err, shirt) {
              if(err) return console.error(err);
            });
          }
        //}

      // } else if (body === "INVALID") {
      //   console.error(
      //     `Invalid IPN: IPN message for Transaction ID: ${ipnTransactionMessage.txn_id} is invalid.`
      //   );
      // } else {
      //   console.error("Unexpected reponse body.");
      // }
    } else {
      // Error occured while posting to PayPal.
      console.error(error);
      console.log(body);
    }
  });
};