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

  receiveCreate: function(json, errors) {
    VendataAppDispatcher.handleServerAction({
      type: ActionTypes.CREATE_RESPONSE,
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

  receiveLogOut: function(json, errors) {
    VendataAppDispatcher.handleServerAction({
      type: ActionTypes.LOGOUT_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveUpdate: function(json, errors) {
    VendataAppDispatcher.handleServerAction({
      type: ActionTypes.UPDATE_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveDocumentForScraping: function(json, errors) {
    VendataAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_DOC_FOR_SCRAPING,
      json: json,
      errors: errors
    });
  },

  receiveLoadUser: function(json, errors){
    VendataAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_LOAD_USER,
      json: json,
      errors: errors
    });
  },

  receiveUsersStatistics: function(json, errors){
    VendataAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_USERS_STATISTICS,
      json: json,
      errors: errors
    });
  },

  receiveConstantClass: function(json, errors) {
    VendataAppDispatcher.handleServerAction({
      type:ActionTypes.RECEIVE_ALL_USERS,
      json: json,
      errors: errors 
    });
  },  

  receiveConstantClass: function(json, errors) {
    VendataAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_CONSTANT_CLASS,
      json: json,
      errors: errors
    });
  }
};