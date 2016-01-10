// ./scripts/component/session/Login.js.jsx
var React                 = require('react');
var SessionActionCreators = require('../../actions/SessionActionCreators.js.jsx'),
    SessionStore          = require('../../stores/SessionStore.js.jsx'),
    ErrorNotice           = require('../common/ErrorNotice');
var ChangeAware           = require('../../mixins/ChangeAware');

var Login = React.createClass({

  mixins: [ChangeAware(SessionStore, this._onChange)],

  getInitialState: function() {
    return { errors: [] };
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

  render: function() {
    return (
      <div>
        <h1>LoginPage</h1>
      </div>
    );
  }
});

module.exports = Login;