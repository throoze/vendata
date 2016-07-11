// ./stores/SearchStore.js.jsx
var EventEmitter           = require('events').EventEmitter,
    assign                 = require('object-assign');
var VendataAppDispatcher   = require('../dispatcher/VendataAppDispatcher.js');
var ActionTypes            = VendataConstants.ActionTypes;
var CHANGE                 = VendataConstants.Events.CHANGE;

// Inner state inicialization
var _state = {
    results: [],
    errors: []
};

var SearchStore = assign({}, EventEmitter.prototype, {

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

    getResults: function(){
        return _state.results;
    }

});

SearchStore.dispatchToken = VendataAppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {

        case ActionTypes.RECEIVE_SEARCH_RESULTS:
            if (action.json) {
                _state.results = action.json;
                _state.errors = [];
            }
            if (action.errors) {
                _state.errors = action.errors;
            }
            SearchStore.emitChange();
            break;
        default:
    }
    return true;
});

module.exports = SearchStore;