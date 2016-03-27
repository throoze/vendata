// ./routes.js.jsx
var ReactRouter  = require('react-router');
var Route        = ReactRouter.Route,
    DefaultRoute = ReactRouter.DefaultRoute;
var Vendata      = require('./components/Vendata');

var Login     	 = require('./components/session/Login');
var Profile   	 = require('./components/session/Profile');
//var Login        = require('./components/session/Login');
var Index	     = require('./components/common/Index')
var Scraping    = require('./components/scraping/Scraping');


var Router = (
  <Route name="app" path="/" handler={Vendata}>
    <DefaultRoute handler={Index} />
    <Route name="login" path="login" handler={Login}/>
    <Route name="profile" path="profile" handler={Profile}/>
    <Route name="scraping" path="scraping" handler={Scraping}/>
  </Route>
);

module.exports = Router;