// ./stores/ScrappingStore.js.jsx
var EventEmitter            = require('events').EventEmitter,
    assign                  = require('object-assign');
var VendataAppDispatcher    = require('../dispatcher/VendataAppDispatcher.js');
var ActionTypes             = VendataConstants.ActionTypes;
var ScrappingActionCreators = require('../actions/ScrappingActionCreators');
var CHANGE                  = VendataConstants.Events.CHANGE;
var CHANGE_SCHEMATA         = VendataConstants.Events.CHANGE_SCHEMATA;

// Inner state inicialization
var _state = {
  errors: [],
  schemata: null,
  doc: null,
  scrapping: []
}

var ScrappingStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE);
  },

  emitSchemataChange: function() {
    this.emit(CHANGE_SCHEMATA);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE, callback);
  },

  addSchemataChangeListener: function(callback) {
    this.on(CHANGE_SCHEMATA, callback);
  },

  removeSchemataChangeListener: function(callback) {
    this.removeListener(CHANGE_SCHEMATA, callback);
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

  hasDocument: function(){
    return _state.doc !== null;
  },

  getDocument: function(){
    return _state.doc;
  },

  getEmbeddedVisor: function(){
    var visor = null
    if (!(_state.doc === null)) {
      visor = _state.doc.oembed;
    }
    return visor;
  },

  getScrapping: function() {
    return _state.scrapping;
  },

  getNext: function(){
    return null;
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
      ScrappingStore.emitSchemataChange();
      break;

    case ActionTypes.RECEIVE_DOC_FOR_SCRAPPING:
      if (action.json) {
        _state.doc        = action.json.doc;
        _state.doc.oembed = JSON.parse(action.json.doc.oembed);
        _state.errors     = [];
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

    case ActionTypes.CLEAR_DOC:
      _state.doc = null;
      _state.scrapping = [];
      ScrappingStore.emitChange();
      break;


    default:
  }
  return true;
});

module.exports = ScrappingStore;