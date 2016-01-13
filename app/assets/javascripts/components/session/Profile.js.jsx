var React         = require('react');
var SessionStore  = require('../../stores/SessionStore.js.jsx');
var NavigationBar = require('../../components/layouts/NavigationBar.js.jsx');
var BS            = require('react-bootstrap');
var Create        = require('./Create');
var Input         = BS.Input,
    Panel         = BS.Panel,
    ListGroup     = BS.ListGroup,
    ListGroupItem = BS.ListGroupItem,
    Button        = BS.Button,
    ButtonInput   = BS.ButtonInput;


function getStateFromStores() {
    return {
        isLoggedIn: SessionStore.isLoggedIn(),
        user: JSON.parse(SessionStore.getUser()),
        email:SessionStore.getEmail()
      // t.string :name
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

    _openPanel: function(){
        this.setState({open: !this.state.open});
    },

    render: function() {
        var title = "Profile";
        return (
            <div className="profile-page">
                <Panel header={title}className="profile-panel">
                    <Panel >
                        <ListGroup fill>
                          <ListGroupItem>Rol:</ListGroupItem>
                          <ListGroupItem>Nombre:</ListGroupItem>
                          <ListGroupItem>Apodo:</ListGroupItem>
                          <ListGroupItem>Email:</ListGroupItem>
                          <ListGroupItem>Apodo:</ListGroupItem>
                          <ListGroupItem>
                             <div>
                                <Button bsStyle="primary" onClick={this._openPanel}>Create User</Button>
                                <Panel collapsible expanded={this.state.open}>
                                  <Create></Create>
                                </Panel>
                              </div>
                          </ListGroupItem>
                        </ListGroup>
                    </Panel>
                </Panel>
            </div>
        );
    }
});

module.exports = Profile;