// ./components/search/Search.js.jsx
var SearchActionCreators = require('../../actions/SearchActionCreators');
var SearchResults        = require('./SearchResults');
var BS                   = require('react-bootstrap');
var Button               = BS.Button,
    Input                = BS.Input;
var Strings              = VendataConstants.Strings;
var Link                 = ReactRouter.Link;


var Search = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: function() {
        return {
            query: null
        }
    },

    _updateQuery: function(e) {
        e.preventDefault();
        this.setState({ query: this.refs.input.getValue() });
    },

    _search: function(e) {
        e.preventDefault();
        if (this.state.query !== null && this.state.query !== "")
            SearchActionCreators.search(this.state.query);
    },

    render: function() {
        return (
            <div id="search" className="search">
                <Link to="/"><div className="logo-image"></div></Link>
                <Input
                    type="text"
                    ref="input"
                    groupClassName="group-class"
                    labelClassName="label-class"
                    placeholder={Strings.ENTER_SEARCH_QUERY}
                    onChange={this._updateQuery} />
                <Button type="submit" onClick={this._search} >
                    {Strings.SEARCH}
                </Button>
                <SearchResults/>
            </div>
        );
    }
});

module.exports = Search;