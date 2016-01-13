var React 				  = require('react');

var SessionStore          = require('../../stores/SessionStore.js.jsx');
var NavigationBar = require('../../components/layouts/NavigationBar.js.jsx');

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


Profile = React.createClass({

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
		var mensaje = "Prueba Profile";
    	return (
    		<div className="profile-page">
    			//<NavigationBar isLoggedIn={this.state.isLoggedIn} email={this.state.email} />

    			//Imagen de profile
    			{mensaje}
    		</div>
    	);
  	}

});

module.exports = Profile;