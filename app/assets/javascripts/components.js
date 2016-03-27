// Tell react-rails where our components are
//= require_self
//= require_tree ./components

window.React = require('react');
window.ReactRouter = require('react-router');
window.VENDATA_HOST = '';
window.VendataConstants = require('./constants/VendataConstants.js');

// window.Auth = require('j-toker');
// console.log("JQuery version: " + $.fn.jquery);

// window.Auth.configure({
//   apiUrl:  VendataConstants.API_URL
// });

// Auxiliar global timeout reference
window.timeoutReference = null;

// Components:
window.Vendata       = require('./components/Vendata');
window.Login         = require('./components/session/Login');
window.Scraping      = require('./components/scraping/Scraping');
// Routing
window.Router  = require('./routes');

// window.StaticRouter= React.createClass({
//     render: function(){
//         var RouteHandler = ReactRouter.run(Router, this.props.path, function(){});
//         return (
//             <RouteHandler {...this.props} path={undefined} />
//         );
//     }
// });