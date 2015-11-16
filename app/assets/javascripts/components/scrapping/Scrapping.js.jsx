// ./components/scrapping/Scrapping.js.jsx
var BS            = require('react-bootstrap');
var ButtonToolbar = BS.ButtonToolbar,
    ButtonGroup   = BS.ButtonGroup,
    LoadingButton = require('../common/LoadingButton');
var DocumentVisor = require('./DocumentVisor'),
    ScrappingForm = require('./ScrappingForm');




var ScrappingToolbar = React.createClass({
    render : function() {
        return (
            <ButtonToolbar>
                <ButtonGroup>
                    <LoadingButton>{VendataConstants.Strings.SCRAP_NEW}</LoadingButton>
                    <LoadingButton>{VendataConstants.Strings.VALIDATE_NEW}</LoadingButton>
                </ButtonGroup>
            </ButtonToolbar>
        );
    }
});

var Scrapping = React.createClass({

    getInitialState: function() {
        return { 
            
            errors: []
        };
    },

    _onSubmit: function(e) {
        e.preventDefault();
        this.setState({ errors: [] });
        var email = this.refs.email.getDOMNode().value;
        var password = this.refs.password.getDOMNode().value;
        SessionActionCreators.login(email, password);
    },

    render: function() {
        return (
            <div className="scrapping">
                <ScrappingToolbar />
                <div className="scrapping-container">
                    <DocumentVisor className="document-visor" />
                    <ScrappingForm className="scrapping-form" />
                </div>
            </div>
        );
    }
});

module.exports = Scrapping;