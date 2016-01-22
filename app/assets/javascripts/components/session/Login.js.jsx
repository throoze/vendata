// ./scripts/component/session/Login.js.jsx
var SessionActionCreators = require('../../actions/SessionActionCreators.js.jsx'),
    SessionStore          = require('../../stores/SessionStore.js.jsx'),
    ErrorNotice           = require('../common/ErrorNotice.js.jsx');

var BS                    = require('react-bootstrap');

var Input                 = BS.Input;
var ButtonInput           = BS.ButtonInput,
    Panel                 = BS.Panel,
    Collapse              = BS.Collapse,
    Alert                 = BS.Alert;

var Login = React.createClass({

  getInitialState: function() {
    return { errors: [] , emailValue:'', passValue:'', alertVisible:false };
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _EmailChange: function(e) {
    this.setState({emailValue: e.target.value});
  },

  _PassChange: function(e) {
    this.setState({passValue: e.target.value});
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
    var password = this.state.passValue.trim();
    if ( !email || !password) {
      this.setState({alertVisible:false});
      return;
    };
    SessionActionCreators.login(email, password);
    this.setState({emailValue: '', passValue: ''});
  },


  render: function() {
    return (
      <div>
        <form onSubmit={this._onSubmit}>
          <Input type="text" placeholder="Correo" value={this.state.emailValue} onChange={this._EmailChange}/>
          <Input type="password" placeholder="Clave" value={this.state.passValue} onChange={this._PassChange}/>
          <ButtonInput type="submit" value="Conectarse"/>
          <Collapse in={this.state.alertVisible}>
                    <div>
                      <Alert bsStyle="info" >
                        {this.state.errors}
                      </Alert>
                    </div>
          </Collapse>
        </form>
      </div>
    );
  }
});

module.exports = Login;