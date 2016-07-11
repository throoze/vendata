// ./components/search/SearchResults.js.jsx
var SearchStore = require('../../stores/SearchStore');
var Strings     = VendataConstants.Strings;


var SimpleField = React.createClass({
    render: function(){
        return (
            <div><label>{this.props.key}</label>: {this.props.value}</div>
            );
    }
});

var ListField = React.createClass({
    render: function(){
        return (
            <div>
            <label>{this.props.key}</label>
            {this.props.values.map(function(elem) {
                return null;
            })}
            </div>
            );
    }
});

var SearchResults = React.createClass({

    getInitialState: function() {
        return {
            results: []
        }
    },

    _getStateFromStores: function(){
        return { results: SearchStore.getResults() };
    },

    componentDidMount: function() {
        SearchStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        SearchStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(this._getStateFromStores());
    },

    render: function() {
        if (this.state.results.length == 0) {
            return (<div><p>{Strings.NO_RESULTS}</p></div>);
        } else {
            return (<div>{JSON.stringify(this.state.results)}</div>)
        }
    }
});

module.exports = SearchResults;