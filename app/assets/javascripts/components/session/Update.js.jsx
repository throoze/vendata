var React                 = require('react');
var BS                    = require('react-bootstrap');
var SessionActionCreators = require('../../actions/SessionActionCreators.js.jsx'),
    SessionStore          = require('../../stores/SessionStore.js.jsx'),
    ErrorNotice           = require('../common/ErrorNotice.js.jsx');
var Input                 = BS.Input;
var ButtonInput           = BS.ButtonInput;



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

var Update = React.createClass({

    getInitialState: function() {
        return { errors: [] , emailValue:'', passValue:'', passConfirmationValue:'', roleValue:''};
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

    _onSubmit: function(e) {
        e.preventDefault();
        this.setState({ errors: [] });
        var email = this.state.emailValue.trim();
        var role = this.state.roleValue.trim();
        var password = this.state.passValue.trim();
        var confirm = this.state.passConfirmationValue.trim();
        if ( !email || !password || !confirm || !role) {
          return;
        }
        SessionActionCreators.update(client, access_token, uid, expiry, body);
        this.setState({emailValue: '', passValue: '', passConfirmationValue: ''});
    },

    // t.string :nickname
    // t.string :image
    // t.string :email
    // t.string :role
    render: function() {
        return (
          <div>
            <form onSubmit={this._onSubmit}>
              <Input type="text" placeholder="Email" value={this.state.emailValue} onChange={this._emailChange}/>
              <Input type="text" placeholder="Role" value={this.state.roleValue} onChange={this._roleChange}/>
              <Input type="text" placeholder="Nickname" value={this.state.nickValue} onChange={this._nickChange}/>
              <Input type="text" placeholder="Name" value={this.state.nameValue} onChange={this._nameChange}/>
              <Input type="password" placeholder="Password" value={this.state.passValue} onChange={this._passChange}/>
              <Input type="password" placeholder="Pass Confirmation" value={this.state.passConfirmationValue} onChange={this._confChange}/>
              <ButtonInput bsStyle="primary" type="submit" value="Update"/>
            </form>
          </div>
        );
    }

});

module.exports = Update;