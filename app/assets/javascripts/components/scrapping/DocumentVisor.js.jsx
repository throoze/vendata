// ./components/scrapping/DocumentVisor.js.jsx
var React          = require('react');
var ScrappingStore = require('../../stores/ScrappingStore');
var container      = VendataConstants.DocumentCloud.params.container;

function getStateFromStores(){
    return {
        doc: ScrappingStore.getDocument()
    }
}
// <GreenJello> throoze, you can use shouldComponentUpdate as an optimization,
// and you can use componentWillReceiveProps to handle new props being passed
var DocumentVisor = React.createClass({
    getInitialState: function(){
        var state = getStateFromStores();
        state.loading = false;
        return state;
    },

    componentDidMount: function() {
        ScrappingStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        $(container).empty();
        ScrappingStore.removeChangeListener(this._onChange);
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        console.log("DocumentVisor: shouldComponentUpdate");
        var out = false;
        if ((this.state.doc === null && nextState.doc !== null) ||
            (nextState.doc !== null && this.state.doc.dc_id !== nextState.doc.dc_id)) {
            console.log("DocumentVisor: Loading visor...");
            var url = "http://www.documentcloud.org/documents/" + nextState.doc.dc_id + ".js";
            $(container).empty();
            $(container).addClass('throbber-loader');
            var params = VendataConstants.DocumentCloud.params;
            params.width = $(container).width();
            params.height = $(window).height() - 85;
            DV.load(url, params);
            $(container).removeClass('throbber-loader');
            var state = getStateFromStores();
            state.loading = false;
            this.setState(state);
        }
        return out;
    },

    _onChange: function() {
        var state = getStateFromStores();
        state.loading = true;
        this.setState(state);
    },

    render: function(){
        return (<div id="document-visor" ref="document-visor" ></div>);
    }
});

module.exports = DocumentVisor;