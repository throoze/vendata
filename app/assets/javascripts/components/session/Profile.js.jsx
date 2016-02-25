var React         = require('react');

var SessionActionCreators = require('../../actions/SessionActionCreators.js.jsx');

var Strings = require('../../constants/VendataConstants.js').Strings;

var SessionStore  = require('../../stores/SessionStore.js.jsx');
var NavigationBar = require('../../components/layouts/NavigationBar.js.jsx');
var BS            = require('react-bootstrap');
var Create        = require('./Create');
var Update        = require('./Update');
var ListaUsuarios = require('./ListaUsuarios');
var Input         = BS.Input,
    Panel         = BS.Panel,
    ListGroup     = BS.ListGroup,
    ListGroupItem = BS.ListGroupItem,
    Button        = BS.Button,
    ButtonToolbar = BS.ButtonToolbar,
    ButtonInput   = BS.ButtonInput,
    Collapse      = BS.Collapse;


function getStateFromStores() {
    return {
        isLoggedIn: SessionStore.isLoggedIn(),
        user: JSON.parse(SessionStore.getUser()),
        email:SessionStore.getEmail(),
        access_token:SessionStore.getAccessToken(),
        client:SessionStore.getClient(),
        expiry:SessionStore.getExpiry(),
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

    _openStatistics: function(){
        this.setState({openStatistics: !this.state.openStatistics});
    },

    _openManageUsers: function(){
        this.setState({openManageUsers: !this.state.openManageUsers});
    },

    _checkStateValue: function(e) {
        var resp = "";
        e === null ? resp = " Campo Vacio" : resp = e;
        return resp;
    },

    render: function() {
        var PossibleActions = this.state.user.role === "Admin" ? (
            <div>
                <Button bsStyle="primary" onClick={this._openCreate}>{Strings.CREATE_ACTION}</Button>
                <Collapse in={this.state.openCreate}>
                    <div>
                        <Panel>  
                          <Create></Create>
                        </Panel>
                    </div>
                </Collapse>
                <Button bsStyle="primary" onClick={this._openUpdate}>{Strings.UPDATE_ACTION}</Button>
                 <Collapse in={this.state.openUpdate}>
                    <div>
                        <Panel>
                          <Update
                            uEmail          = {this.state.email}
                            uClient         = {this.state.client}
                            uAccessToken    = {this.state.access_token}
                            uExpiry         = {this.state.expiry}
                            uName           = {this.state.user.name}
                            uNickname       = {this.state.user.nickname}
                            uRole           = {this.state.user.role}
                          ></Update>
                        </Panel>
                    </div>
                </Collapse>
                <Button bsStyle="primary" onClick={this._openStatistics}>{Strings.MY_STATISTICS}</Button>
                <Collapse in={this.state.openStatistics}>
                    <div>
                    Aqui van las estadisticas
                    </div>
                </Collapse>
                <Button bsStyle="primary" onClick={this._openManageUsers}>{Strings.MANAGE_USERS_STATISTICS}</Button>
                <Collapse in={this.state.openManageUsers}>
                    <div>
                    <ListaUsuarios></ListaUsuarios>
                    </div>
                </Collapse>
            </div>
            ):(
            <div>
                <Button bsStyle="primary" onClick={this._openUpdate}>{Strings.UPDATE_ACTION}</Button>
                <Collapse in={this.state.openUpdate}>
                    <div>
                        <Panel>
                          <Update
                            uEmail          = {this.state.email}
                            uClient         = {this.state.client}
                            uAccessToken    = {this.state.access_token}
                            uExpiry         = {this.state.expiry}
                            uName           = {this.state.user.name}
                            uNickname       = {this.state.user.nickname}
                            uRole           = {this.state.user.role}
                          ></Update>
                        </Panel>
                    </div>
                </Collapse>
                <Button bsStyle="primary" onClick={this._openStatistics}>{Strings.MY_STATISTICS}</Button>
                <Collapse in={this.state.openStatistics}>
                    <div>
                    </div>
                </Collapse>
            </div> 
            );
        return (
            <div className="profile-panel">
                <Panel header={Strings.PROFILE}>
                    <Panel>
                        <ListGroup fill>
                            <ListGroupItem><b>Rol</b> : {this.state.user.role}</ListGroupItem>
                            <ListGroupItem><b>Nombre</b> : {this.state.user.name}</ListGroupItem>
                            <ListGroupItem><b>Apodo</b> : {this.state.user.nickname}</ListGroupItem>
                            <ListGroupItem><b>Email</b> : {this.state.user.email}</ListGroupItem>
                        </ListGroup>
                    </Panel>
                </Panel>
                <Panel header={Strings.ACTIONS}>
                   {PossibleActions}
                </Panel>
            </div>
        );
    }
});

module.exports = Profile;