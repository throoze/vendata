// ./stores/ScrappingStore.react.jsx
var EventEmitter         = require('events').EventEmitter,
    assign               = require('object-assign');
var VendataAppDispatcher = require('../dispatcher/VendataAppDispatcher.js');
var ActionTypes          = VendataConstants.ActionTypes;
var CHANGE_EVENT         = 'change';

// Inner state inicialization
var _state = {
  errors: [],
  schemata: null,
  doc: null,
  scrapping: null
}

var ScrappingStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getErrors: function() {
    return _state.errors;
  },

  /////////////////////////////////////////////////

  getSchemata: function() {
    return _state.schemata;
  },

  getCollections: function(){
    return _state.schemata.collections;
  },

  getDescriptions: function(){
    return _state.schemata.descriptions;
  },

  getParenthood: function(){
    return _state.schemata.parenthood;
  },

  getInheritance: function(){
    return _state.schemata.inheritance;
  },

  getConstraints: function(){
    return _state.schemata.constraints;
  },

  getDocument: function(){
    console.log("Document for scrapping:");
    console.log(_state.doc);
    return _state.doc;
  }

});

ScrappingStore.dispatchToken = VendataAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_SCHEMATA:
      if (action.json) {
        _state.schemata = action.json;
        _state.errors = [];
      }
      if (action.errors) {
        _state.errors = action.errors;
      };
      ScrappingStore.emitChange();
      break;

    case ActionTypes.RECEIVE_DOC_FOR_SCRAPPING:
      if (action.json) {
        _state.doc = action.json;
        _state.errors = [];
      }
      if (action.errors) {
        _state.errors = action.errors;
      };
      ScrappingStore.emitChange();
      break;

    case ActionTypes.RECEIVE_DOC_FOR_VALIDATION:
      //ScrappingStore.emitChange();
      break;

    case ActionTypes.RECEIVE_CREATED_DOC:
      //ScrappingStore.emitChange();
      break;

    case ActionTypes.RECEIVE_VALIDATED_DOC:
      //ScrappingStore.emitChange();
      break;


    default:
  }
  return true;
});

module.exports = ScrappingStore;