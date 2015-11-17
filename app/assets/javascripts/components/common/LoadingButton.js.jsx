// ./components/common/LoadingButton.js.jsx
var React   = require('react');
var BS      = require('react-bootstrap');
var Button  = BS.Button;
var loading = VendataConstants.Strings.LOADING;

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

  _handleClick: function() {
    this.setState({isLoading: true});
    var callback = function (active){
      if (typeof active === "undefined" || active === null) {
        active = this.state.active;
      }
      this.setState({isLoading: false, active: active});
    }.bind(this);
    this.props.clickHandler(callback);
  },

  render: function() {
    var isLoading = this.state.isLoading;
    return (
      <Button
        bsStyle={this.props.bsStyle}
        disabled={isLoading || this.props.disabled || !this.state.active}
        onClick={!isLoading ? this._handleClick : null}>
        {isLoading ? loading : this.props.children }
      </Button>
    );
  }
});

module.exports = LoadingButton;