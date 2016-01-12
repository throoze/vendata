var    BS = require('react-bootstrap');
var Image = BS.Image;

var Index = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {
    return (
      <div className="home">
          <div className="inner"></div>
      </div>
      );
  }
});

module.exports = Index;