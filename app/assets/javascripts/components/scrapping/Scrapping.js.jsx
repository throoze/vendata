// ./components/scrapping/Scrapping.js.jsx
var ScrappingActionCreators = require('../../actions/ScrappingActionCreators');
var BS                      = require('react-bootstrap');
var ButtonToolbar           = BS.ButtonToolbar,
    ButtonGroup             = BS.ButtonGroup,
    LoadingButton           = require('../common/LoadingButton');
var DocumentVisor           = require('./DocumentVisor'),
    ScrappingForm           = require('./ScrappingForm');



var ScrappingToolbar = React.createClass({

    _onAskNewDocForScrapping: function(callback) {
        console.log("Scrap New Clicked!");
        ScrappingActionCreators.loadDocumentForScrapping();
        callback(true);
    },
    
    _onAskNewDocForValidating: function(callback) {
        //ScrappingActionCreators.loadDocumentForValidating();
        callback(true);
    },

    render : function() {
        var scrapNew           = VendataConstants.Strings.SCRAP_NEW;
        var scrapNewHandler    = this._onAskNewDocForScrapping;
        var validateNew        = VendataConstants.Strings.VALIDATE_NEW;
        var validateNewHandler = this._onAskNewDocForValidating;
        return (
            <ButtonToolbar>
                <ButtonGroup>
                    <LoadingButton clickHandler={scrapNewHandler}>{scrapNew}</LoadingButton>
                    <LoadingButton disabled clickHandler={validateNewHandler}>{validateNew}</LoadingButton>
                </ButtonGroup>
            </ButtonToolbar>
        );
    }
});

var Scrapping = React.createClass({

    getInitialState: function() {
        return { 
            errors: []
        };
    },

    render: function() {
        return (
            <div className="scrapping">
                <ScrappingToolbar />
                <div className="scrapping-container">
                    <DocumentVisor className="document-visor" />
                    <ScrappingForm className="scrapping-form" />
                </div>
            </div>
        );
    }
});

module.exports = Scrapping;