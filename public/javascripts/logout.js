
function facebookLogout(){
    console.log("facebookLogout() called!")

    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            FB.logout(function(response) {
                console.log("Logged out!");
                window.location.replace('/');
            });
        } else {
            // User is not connected and somehow called facebookLogout()
            // Refer the user back to homepage
            window.location.replace('/');
        }
    });
}