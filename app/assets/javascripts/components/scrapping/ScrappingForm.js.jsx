// ./components/scrapping/ScrappingForm.js.jsx
var React = require('react');
var ScrappingStore = require('../../stores/ScrappingStore');

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
        return (
            <div id="scrapping-form">
                <form onSubmit={this._onSubmit}>
                    {this._selectInstance()}
                    {this._generateCollectionInstance()}
                </form>
            </div>
        );
    }
});

module.exports = ScrappingForm;