// ./components/scrapping/Scrapping.js.jsx
var React                   = require('react');
var ScrappingActionCreators = require('../../actions/ScrappingActionCreators');
var ScrappingStore          = require('../../stores/ScrappingStore');
var BS                      = require('react-bootstrap');
var ButtonToolbar           = BS.ButtonToolbar,
    ButtonGroup             = BS.ButtonGroup,
    LoadingButton           = require('../common/LoadingButton');
var DocumentVisor           = require('./DocumentVisor'),
    ScrappingForm           = require('./ScrappingForm');

var ScrappingToolbar = React.createClass({

    _onAskNewDocForScrapping: function(callback) {
        ScrappingActionCreators.loadDocumentForScrapping();
        callback(ScrappingStore);
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
        return this._getStateFromStores();
    },

    _getStateFromStores: function(){
        return {
            schemata: ScrappingStore.getSchemata(),
            hasDoc: ScrappingStore.hasDocument(),
            errors: ScrappingStore.getErrors()
        };
    },

    componentDidMount: function() {
        ScrappingStore.addChangeListener(this._onChange);
        ScrappingActionCreators.loadSchemata();
    },

    componentWillUnmount: function() {
        ScrappingStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(this._getStateFromStores());
    },

    render: function() {
        return (
            <div id="scrapping" className="scrapping">
                <ScrappingToolbar />
                <div className="scrapping-container">
                    <DocumentVisor loading={this.state.hasDoc} className="document-visor" />
                    <ScrappingForm schemata={this.state.schemata} className="scrapping-form" />
                </div>
            </div>
        );
    }
});

module.exports = Scrapping;