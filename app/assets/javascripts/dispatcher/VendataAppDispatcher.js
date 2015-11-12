// ./dispatcher/VendataAppDispatcher.js
var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var PayloadSources = VendataConstants.PayloadSources;

var VendataAppDispatcher = assign(new Dispatcher(), {

  handleServerAction: function(action) {
    var payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };
    this.dispatch(payload);
  },

  handleViewAction: function(action) {
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }
});

module.exports = VendataAppDispatcher;