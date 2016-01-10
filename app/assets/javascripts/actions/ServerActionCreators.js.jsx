// ./actions/ServerActionCreators.js.jsx
var VendataAppDispatcher = require('../dispatcher/VendataAppDispatcher.js');
var ActionTypes          = VendataConstants.ActionTypes;

module.exports = {

  receiveSchemata: function(json, errors) {
    VendataAppDispatcher.handleServerAction({
     type: ActionTypes.RECEIVE_SCHEMATA,
      json: json,
      errors: errors
    });
  },

  receiveSignIn: function(json, errors) {
    VendataAppDispatcher.handleServerAction({
      type: ActionTypes.SIGN_UP_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveLogIn: function(json, errors) {
    VendataAppDispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveDocumentForScrapping: function(json, errors) {
    VendataAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_DOC_FOR_SCRAPPING,
      json: json,
      errors: errors
    });
  }

 // ... 
};