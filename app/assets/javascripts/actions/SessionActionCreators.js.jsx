// ./actions/SessionActionCreators.js.jsx
var VendataAppDispatcher = require('../dispatcher/VendataAppDispatcher.js');
var WebAPIUtils          = require('../utils/WebAPIUtils.js');
var ActionTypes          = VendataConstants.ActionTypes;

module.exports = {

  create: function(email, password, password_confirmation, role) {
    VendataAppDispatcher.handleViewAction({
      type:                  ActionTypes.CREATE_REQUEST,
      email:                 email,
      password:              password,
      password_confirmation: password_confirmation,
      role:                  role
    });
    WebAPIUtils.create(email, password, password_confirmation);
  },

  login: function(email, password) {
    VendataAppDispatcher.handleViewAction({
      type:     ActionTypes.LOGIN_REQUEST,
      email:    email,
      password: password
    });
    WebAPIUtils.login(email, password);
  },

  logout: function(client, access_token, uid) {
    VendataAppDispatcher.handleViewAction({
      type: ActionTypes.LOGOUT_REQUEST
    });
    WebAPIUtils.logout(client, access_token, uid);
  }

};