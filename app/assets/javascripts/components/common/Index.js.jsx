var    BS = require('react-bootstrap');
var Image = BS.Image;

var Index = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {
    return (
      <div className="home">
        <Image src={""} responsive />
      </div>
      );
  }
});

module.exports = Index;