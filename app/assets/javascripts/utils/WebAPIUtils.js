// ./utils/WebAPIUtils.js
var ServerActionCreators = require('../actions/ServerActionCreators.js.jsx');
var VendataAppDispatcher = require('../dispatcher/VendataAppDispatcher.js');
var request = require('superagent');
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

  create: function(email, password, password_confirmation) {
    request.post(APIEndpoints.REGISTRATION)
      .send({email: email, password: password, password_confirmation: password_confirmation})
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveCreate(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveCreate(json, null);
          }
        }
      });
  },
  login: function(email, password) {
    request.post(APIEndpoints.LOGIN)
      .send({ email: email, password: password })
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveLogIn(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            json.email = json.data.email;
            json.client = res.header['client'];
            json.access_token = res.header['access-token'];
            json.expiry = res.header['expiry'];
            ServerActionCreators.receiveLogIn(json, null);
          }
        }
      });
  },
  logout: function(client, access_token, uid) {
    request.del(APIEndpoints.LOGOUT)
      .set({ 'client': client, 'access-token': access_token,'uid':uid })
      .end(function(error,res){
          if (res) {
            if (res.error) {
              var errorMsgs = _getErrors(res);
              ServerActionCreators.receiveLogOut(null, errorMsgs);
            } else {
              ServerActionCreators.receiveLogOut("OK",null);
            }
          }
      });
  },
  update: function(client, access_token, uid, expiry, body) {
    request.put(APIEndpoints.UPDATE)
      .set({ 'client': client, 'access-token': access_token,'uid':uid, 'expiry': expiry, 'token-type': 'Bearer'})
      .send(body)
      .end(function(error,res){
          if (res) {
            if (res.error) {
              if (res.status === 403 ) {
                var resObj = JSON.parse(res.text);
                var errorMsgs = resObj.errors.full_messages;
              }else {
                var errorMsgs = _getErrors(res);
              };
              ServerActionCreators.receiveUpdate(null, errorMsgs);
            } else {
              json = JSON.parse(res.text);
              json.email = json.data.email;
              json.client = res.header['client'];
              json.access_token = res.header['access-token'];
              ServerActionCreators.receiveUpdate(json,null);
            }
          }
      });
  },
  loadUser: function(){
    ServerActionCreators.receiveLoadUser("OK",null);  
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