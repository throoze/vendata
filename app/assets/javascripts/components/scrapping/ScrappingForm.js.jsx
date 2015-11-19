// ./components/scrapping/ScrappingForm.js.jsx
var React          = require('react');
var ReactRouter    = require('react-router');
var BS             = require('react-bootstrap');
var ScrappingStore = require('../../stores/ScrappingStore');
var Panel          = BS.Panel;
var Button         = BS.Button;

function getStateFromStores(){
    return {
        schemata:  ScrappingStore.getSchemata(),
        doc:       ScrappingStore.getDocument(),
        instance:  null,
        scrapping: ScrappingStore.getScrapping(),
        next:      ScrappingStore.getNext()
    }
}

var CollectionInstanceInput = React.createClass({

    _generateFields: function(){

    },

    render: function(){
        var tree = this.props.tree;
        return (<div></div>);
    }
});

var ScrappingForm = React.createClass({
    
    getInitialState: function(){
        var state = getStateFromStores();
        return state;
    },

    componentDidMount: function() {
        ScrappingStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        ScrappingStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(getStateFromStores());
    },

    _onSubmit: function(e){
        e.preventDefault();
    },

    _selectInstance: function(){
        return null;
    },

    _generateCollectionInstance: function(){
        return null;
    },

    render: function(){
        var root_collections = this.state.schemata!== null? this.state.schemata.root_collections : null;
        var downloadPDF = null;
        if (this.state.doc !== null){
            var id = this.state.doc.dc_id.valueOf();
            var splitted = id.split("-");
            var head = splitted.shift();
            var tail = splitted.join("-");
            var url = "https://assets.documentcloud.org/documents/";
            url += head +"/" + tail + ".pdf";
            downloadPDF = (
                <Button bsStyle="info" href={url} target="_blank" >{VendataConstants.Strings.DOWNLOAD_PDF}</Button>
            );
        }
        var title = (<h3>{VendataConstants.Strings.SCRAPPING_FORM_TITLE}</h3>);
        return (
            <Panel id="scrapping-form" header={title} bsStyle="primary">
                {downloadPDF}
                <form onSubmit={this._onSubmit}>
                    {this._selectInstance()}
                    {this._generateCollectionInstance()}
                </form>
            </Panel>
        );
    }
});

module.exports = ScrappingForm;