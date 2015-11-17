// ./utils/WebAPIUtils.js
var ServerActionCreators = require('../actions/ServerActionCreators.js.jsx');
var request              = require('superagent');
var APIEndpoints         = VendataConstants.APIEndpoints;
var DocumentCloud        = VendataConstants.DocumentCloud;

function _getErrors(res) {
  var errorMsgs = ["Se produjo un error, por favor intente de nuevo"];
  var json = null;
  if ((json = JSON.parse(res.text))) {
    if (json['errors']) {
      errorMsgs = json['errors'];
    } else if (json['error']) {
      errorMsgs = [json['error']];
    }
  }
  return errorMsgs;
}


module.exports = {
  
  loadSchemata: function(){
    var json      = null;
    var errorMsgs = null;
    request.get(APIEndpoints.SCHEMATA)
      .send()
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveSchemata(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveSchemata(json, null);
          }
        }
      });
  },
  
  loadDocumentForScrapping: function(){
    var json      = null;
    var errorMsgs = null;
    var result    = {};
    request.get(APIEndpoints.SCRAPPING_GET_DOC_FOR_SCRAPPING)
      .send()
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveDocumentForScrapping(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            result.doc = json.source;
            ServerActionCreators.receiveDocumentForScrapping(result, null);
          }
        }
      });
  },

  login: function(email, password) {
    // Auth.emailSignIn({
    //   email:    email,
    //   password: password,
    // })
    //   .then(function(resp) {
    //     json = JSON.parse(resp);
    //     ServerActionCreators.receiveLogin(json, null);
    //   }.bind(this))
    //   .fail(function(resp) {
    //     ServerActionCreators.receiveLogin(null, resp.data.errors);
    //   }.bind(this));
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