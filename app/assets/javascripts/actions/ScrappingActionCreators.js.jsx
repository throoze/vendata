// ./actions/ScrappingActionCreators.js.jsx
var VendataAppDispatcher = require('../dispatcher/VendataAppDispatcher.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = VendataConstants.ActionTypes;

module.exports = {

  loadSchemata: function(){
    VendataAppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_SCHEMATA
    });
    WebAPIUtils.loadSchemata();
  }

};