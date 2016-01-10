// ./utils/WebAPIUtils.js
var ServerActionCreators = require('../actions/ServerActionCreators.js.jsx');
var VendataAppDispatcher = require('../dispatcher/VendataAppDispatcher.js');
var request = require('superagent');

var APIEndpoints = VendataConstants.APIEndpoints;

module.exports = {

  signup: function(email, password, password_confirmation) {
    request.post('http://localhost:3000/api/v1/auth')
      .send({ email: email, password: password, password_confirmation: password_confirmation })
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveSignIn(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveSignIn(json, null);
          }
        }
      });
  },
   login: function(email, password) {
    request.post('http://localhost:3000/api/v1/auth/sign_in')
      .send({ email: email, password: password })
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveLogin(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            json.email = json.data.email;
            json.client = es.header['Client'];
            json.access_token = res.header['Access-Token'];
            ServerActionCreators.receiveLogin(json, null);
          }
        }
      });
  },
   logout: function(client, access_token, uid) {
   request.del('http://localhost:3000/api/v1/auth/sign_out')
      .set({ 'Client': client, 'Access-Token': access-token,'Uid':uid })
      .end();
  }
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