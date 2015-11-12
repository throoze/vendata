var Route        = ReactRouter.Route,
    DefaultRoute = ReactRouter.DefaultRoute;
var Vendata      = require('./components/Vendata');
var Login        = require('./components/session/Login');

var Router = (
  <Route name="app" path="/" handler={Vendata}>
    <DefaultRoute handler={Login} />
    <Route name="login" path="login" handler={Login}/>
  </Route>
);

module.exports = Router;