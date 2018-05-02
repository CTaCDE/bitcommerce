/**
 * Sample PayPal IPN Listener implemented for Google Clound Functions.
 */

const querystring = require("querystring");
const request = require("request");
var Order = require('../models/orderhistory');
//var fs = require('fs');
//var stream = fs.createWriteStream("trans.txt", {flags:'a'});

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

  // save transaction info to file
  //stream.write(new Date().toISOString() + '\n' + JSON.stringify(ipnTransactionMessage) + '\n');
  // Create a new user
  console.log(ipnTransactionMessage);
  if(ipnTransactionMessage.receiver_email == "193tees@gmail.com") {
    console.log("valid sender");
    var ord = new Order({
      txn_id: ipnTransactionMessage.txn_id,
      payer_email: ipnTransactionMessage.payer_email,
      payer_id: ipnTransactionMessage.payer_id,
      first_name: ipnTransactionMessage.first_name,
      last_name: ipnTransactionMessage.last_name,
      address_city: ipnTransactionMessage.address_city,
      address_state: ipnTransactionMessage.address_state,
      address_country_code: ipnTransactionMessage.address_country_code,
      address_name: ipnTransactionMessage.address_name,
      address_street: ipnTransactionMessage.address_street,
      address_zip: ipnTransactionMessage.address_zip,
      payment_gross: ipnTransactionMessage.payment_gross,
      mc_gross: ipnTransactionMessage.mc_gross,
      payment_date: ipnTransactionMessage.payment_date,
      payment_status: ipnTransactionMessage.payment_status,

      item_name1: ipnTransactionMessage.item_name1,
      item_number1:ipnTransactionMessage.item_number1,
      quantity1: ipnTransactionMessage.quantity1,
      option_selection1: ipnTransactionMessage.option_selection1
    });
    console.log(ord);
  }


  // /* save if new */
  // User.findOne({email:me.email}, function(err, u) {
  //     if(!u) {
  //         me.save(function(err, me) {
  //             if(err) return done(err);
  //             done(null,me);
  //         });
  //     } else {
  //         console.log(u);
  //         done(null, u);
  //     }
  // });



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
      if (body === "VERIFIED") {
        console.log(
          `Verified IPN: IPN message for Transaction ID: ${ipnTransactionMessage.txn_id} is verified.`
        );
        // TODO: Implement post verification logic on ipnTransactionMessage
      } else if (body === "INVALID") {
        console.error(
          `Invalid IPN: IPN message for Transaction ID: ${ipnTransactionMessage.txn_id} is invalid.`
        );
      } else {
        console.error("Unexpected reponse body.");
      }
    } else {
      // Error occured while posting to PayPal.
      console.error(error);
      console.log(body);
    }
  });
};