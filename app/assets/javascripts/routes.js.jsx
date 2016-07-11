// ./routes.js.jsx
var ReactRouter  = require('react-router');
var Route        = ReactRouter.Route,
    DefaultRoute = ReactRouter.DefaultRoute;
var RouteHandler = ReactRouter.RouteHandler;
var Vendata      = require('./components/Vendata');

var Login     	 = require('./components/session/Login');
var Profile   	 = require('./components/session/Profile');
//var Login        = require('./components/session/Login');
var Index	     = require('./components/common/Index')
var Scraping     = require('./components/scraping/Scraping');
var Search       = require('./components/search/Search');
var Home         = require('./components/home');

App = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    render: function() {
        var html = (
            <div className="app">
                <RouteHandler {...this.props}/>
                {this.props.children}
            </div>
            );
        return html;
    }

});
var Router = (
    <Route name="app" path="/" handler={App}>
        <DefaultRoute handler={Home} />
        <Route name="platform" path="platform" handler={Vendata}>
            <Route name="login" path="login" handler={Login}/>
            <Route name="profile" path="profile" handler={Profile}/>
            <Route name="scraping" path="scraping" handler={Scraping}/>
            <Route name="search" path="search" handler={Search}/>
        </Route>
    </Route>
);

module.exports = Router;