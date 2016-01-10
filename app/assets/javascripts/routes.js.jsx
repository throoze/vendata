var Route        = ReactRouter.Route,
    DefaultRoute = ReactRouter.DefaultRoute;
var Vendata      = require('./components/Vendata');
//var Login        = require('./components/session/Login');
var tempHome	 = require('./components/common/tempHome')
var Scrapping    = require('./components/scrapping/Scrapping');

var Router = (
  <Route name="app" path="/" handler={Vendata}>
    <DefaultRoute handler={tempHome} />
    <Route name="login" path="login" handler={Login}/>
    <Route name="scrapping" path="scrapping" handler={Scrapping}/>
  </Route>
);

module.exports = Router;