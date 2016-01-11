
var SessionStore          = require('../../stores/SessionStore.js.jsx');
var NavigationBar = require('../../components/layouts/NavigationBar');

var BS                    = require('react-bootstrap');

var Input                 = BS.Input,
	ButtonInput           = BS.ButtonInput;


function getStateFromStores() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    user: JSON.parse(SessionStore.getUser()),
    email:SessionStore.getEmail()
  };
}

ProfilePage = React.createClass({

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
    	return (
    		<div className="profile-page">
    			<NavigationBar isLoggedIn={this.state.isLoggedIn} email={this.state.email} />

    			//Imagen de profile
    			:Prueba de Profile:
    		</div>
    	);
  	}

});

module.exports = ProfilePage;