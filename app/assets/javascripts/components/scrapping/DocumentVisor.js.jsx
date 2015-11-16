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
        return (<div data-id="document-visor" ref="document-visor"></div>);
    }
});

module.exports = DocumentVisor;