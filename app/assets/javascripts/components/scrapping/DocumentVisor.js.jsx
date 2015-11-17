// ./components/scrapping/DocumentVisor.js.jsx
var React          = require('react');
var ScrappingStore = require('../../stores/ScrappingStore');

function getStateFromStores(){
    return {
        doc: ScrappingStore.getDocument()
    }
}

var DocumentVisor = React.createClass({
    getInitialState: function(){
        return getStateFromStores();
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

    render: function(){
        var oembed = !(this.state.doc === null) ? this.state.doc.oembed.html : null;
        return (
            <div>
                <div id="document-visor" ref="document-visor"></div>
                <div dangerouslySetInnerHTML={{__html: oembed}}></div>
            </div>
            );
    }
});

module.exports = DocumentVisor;