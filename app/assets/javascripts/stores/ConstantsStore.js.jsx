// ./stores/ConstantsStore.js.jsx
var EventEmitter           = require('events').EventEmitter,
    assign                 = require('object-assign');
var VendataAppDispatcher   = require('../dispatcher/VendataAppDispatcher.js');
var ActionTypes            = VendataConstants.ActionTypes;
var ScrapingActionCreators = require('../actions/ScrapingActionCreators');
var CHANGE                 = VendataConstants.Events.CHANGE;

// Inner state inicialization
var _state = {
    constants: {},
    errors: []
};

var ConstantsStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE, callback);
    },

    getErrors: function() {
        return _state.errors;
    },

    /////////////////////////////////////////////////

    getClassname: function(classname){
        return _state.constants[className];
    }

});

ConstantsStore.dispatchToken = VendataAppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {

        case ActionTypes.RECEIVE_CONSTANT_CLASS:
            if (action.json) {
                _state.constants[action.json.classname] = action.json.objects;
                _state.errors = [];
            }
            if (action.errors) {
                _state.errors = action.errors;
            }
            ConstantsStore.emitChange();
            break;
        default:
    }
    return true;
});

module.exports = ConstantsStore;