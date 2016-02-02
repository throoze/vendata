// ./stores/SessionStore.js.jsx
var EventEmitter         = require('events').EventEmitter,
    assign               = require('object-assign');
var VendataAppDispatcher = require('../dispatcher/VendataAppDispatcher.js');
var ActionTypes          = VendataConstants.ActionTypes;
var sessionStorage       = require('localStorage');
var CHANGE_EVENT         = VendataConstants.Events.CHANGE;

// Load an access token from the session storage, you might want to implement
// a 'remember me' using localSgorage
var _accessToken = sessionStorage.getItem('accessToken');
var _email = sessionStorage.getItem('email');
var _client = sessionStorage.getItem('client');
var _user = sessionStorage.getItem('user');
var _expiry = sessionStorage.getItem('expiry');
var _errors = [];
var _resCreate = "";

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

  update: function(header) {
    sessionStorage.setItem('accessToken', header['access-token']);
    sessionStorage.setItem('email', header.uid);
    sessionStorage.setItem('client', header.client);
    sessionStorage.setItem('expiry', header.expiry);
    _accessToken = sessionStorage.getItem('accessToken');
    _email = sessionStorage.getItem('email');
    _client = sessionStorage.getItem('client');
    _expiry = sessionStorage.getItem('expiry');
  },

  getHeaders: function() {
    return { 
            'client': _client,
            'access-token': _accessToken,
            'uid':_email,
            'expiry': _expiry,
            'token-type': 'Bearer'
          };
  },

  isLoggedIn: function() {
    return _accessToken !== null ? true : false;  
  },

  getAccessToken: function() {
    return _accessToken;
  },

  getClient: function(){
    return _client;
  },

  getUser: function(){
    return _user;
  },

  getEmail: function() {
    return _email;
  },

  getExpiry: function() {
    return _expiry;
  },

  getErrors: function() {
    return _errors;
  },

});

SessionStore.dispatchToken = VendataAppDispatcher.register(function(payload) {
  var action = payload.action;

  // Action structure : 
  // type
  // json 
  // errors
  switch(action.type) {

    case ActionTypes.CREATE_RESPONSE:
      console.log("respuesta ok");
      if (action.errors) {
        console.log("hubo error");
        console.log(action.errors+ " AQUI");
        _errors = action.errors;
      }
      else {
        console.log("no hubo error");
        _errors = ["Exito!"];
      }
      SessionStore.emitChange();
      break;

    case ActionTypes.LOGIN_RESPONSE:
    
      //Si el contenido y el token no son vacios. 
      if (action.json && action.json.access_token) {
          _accessToken = action.json.access_token;
          _email = action.json.email;
          _client = action.json.client;
          _expiry = action.json.expiry;
          _user =  JSON.stringify(action.json.data);
          // Token will always live in the session, so that the API can grab it with no hassle
          sessionStorage.setItem('accessToken', _accessToken);
          sessionStorage.setItem('email', _email);
          sessionStorage.setItem('client', _client);
          sessionStorage.setItem('expiry', _expiry);
          sessionStorage.setItem('user', _user);
        }
      
      if (action.errors) {
          _errors = action.errors;
      }
      
      //_errors = [];
      SessionStore.emitChange();
      break;

    case ActionTypes.LOGOUT_RESPONSE:
      _accessToken = null;
      _email = null;
      _client = null;
      _user = null;
      _expiry = null;
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('client');
      sessionStorage.removeItem('expiry');
      sessionStorage.removeItem('user');
      SessionStore.emitChange();
      break;

    case ActionTypes.RECEIVE_LOAD_USER:

      if (action.errors) {
        _errors = action.errors;
      }
      SessionStore.emitChange();
      break;

    case ActionTypes.UPDATE_RESPONSE:

      if (action.json && action.json.access_token) {
          _accessToken = action.json.access_token;
          _email = action.json.email;
          _client = action.json.client;
          _expiry = action.json.expiry;
          _user =  JSON.stringify(action.json.data);
          // Token will always live in the session, so that the API can grab it with no hassle
          sessionStorage.setItem('accessToken', _accessToken);
          sessionStorage.setItem('email', _email);
          sessionStorage.setItem('client', _client);
          sessionStorage.setItem('expiry', _expiry);
          sessionStorage.setItem('user', _user);
      };

      if (action.errors) {
        _errors = action.errors;
      }
      else {
        _errors = "";
      };



      SessionStore.emitChange();
      break;

    default:
  }
  return true;
});

module.exports = SessionStore;