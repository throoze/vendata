// ./components/scraping/ScrapingForm.js.jsx
var React          = require('react');
var ReactRouter    = require('react-router');
var BS             = require('react-bootstrap');
var ScrapingStore = require('../../stores/ScrapingStore');
var Entity         = require('./Entity');
var Strings        = VendataConstants.Strings;
var Panel          = BS.Panel,
    Input          = BS.Input,
    Button         = BS.Button;


var ScrapingForm = React.createClass({
    
    getInitialState: function(){
        var state = {
            scraping: {},
            root_chosen: false,
            root: null,
            doc: ScrapingStore.getDocument()
        };
        return state;
    },

    componentDidMount: function() {
        ScrapingStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        ScrapingStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState({
            doc: ScrapingStore.getDocument()
        });
    },

    _chooseRoot: function(e) {
        if (this.refs.choose_root.getValue() == "select") {
            this.setState({
                root: null,
                root_chosen: false
            });
        } else {
            this.setState({
                root: this.refs.choose_root.getValue(),
                root_chosen: true
            });
        }
    },

    _form: function() {
        var schemata = this.props.schemata;
        var root_collections = schemata!== null? schemata.root_collections : [];
        var form = [];
        form.push(
            <Input type="select" placeholder={Strings.CHOOSE_ROOT_DOC} onChange={this._chooseRoot} ref="choose_root">
                <option key="select" value="select">{Strings.CHOOSE_ROOT_DOC}</option>
                {root_collections.map(function(collection){
                    return (
                        <option key={collection} value={collection}>{schemata.descriptions[collection].human_readable}</option>
                        );
                })}
            </Input>
            );
        if (this.state.root_chosen) {
            form.push(<Entity entity={this.state.root}/>);
        }
        return form;
    },

    render: function(){
        var downloadPDF = null;
        if (this.state.doc !== null){
            var id = this.state.doc.dc_id.valueOf();
            var splitted = id.split("-");
            var head = splitted.shift();
            var tail = splitted.join("-");
            var url = "https://assets.documentcloud.org/documents/";
            url += head +"/" + tail + ".pdf";
            downloadPDF = (
                <Button bsStyle="info" href={url} target="_blank" >{Strings.DOWNLOAD_PDF}</Button>
            );
        }
        var title = (<h3>{Strings.SCRAPING_FORM_TITLE}</h3>);
        var form = (
                <form onSubmit={this._onSubmit}>
                    {this._form()}
                </form>
            );
        var output = (
                <Panel id="scraping-form" header={title} bsStyle={"primary"}>
                    {downloadPDF}
                    {form}
                </Panel>
            );
        if (this.state.doc) {
            return output;
        } else {
            return null;
        }
    }
});

module.exports = ScrapingForm;