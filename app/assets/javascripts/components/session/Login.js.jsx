// ./scripts/component/session/Login.js.jsx
var React                 = require('react');
var SessionActionCreators = require('../../actions/SessionActionCreators.js.jsx'),
    SessionStore          = require('../../stores/SessionStore.js.jsx'),
    ErrorNotice           = require('../common/ErrorNotice');

var Login = React.createClass({
  getInitialState: function() {
    return { errors: [] };
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ errors: SessionStore.getErrors() });
  },

  _onSubmit: function(e) {
    e.preventDefault();
    this.setState({ errors: [] });
    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    SessionActionCreators.login(email, password);
  },

  _onClick: function() {
    console.log("login clicked!");
    alert("login clicked!");
  },

  render: function() {
    return (
      <div>
        <button onClick={this._onClick}>LoginPage</button>
      </div>
    );
  }
});

module.exports = Login;