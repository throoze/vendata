var React    = require('react');
var ReactDOM = require('react-dom');
var Router   = require('react-router');
var Routes   = require('./routes');


Router.run(Routes, Router.HistoryLocation, function(Handler, routerState) {
  ReactDOM.render(React.createElement(Handler, null), document.getElementById('vendata'));
});