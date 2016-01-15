var React         = require('react');

var SessionActionCreators = require('../../actions/SessionActionCreators.js.jsx');

var SessionStore  = require('../../stores/SessionStore.js.jsx');
var NavigationBar = require('../../components/layouts/NavigationBar.js.jsx');
var BS            = require('react-bootstrap');
var Create        = require('./Create');
var Update        = require('./Update');
var Input         = BS.Input,
    Panel         = BS.Panel,
    ListGroup     = BS.ListGroup,
    ListGroupItem = BS.ListGroupItem,
    Button        = BS.Button,
    ButtonToolbar = BS.ButtonToolbar,
    ButtonInput   = BS.ButtonInput;


function getStateFromStores() {
    return {
        isLoggedIn: SessionStore.isLoggedIn(),
        user: JSON.parse(SessionStore.getUser()),
        email:SessionStore.getEmail(),
      // t.string :nickname
      // t.string :image
      // t.string :email
      // t.string :role
    };
}


Profile = React.createClass({

    getInitialState: function() {
        return getStateFromStores();
    },

    componentDidMount: function() {
        SessionStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        SessionStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(getStateFromStores());
    },

    _openCreate: function(){
        this.setState({openCreate: !this.state.openCreate});
    },

    _openUpdate: function(){
        this.setState({openUpdate: !this.state.openUpdate});
    },

    _checkStateValue: function(e) {
        e === null ? "Campo Vacio" : e ; 
    },

    render: function() {
        var title = "Profile";
        var actions = "Actions";
        return (
            <div className="profile-panel">
                <Panel header={title} >
                    <Panel>
                        <ListGroup fill>
                            <ListGroupItem>Rol:{this._checkStateValue(this.state.user.role)}</ListGroupItem>
                            <ListGroupItem>Nombre:{this.state.user.name}</ListGroupItem>
                            <ListGroupItem>Apodo:{this.state.user.nickname}</ListGroupItem>
                            <ListGroupItem>Email:{this.state.user.email}</ListGroupItem>
                        </ListGroup>
                    </Panel>
                </Panel>

                <Panel header={actions}>
                    <div>
                            <Button bsStyle="primary" onClick={this._openCreate}>Create New User</Button>
                            <Panel collapsible expanded={this.state.openCreate}>
                              <Create></Create>
                            </Panel>
                            <Button bsStyle="primary" onClick={this._openUpdate}>Update My Information</Button>
                            <Panel collapsible  expanded={this.state.openUpdate}>
                              <Update></Update>
                            </Panel>
                    </div>
                </Panel>
            </div>
        );
    }
});

module.exports = Profile;