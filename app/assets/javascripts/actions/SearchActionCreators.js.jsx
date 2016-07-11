// ./actions/SearchActionCreators.js.jsx
var VendataAppDispatcher = require('../dispatcher/VendataAppDispatcher.js');
var WebAPIUtils          = require('../utils/WebAPIUtils.js');
var ActionTypes          = VendataConstants.ActionTypes;

module.exports = {

  search: function(query) {
    VendataAppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_SEARCH_RESULTS,
      query: query
    });
    WebAPIUtils.search(query);
  },

};