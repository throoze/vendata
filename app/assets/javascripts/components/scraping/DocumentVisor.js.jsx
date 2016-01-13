// ./components/scraping/DocumentVisor.js.jsx
var React          = require('react');
var ScrapingStore = require('../../stores/ScrapingStore');
var container      = VendataConstants.DocumentCloud.params.container;

function getStateFromStores(){
    return {
        doc: ScrapingStore.getDocument()
    }
}
// <GreenJello> throoze, you can use shouldComponentUpdate as an optimization,
// and you can use componentWillReceiveProps to handle new props being passed
var DocumentVisor = React.createClass({

    getInitialState: function(){
        return getStateFromStores();
    },

    componentDidMount: function() {
        ScrapingStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        ScrapingStore.removeChangeListener(this._onChange);
        $(container).empty();
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        var out = true;
        if ((this.state.doc === null && nextState.doc !== null) ||
            (nextState.doc !== null && this.state.doc.dc_id !== nextState.doc.dc_id)) {
            var url = "http://www.documentcloud.org/documents/" + nextState.doc.dc_id + ".js";
            var params = VendataConstants.DocumentCloud.params;
            var width = $(window).width()*48/100;
            var height = $(window).height() - 85;
            $(container).width(width);
            $(container).height(height);
            params.width = params.maxwidth = width;
            params.height = params.maxheight = height;
            DV.load(url, params);
            $(container+" .spinner").remove();
            out = false;
        } else if (this.state.doc !== null && nextState.doc === null) {
            var start_message = VendataConstants.Strings.SCRAPING_REQUEST_DOC;
            $(container).empty();
            $(container).append('<h2 class="start-message">'+start_message+'</h2>');
        }
        return out;
    },

    _onChange: function() {
        this.setState(getStateFromStores());
    },

    render: function(){
        var start_message = VendataConstants.Strings.SCRAPING_REQUEST_DOC;
        return (
            <div id="document-visor" ref="document-visor" >
                <h2 className="start-message">{start_message}</h2>
            </div>
        );
    }
});

module.exports = DocumentVisor;