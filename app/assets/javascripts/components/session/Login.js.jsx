// ./scripts/component/session/Login.js.jsx
var SessionActionCreators = require('../../actions/SessionActionCreators.js.jsx'),
    SessionStore          = require('../../stores/SessionStore.js.jsx'),
    ErrorNotice           = require('../common/ErrorNotice.js.jsx');

var BS                    = require('react-bootstrap');

var Input                 = BS.Input;
var ButtonInput           = BS.ButtonInput;


var divStyle = {
    
    backgroundColor: '#E8E8E8',
    
    borderRadius: 15,
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: '#808080',

    
};

// display: 'inline-block',  
//     position: 'fixed',
//     top: 0,
//     bottom: 0,
//     left: 10,
//     right: 0,
//     width: 240,
//     height: 150,
//     margin: 'auto'

var formStyle = {
  paddingTop:1,
  paddingRight:3,
  paddingBottom:2,
  paddingLeft:3
};

var Login = React.createClass({
  getInitialState: function() {
    return { errors: [] , emailValue:'', passValue:''};
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
  },

  _onSubmit: function(e) {
    alert("llego1!");
    e.preventDefault();
    alert("llego2!");
    this.setState({ errors: [] });
    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    if ( !email || !password) {
      return;
    }
    SessionActionCreators.login(email, password);
  },


  render: function() {
    return (
      <div>
        <form onSubmit={this._onSubmit}>
          <Input type="text" placeholder="Email" ref="email"/>
          <Input type="password" placeholder="Password" ref="password"/>
          <ButtonInput type="submit" value="Login"/>
        </form>
      </div>
    );
  }
});

module.exports = Login;