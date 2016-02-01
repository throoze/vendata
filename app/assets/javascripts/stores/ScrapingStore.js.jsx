// ./stores/ScrapingStore.js.jsx
var EventEmitter           = require('events').EventEmitter,
    assign                 = require('object-assign');
var VendataAppDispatcher   = require('../dispatcher/VendataAppDispatcher.js');
var ActionTypes            = VendataConstants.ActionTypes;
var ScrapingActionCreators = require('../actions/ScrapingActionCreators');
var CHANGE                 = VendataConstants.Events.CHANGE;
var SCHEMATA_CHANGE        = VendataConstants.Events.SCHEMATA_CHANGE;
var CONSTANTS_CHANGE       = VendataConstants.Events.CONSTANTS_CHANGE;

// Inner state inicialization
var _state = {
  errors: [],
  schemata: null,
  doc: null,
  constants: {},
  scraping: []
};

var ScrapingStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE);
  },

  emitSchemataChange: function() {
    this.emit(SCHEMATA_CHANGE);
  },

  emitConstantsChange: function() {
    this.emit(CONSTANTS_CHANGE);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE, callback);
  },

  addSchemataChangeListener: function(callback) {
    this.on(SCHEMATA_CHANGE, callback);
  },

  removeSchemataChangeListener: function(callback) {
    this.removeListener(SCHEMATA_CHANGE, callback);
  },

  addConstantsChangeListener: function(callback) {
    this.on(CONSTANTS_CHANGE, callback);
  },

  removeConstantsChangeListener: function(callback) {
    this.removeListener(CONSTANTS_CHANGE, callback);
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
    var visor = null;
    if ( _state.doc !== null ) {
      visor = _state.doc.oembed;
    }
    return visor;
  },

  getScraping: function() {
    return _state.scraping;
  },

  getNext: function(){
    return null;
  },

  getConstants: function(classname) {
    return _state.constants[classname];
  }

});

ScrapingStore.dispatchToken = VendataAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_SCHEMATA:
      if (action.json) {
        _state.schemata = action.json;
        _state.errors = [];
      }
      if (action.errors) {
        _state.errors = action.errors;
      }
      ScrapingStore.emitSchemataChange();
      break;

    case ActionTypes.RECEIVE_DOC_FOR_SCRAPING:
      if (action.json) {
        _state.doc        = action.json.doc;
        _state.doc.oembed = JSON.parse(action.json.doc.oembed);
        _state.errors     = [];
      }
      if (action.errors) {
        _state.errors = action.errors;
      }
      ScrapingStore.emitChange();
      break;

    case ActionTypes.RECEIVE_CONSTANT_CLASS:
      if (action.json) {
        _state.constants[action.json.classname] = action.json.constants;
        ScrapingStore.emitConstantsChange();
        _state.errors     = [];
      }
      if (action.errors) {
        _state.errors = action.errors;
      }
      break;

    case ActionTypes.RECEIVE_DOC_FOR_VALIDATION:
      //ScrapingStore.emitChange();
      break;

    case ActionTypes.RECEIVE_CREATED_DOC:
      //ScrapingStore.emitChange();
      break;

    case ActionTypes.RECEIVE_VALIDATED_DOC:
      //ScrapingStore.emitChange();
      break;

    case ActionTypes.CLEAR_DOC:
      _state.doc = null;
      _state.scraping = [];
      ScrapingStore.emitChange();
      break;


    default:
  }
  return true;
});

module.exports = ScrapingStore;