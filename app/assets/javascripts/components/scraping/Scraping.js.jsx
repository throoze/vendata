// ./components/scraping/Scraping.js.jsx
var ScrapingActionCreators  = require('../../actions/ScrapingActionCreators');
var ScrapingStore           = require('../../stores/ScrapingStore');
var BS                      = require('react-bootstrap');
var ButtonToolbar           = BS.ButtonToolbar,
    ButtonGroup             = BS.ButtonGroup,
    Button                  = BS.Button,
    LoadingButton           = require('../common/LoadingButton');
var DocumentVisor           = require('./DocumentVisor');
var ScrapingForm            = require('./ScrapingForm');

var ScrapingToolbar = React.createClass({

    _onAskNewDocForScraping: function(callback) {
        ScrapingActionCreators.loadDocumentForScraping();
        callback(ScrapingStore);
    },
    
    _onAskNewDocForValidating: function(callback) {
        //ScrapingActionCreators.loadDocumentForValidating();
        callback(null);
    },

    _onClearDoc: function() {
        ScrapingActionCreators.clearDoc();
    },

    render : function() {
        var scrapNew           = VendataConstants.Strings.SCRAP_NEW;
        var scrapNewHandler    = this._onAskNewDocForScraping;
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

var Scraping = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: function() {
        return this._getStateFromStores();
    },

    _getStateFromStores: function(){
        return {
            schemata: ScrapingStore.getSchemata(),
            hasDoc: ScrapingStore.hasDocument(),
            errors: ScrapingStore.getErrors()
        };
    },

    componentDidMount: function() {
        if ((this.props.isLoggedIn !== undefined) && (this.props.isLoggedIn !== null) && !this.props.isLoggedIn) {
            this.context.router.transitionTo("app");
        }
        ScrapingStore.addChangeListener(this._onChange);
        ScrapingStore.addSchemataChangeListener(this._onChange);
        ScrapingActionCreators.loadSchemata();
    },

    componentWillUnmount: function() {
        ScrapingStore.removeChangeListener(this._onChange);
        ScrapingStore.removeSchemataChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(this._getStateFromStores());
    },

    render: function() {
        if (this.props.isLoggedIn) {
            return (
                <div id="scraping" className="scraping">
                    <ScrapingToolbar enableClear={this.state.hasDoc}/>
                    <div className="scraping-container">
                        <DocumentVisor className="document-visor" />
                        <ScrapingForm schemata={this.state.schemata} className="scraping-form" />
                    </div>
                </div>
            );
        } else { return null; }
    }
});

module.exports = Scraping;