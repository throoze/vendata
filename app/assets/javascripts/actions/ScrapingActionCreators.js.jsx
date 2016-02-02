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
        var inner = '<div class="double-bounce1"></div><div class="double-bounce2"></div>';
        $(container).append("<div class='spinner' style='"+style+"'>"+inner+"</div>");
        VendataAppDispatcher.handleViewAction({
            type: ActionTypes.LOAD_DOC_FOR_SCRAPING
        });
        WebAPIUtils.loadDocumentForScraping();
    },

    clearDoc: function() {
        VendataAppDispatcher.handleViewAction({
            type: ActionTypes.CLEAR_DOC
        });
    },

    loadConstantClass: function(classname) {
        VendataAppDispatcher.handleViewAction({
            type: ActionTypes.LOAD_CONSTANT_CLASS
        });
        WebAPIUtils.loadConstantClass(classname);
    },

    createConstant: function(constant, success, error){
        VendataAppDispatcher.handleViewAction({
            type: ActionTypes.CREATE_CONSTANT_CLASS
        });
        WebAPIUtils.createConstant(constant, success, error);
    }
};