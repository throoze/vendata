window.React            = require('react');
var    ReactDOM         = require('react-dom');
window.ReactRouter      = require('react-router');
var    Routes           = require('./routes');
window.VendataConstants = require('./constants/VendataConstants.js');


ReactRouter.run(Routes, ReactRouter.HistoryLocation, function(Handler, routerState) {
  ReactDOM.render(React.createElement(Handler, null), document.getElementById('vendata'));
});