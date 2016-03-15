var React                 = require('react');
var BS                    = require('react-bootstrap');
var SessionActionCreators = require('../../actions/SessionActionCreators.js.jsx'),
    SessionStore          = require('../../stores/SessionStore.js.jsx'),
    ErrorNotice           = require('../common/ErrorNotice.js.jsx');
var Input                 = BS.Input;
var ButtonInput           = BS.ButtonInput;
    Panel                 = BS.Panel,
    Collapse              = BS.Collapse,
    Alert                 = BS.Alert;

var Create = React.createClass({

    getInitialState: function() {
        return { errors: [] , emailValue:'', passValue:'', passConfirmationValue:'', roleValue:'', alertVisible:false};
    },

    componentDidMount: function() {
        SessionStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        SessionStore.removeChangeListener(this._onChange);
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

    _onChange: function() {
        this.setState({ errors: SessionStore.getErrors() });
        if ((this.state.errors.length) !== 0) {
          this.setState({ alertVisible:true });
          console.log(this.state.alertVisible);
        };
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
        SessionActionCreators.create(email, password,confirm, role);
        this.setState({emailValue: '', passValue: '', passConfirmationValue: ''});
    },

    render: function() {
        return (
          <div>
            <form onSubmit={this._onSubmit}>
              <Input type="text" placeholder="Email" value={this.state.emailValue} onChange={this._emailChange}/>
              <Input type="text" placeholder="Role" value={this.state.roleValue} onChange={this._roleChange}/>
              <Input type="password" placeholder="Password" value={this.state.passValue} onChange={this._passChange}/>
              <Input type="password" placeholder="Pass Confirmation" value={this.state.passConfirmationValue} onChange={this._confChange}/>
              <ButtonInput bsStyle="primary" type="submit" value="Create"/>
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

module.exports = Create;