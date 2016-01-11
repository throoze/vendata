// ./routes.js.jsx
var ReactRouter  = require('react-router');
var Route        = ReactRouter.Route,
    DefaultRoute = ReactRouter.DefaultRoute;
var Vendata      = require('./components/Vendata');
//var Login      = require('./components/session/Login');
//var Logout     = require('./components/session/Logout');
//var Profile    = require('./components/session/Logout');
var tempHome	 = require('./components/common/tempHome');
var Scrapping    = require('./components/scrapping/Scrapping');

var Router = (
  <Route name="app" path="/" handler={Vendata}>
    <DefaultRoute handler={Index} />
    <Route name="login" path="login" handler={Login}/>
    <Route name="profile" path="profile" handler={Profile}/>
    <Route name="scrapping" path="scrapping" handler={Scrapping}/>
  </Route>
);

module.exports = Router;