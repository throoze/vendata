// ./scripts/components/Vendata.js.jsx
var ReactRouter        = require('react-router');
var RouteHandler       = ReactRouter.RouteHandler;
var NavigationBar      = require('../components/layouts/NavigationBar');
var SessionStore       = require('../stores/SessionStore');
var NotificationSystem = require('react-notification-system');

function getStateFromStores() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    user: JSON.parse(SessionStore.getUser()),
    email:SessionStore.getEmail()
  };
}

var Vendata = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },
  
  getInitialState: function() {
    var state = getStateFromStores();
    state.notificationSystem = null;
    return state;
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
    this.setState({ notificationSystem: this.refs.notificationSystem });
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  render: function() {
    //var isLoggedIn = this.state === null ? false : this.state.isLoggedIn;
   // var email = this.state.user !== null? this.state.user.email : "";
    return (
      <div className="vendata">
        <NavigationBar isLoggedIn={this.state.isLoggedIn} email={this.state.email} {...this.props}/>
        <div style={{height: 50 + 'px', clear: 'both'}}></div>
        <RouteHandler notificationSystem={this.state.notificationSystem} isLoggedIn={this.state.isLoggedIn} user={this.state.user} {...this.props}/>
        {this.props.children}
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }
});

module.exports = Vendata;