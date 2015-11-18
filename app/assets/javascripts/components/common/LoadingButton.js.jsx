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
      active: true,
      store: null
    };
  },

  _handleClick: function() {
    var state = this.state
    state.isLoading = true;
    this.setState(state);
    var callback = function (store){
      var state = this.state;
      state.isLoading = true;
      state.active = false;
      state.store = store;
      this.setState(state);
      store.addChangeListener(this._restoreLoading);
    }.bind(this);
    this.props.clickHandler(callback);
  },

  _restoreLoading: function(){
    var state = this.state;
    state.isLoading = false;
    state.active = true;
    state.store.removeChangeListener(this._restoreLoading);
    state.store = null;
    this.setState(state);
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