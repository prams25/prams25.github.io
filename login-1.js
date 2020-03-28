function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
  console.log('statusChangeCallback');
  console.log(response);                   // The current login status of the person.
  if (response.status === 'connected') {   // Logged into your webpage and Facebook.
    testAPI();  
  } else {                                 // Not logged into your webpage or we are unable to tell.
   // FB.login()
   console.log('Unable to login');
  }
}


function checkLoginState() {               // Called when a person is finished with the Login Button.
  FB.getLoginStatus(function(response) {   // See the onlogin handler
    statusChangeCallback(response);
  });
}


window.fbAsyncInit = function() {
  FB.init({
    appId      : '593512708177952',
    cookie     : true,                     // Enable cookies to allow the server to access the session.
    xfbml      : true,                     // Parse social plugins on this webpage.
    version    : 'v6.0'           // Use this Graph API version for this call.
  });


  FB.getLoginStatus(function(response) {   // Called after the JS SDK has been initialized.
    statusChangeCallback(response);        // Returns the login status.
  });
};


(function(d, s, id) {                      // Load the SDK asynchronously
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
}

function FBLogin() {
  document.getElementsByClassName('fb-login-button').onclick = function() {
    FB.login(function (response) {
      if (response.authResponse) {
          // Get and display the user profile data
          getFbUserData();
      } else {
          document.getElementById('status').innerHTML = 'User cancelled login or did not fully authorize.';
      }
  }, {scope: 'email'});
  }
  
}

function getFbUserData(){
  FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture'},
  function (response) {
      document.getElementById('fbLink').setAttribute("onclick","fbLogout()");
      document.getElementById('fbLink').innerHTML = 'Logout from Facebook';
      document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.first_name + '!';
      document.getElementById('userData').innerHTML = '<p><b>FB ID:</b> '+response.id+'</p><p><b>Name:</b> '+response.first_name+' '+response.last_name+'</p><p><b>Email:</b> '+response.email+'</p><p><b>Gender:</b> '+response.gender+'</p><p><b>Locale:</b> '+response.locale+'</p><p><b>Picture:</b> <img src="'+response.picture.data.url+'"/></p><p><b>FB Profile:</b> <a target="_blank" href="'+response.link+'">click to view profile</a></p>';
  });
}
