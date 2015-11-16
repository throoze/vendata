// ./components/common/LoadingButton.js.jsx
var BS     = require('react-bootstrap');
var Button = BS.Button;

var LoadingButton = React.createClass({

  propTypes: {
    clickHandler: React.PropTypes.func,
    text: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      clickHandler: function(){}
    };
  },

  getInitialState: function() {
    return {
      isLoading: false,
      active: true
    };
  },

  render: function() {
    let isLoading = this.state.isLoading;
    return (
      <Button
        bsStyle="primary"
        disabled={isLoading && active}
        onClick={!isLoading ? this.handleClick : null}>
        {isLoading ? 'Loading...' : this.props.children }
      </Button>
    );
  },

  handleClick: function() {
    this.setState({isLoading: true});
    var callback = function (active){
      if (typeof active === "undefined" || active === null) {
        active = this.state.active;
      }
      this.setState({isLoading: false, active: active});
    }
    this.props.clickHandler(callback);
  }
});

module.exports = LoadingButton;