
// Allow the user to login
function facebookLogin() {
    console.log("facebookLogin() called!");

    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            console.log("User is connected.");
            return window.location.reload();
            next();
            // FB.login(function(response) {
            //     if (response.status === 'connected') {
            //         // Logged into your app and Facebook.
            //         console.log("User is logged into app and facebook.");
            //     } else {
            //         // The person is not logged into this app or we are unable to tell.
            //         console.log("User is not logged into app or can't tell.");
            //     }
            // });
        } else {
            // We come here when the user is logged into facebook but not authenticated into the app.
            console.log("User is not connected.");
            console.log("Attempting to login again...");
            FB.login();
        }
    });
}

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);

    var accountButton = document.getElementById("account-button");
    var facebookButton = document.getElementById("facebook-button");

    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        console.log("Connected!");
        accountButton.style.display = "block";
        facebookButton.style.display = "none";

    } else {
        console.log("Not connected!");
        facebookButton.style.display = "block";
        accountButton.style.display = "none";
    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    console.log("checkLoginState called!");
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {
    FB.init({
        appId      : '2054747968144280',
        cookie     : true,  // enable cookies to allow the server to access 
                  // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8' // use graph api version 2.8
    });

    // Now that we've initialized the JavaScript SDK, we call 
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

