// ./components/scrapping/Scrapping.js.jsx
var React                   = require('react');
var ScrappingActionCreators = require('../../actions/ScrappingActionCreators');
var ScrappingStore          = require('../../stores/ScrappingStore');
var BS                      = require('react-bootstrap');
var ButtonToolbar           = BS.ButtonToolbar,
    ButtonGroup             = BS.ButtonGroup,
    Button                  = BS.Button,
    LoadingButton           = require('../common/LoadingButton');
var DocumentVisor           = require('./DocumentVisor'),
    ScrappingForm           = require('./ScrappingForm');
var router                  = ReactRouter;

var ScrappingToolbar = React.createClass({

    _onAskNewDocForScrapping: function(callback) {
        ScrappingActionCreators.loadDocumentForScrapping();
        callback(ScrappingStore);
    },
    
    _onAskNewDocForValidating: function(callback) {
        //ScrappingActionCreators.loadDocumentForValidating();
        callback(null);
    },

    _onClearDoc: function() {
        ScrappingActionCreators.clearDoc();
    },

    render : function() {
        var scrapNew           = VendataConstants.Strings.SCRAP_NEW;
        var scrapNewHandler    = this._onAskNewDocForScrapping;
        var validateNew        = VendataConstants.Strings.VALIDATE_NEW;
        var validateNewHandler = this._onAskNewDocForValidating;
        var clearDoc           = VendataConstants.Strings.CLEAR_DOC;
        return (
            <ButtonToolbar>
                <ButtonGroup>
                    <LoadingButton clickHandler={scrapNewHandler}>{scrapNew}</LoadingButton>
                    <LoadingButton disabled clickHandler={validateNewHandler}>{validateNew}</LoadingButton>
                    <Button disabled={!this.props.enableClear} onClick={this._onClearDoc}>{clearDoc}</Button>
                </ButtonGroup>
            </ButtonToolbar>
        );
    }
});

var Scrapping = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

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
        if ((this.props.isLoggedIn !== undefined) && (this.props.isLoggedIn !== null) && !this.props.isLoggedIn) {
            console.log("User is not logged in. Context.router: ", this.context.router);
            this.context.router.transitionTo("app");
        }
        ScrappingStore.addChangeListener(this._onChange);
        ScrappingStore.addSchemataChangeListener(this._onChange);
        ScrappingActionCreators.loadSchemata();
    },

    componentWillUnmount: function() {
        ScrappingStore.removeChangeListener(this._onChange);
        ScrappingStore.removeSchemataChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(this._getStateFromStores());
    },

    render: function() {
        if (this.props.isLoggedIn) {
            return (
                <div id="scrapping" className="scrapping">
                    <ScrappingToolbar enableClear={this.state.hasDoc}/>
                    <div className="scrapping-container">
                        <DocumentVisor className="document-visor" />
                        <ScrappingForm schemata={this.state.schemata} className="scrapping-form" />
                    </div>
                </div>
            );
        } else { return null; }
    }
});

module.exports = Scrapping;