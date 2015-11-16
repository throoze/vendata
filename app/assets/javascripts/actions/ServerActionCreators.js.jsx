// ./actions/ServerActionCreators.js.jsx
var VendataAppDispatcher = require('../dispatcher/VendataAppDispatcher.js');

var ActionTypes = VendataConstants.ActionTypes;

module.exports = {

  receiveSchemata: function(json, errors) {
    VendataAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_SCHEMATA,
      json: json,
      errors: errors
    });
  },

 // ... 
};