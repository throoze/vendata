// ./actions/ScrapingActionCreators.js.jsx
var VendataAppDispatcher = require('../dispatcher/VendataAppDispatcher.js');
var WebAPIUtils          = require('../utils/WebAPIUtils.js');
var ActionTypes          = VendataConstants.ActionTypes;

module.exports = {

  loadSchemata: function() {
    VendataAppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_SCHEMATA
    });
    WebAPIUtils.loadSchemata();
  },

  loadDocumentForScraping: function() {
    var container = VendataConstants.DocumentCloud.params.container;
    $(container).empty();
    var margin = (($(window).height() - 85) / 2) - 50;
    var style = 'margin-top: '+margin.toString()+'px';
    $(container).append("<div class='loader pulse-loader' style='"+style+"'></div>");
    VendataAppDispatcher.handleViewAction({
        type: ActionTypes.LOAD_DOC_FOR_SCRAPING
    });
    WebAPIUtils.loadDocumentForScraping();
  },

  clearDoc: function() {
    VendataAppDispatcher.handleViewAction({
        type: ActionTypes.CLEAR_DOC
    });
  }

};