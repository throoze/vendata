// ./stores/SessionStore.react.jsx
var VendataAppDispatcher = require('../dispatcher/VendataAppDispatcher.js');
var VendataConstants = require('../constants/VendataConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Auth = require('j-toker');

var ActionTypes = VendataConstants.ActionTypes;
var CHANGE_EVENT = 'change';

// Load an access token from the session storage, you might want to implement
// a 'remember me' using localSgorage
// var _accessToken = sessionStorage.getItem('accessToken')
// var _email = sessionStorage.getItem('email')
var _errors = [];

var SessionStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isLoggedIn: function() {
    return Auth.user.signedIn;    
  },

  getUser: function() {
    return Auth.user;
  },

  getErrors: function() {
    return _errors;
  }

});

SessionStore.dispatchToken = VendataAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.LOGIN_RESPONSE:
      if (action.errors) {
        _errors = action.errors;
      }
      SessionStore.emitChange();
      break;

    case ActionTypes.LOGOUT:
      SessionStore.emitChange();
      break;

    default:
  }
  return true;
});

module.exports = SessionStore;