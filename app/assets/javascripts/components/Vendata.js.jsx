// ./scripts/components/VendataApp.js.jsx
var RouteHandler = ReactRouter.RouteHandler;
var NavigationBar = require('../components/layouts/NavigationBar'),
    SessionStore = require('../stores/SessionStore');

function getStateFromStores() {
  return {
    isLoggedIn: false, // SessionStore.isLoggedIn(),
    user: { email : 'example@example.com' } // SessionStore.getUser()
  };
}

var Vendata = React.createClass({

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

  render: function() {
    var isLoggedIn = this.state === null ? false : this.state.isLoggedIn;
    var email = this.state === null ? '' : this.state.user.email;
    return (
      <div className="app">
        <NavigationBar isLoggedIn={isLoggedIn} email={email} />
        <div style={{height: 50 + 'px', clear: 'both'}}></div>
        <RouteHandler/>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Vendata;