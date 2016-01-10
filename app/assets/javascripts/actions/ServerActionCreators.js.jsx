// ./actions/ServerActionCreators.react.jsx
var VendataAppDispatcher = require('../dispatcher/VendataAppDispatcher.js');

var ActionTypes = VendataConstants.ActionTypes;

module.exports = {

  receiveLogin: function(json, errors) {
    VendataAppDispatcher.handleServerAction({
      type: ActionTypes.SIGN_UP_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveSignIn: function(json, errors) {
    VendataAppDispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    });
  },

 // ... 
};