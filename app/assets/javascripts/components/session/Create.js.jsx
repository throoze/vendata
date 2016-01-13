var React                 = require('react');
var BS                    = require('react-bootstrap');
var SessionActionCreators = require('../../actions/SessionActionCreators.js.jsx'),
    SessionStore          = require('../../stores/SessionStore.js.jsx'),
    ErrorNotice           = require('../common/ErrorNotice.js.jsx');
var Input                 = BS.Input;
var ButtonInput           = BS.ButtonInput;

var Create = React.createClass({

    getInitialState: function() {
        return { errors: [] , emailValue:'', passValue:'', passConfirmationValue:''};
    },

    _EmailChange: function(e) {
        this.setState({emailValue: e.target.value});
    },

    _PassChange: function(e) {
        this.setState({passValue: e.target.value});
    },

    _ConfChange: function(e) {
        this.setState({passConfirmationValue: e.target.value});
    },

    _onSubmit: function(e) {
        e.preventDefault();
        this.setState({ errors: [] });
        var email = this.state.emailValue.trim();
        var password = this.state.passValue.trim();
        var confirm = this.state.passConfirmationValue.trim();
        if ( !email || !password || !confirm) {
          return;
        }
        SessionActionCreators.create(email, password,confirm);
        this.setState({emailValue: '', passValue: '', passConfirmationValue: ''});
    },

    render: function() {
        return (
          <div>
            <form onSubmit={this._onSubmit}>
              <Input type="text" placeholder="Email" value={this.state.emailValue} onChange={this._EmailChange}/>
              <Input type="password" placeholder="Password" value={this.state.passValue} onChange={this._PassChange}/>
              <Input type="password" placeholder="Pass Confirmation" value={this.state.passConfirmationValue} onChange={this._ConfChange}/>
              <ButtonInput type="submit" value="Create"/>
            </form>
          </div>
        );
    }

});

module.exports = Create;