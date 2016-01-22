var React                 = require('react');
var BS                    = require('react-bootstrap');
var SessionActionCreators = require('../../actions/SessionActionCreators.js.jsx'),
    SessionStore          = require('../../stores/SessionStore.js.jsx'),
    ErrorNotice           = require('../common/ErrorNotice.js.jsx');
var Input                 = BS.Input;
var ButtonInput           = BS.ButtonInput,
    Panel                 = BS.Panel,
    Alert                 = BS.Alert,
    Collapse              = BS.Collapse;



function getStateFromStores() {
    return {
        user: JSON.parse(SessionStore.getUser()),
        email:SessionStore.getEmail(),
        access_token:SessionStore.getAccessToken(),
        client:SessionStore.getClient(),
        expiry:SessionStore.getExpiry(),
        errors:SessionStore.getErrors(),
    };
}

var Update = React.createClass({

    getInitialState: function() {
        return { errors: [] , nameValue:this.props.uName, nickValue:this.props.uNickname, 
                 emailValue:this.props.uEmail, passValue:'', passConfirmationValue:'', 
                 roleValue:this.props.uRole, alertVisible:false};
    },

    componentDidMount: function() {
        SessionStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        SessionStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(getStateFromStores());
        if ((this.state.errors.length) !== 0) {
          this.setState({ alertVisible:true });
        }else {
            this.setState({ alertVisible:true });
            this.setState({errors: "Exito!"});
        }   
    },

    _emailChange: function(e) {
        this.setState({emailValue: e.target.value});
    },

    _passChange: function(e) {
        this.setState({passValue: e.target.value});
    },

    _confChange: function(e) {
        this.setState({passConfirmationValue: e.target.value});
    },

    _roleChange: function(e) {
        this.setState({roleValue: e.target.value});
    },

    _nameChange: function(e) {
        this.setState({nameValue: e.target.value});
    },

    _nickChange: function(e) {
        this.setState({nickValue: e.target.value});
    },

    _checkStateValue: function(e) {
        console.log(e);
        var resp = "";
        e === null ? resp = "Campo Vacio" : resp = e ; 
        return resp;
    },

    _onSubmit: function(e) {
        e.preventDefault();
        this.setState({ errors: [] });
        var email = this.state.emailValue.trim();
        var role = this.state.roleValue.trim();
        var password = this.state.passValue.trim();
        var confirm = this.state.passConfirmationValue.trim();
        var name = this.state.nameValue.trim();
        var nickname = this.state.nickValue.trim();
        body = {
            "email":email,
            "role":role,
            "password":password,
            "name":name,
            "nickname":nickname,
            "password_confirmation":confirm
        };
        SessionActionCreators.update(this.props.uClient, this.props.uAccessToken, this.props.uEmail, this.props.uExpiry, body);
        SessionActionCreators.loadUser();
    },
    render: function() {
        return (
          <div>
            <form onSubmit={this._onSubmit}>
              <Input type="text"  value={this.state.emailValue} label="Email" onChange={this._emailChange}/>
              <Input type="text"  value={this.state.roleValue} label="Rol" onChange={this._roleChange}/>
              <Input type="text"  value={this.state.nickValue} label="Apodo" onChange={this._nickChange}/>
              <Input type="text"  value={this.state.nameValue} label="Nombre" onChange={this._nameChange}/>
              <Input type="password"  value={this.state.passValue} label="Clave" onChange={this._passChange}/>
              <Input type="password"  value={this.state.passConfirmationValue} label="Confirmacion de Clave"onChange={this._confChange}/>
              <ButtonInput bsStyle="primary" type="submit" value="Actualizar"/>
              <Collapse in={this.state.alertVisible}>
                    <div>
                      <Alert bsStyle="info">
                        {this.state.errors}
                      </Alert>
                    </div>
              </Collapse>
            </form>
          </div>
        );
    }

});

module.exports = Update;