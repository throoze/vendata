// ./utils/WebAPIUtils.js
var ServerActionCreators = require('../actions/ServerActionCreators.react.jsx');
var VendataConstants = require('../constants/VendataConstants.js');
var Auth = require('j-toker');
var request = require('superagent');

var APIEndpoints = VendataConstants.APIEndpoints;

Auth.configure({
  apiUrl:  VendataConstants.API_URL
});

module.exports = {

  login: function(email, password) {
    Auth.emailSignIn({
      email:    email,
      password: password,
    })
      .then(function(resp) {
        json = JSON.parse(resp);
        ServerActionCreators.receiveLogin(json, null);
      }.bind(this))
      .fail(function(resp) {
        ServerActionCreators.receiveLogin(null, resp.data.errors);
      }.bind(this));
  },
};

// Default Auth configuration for J-Toker:
// Auth.configure({
//   apiUrl:                '/api',
//   signOutPath:           '/auth/sign_out',
//   emailSignInPath:       '/auth/sign_in',
//   emailRegistrationPath: '/auth',
//   accountUpdatePath:     '/auth',
//   accountDeletePath:     '/auth',
//   passwordResetPath:     '/auth/password',
//   passwordUpdatePath:    '/auth/password',
//   tokenValidationPath:   '/auth/validate_token',
//   proxyIf:               function() { return false; },
//   proxyUrl:              '/proxy',
//   validateOnPageLoad:    false,
//   forceHardRedirect:     false,
//   storage:               'cookies',
//   cookieExpiry:          14,
//   cookiePath:            '/',

//   passwordResetSuccessUrl: function() {
//     return window.location.href;
//   },

//   confirmationSuccessUrl:  function() {
//     return window.location.href;
//   },

//   tokenFormat: {
//     "access-token": "{{ access-token }}",
//     "token-type":   "Bearer",
//     client:         "{{ client }}",
//     expiry:         "{{ expiry }}",
//     uid:            "{{ uid }}"
//   },

//   parseExpiry: function(headers){
//     // convert from ruby time (seconds) to js time (millis)
//     return (parseInt(headers['expiry'], 10) * 1000) || null;
//   },

//   handleLoginResponse: function(resp) {
//     return resp.data;
//   },

//   handleAccountUpdateResponse: function(resp) {
//     return resp.data;
//   },

//   handleTokenValidationResponse: function(resp) {
//     return resp.data;
//   },

//   authProviderPaths: {
//     github:    '/auth/github',
//     facebook:  '/auth/facebook',
//     google:    '/auth/google_oauth2'
//   }
// });