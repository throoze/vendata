// ./components/scraping/ScrapingForm.js.jsx
var React         = require('react');
var ReactRouter   = require('react-router');
var BS            = require('react-bootstrap');
var ScrapingStore = require('../../stores/ScrapingStore');
var Field         = require('./Field');
var Strings       = VendataConstants.Strings;
var Panel         = BS.Panel,
    Input         = BS.Input,
    Button        = BS.Button;


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
                <Button key="scraping-download-document" bsStyle="info" href={url} target="_blank" >{Strings.DOWNLOAD_PDF}</Button>
            );
        }
        var title = (<h3>{Strings.SCRAPING_FORM_TITLE}</h3>);
        if (this.state.doc) {
            return (
                <Panel id="scraping-form" header={title} bsStyle={"primary"}>
                    {downloadPDF}
                    <Field schemata={this.props.schemata} type={this.props.schemata.root_collection} />
                </Panel>
            );
        } else {
            return null;
        }
    }
});

module.exports = ScrapingForm;