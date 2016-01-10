// ./components/scrapping/ScrappingForm.js.jsx
var React   = require('react');
var BS      = require('react-bootstrap');
var Strings = VendataConstants.Strings;
var Input   = BS.Input;


var Field = React.createClass({

    getInitialState: function(){
        return {
            value: null,
            type: this._chooseType()
        };
    },

    _chooseType: function() {
        var type = "";
        if (this.props.field.options === null) {
            switch (this.props.field.type) {
                case "boolean":
                    type = "checkbox";
                    break;
                case "string":
                case "number":
                case "date":
                default:
                    type = "text";
            }
        } else {
            type = "select";
        }
        return type;
    },

    _handleChange: function() {
        this.setState({
            value: this.refs[this._setRef()].getValue()
        });
    },

    getValue: function() {
        return this.state.value;
    },

    _setType: function() {
        return this.state.type;
    },

    _labelify: function(str) {
        return str.split("_").map(function(word){
            return word.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
        }).join(" ");
    },

    _setLabel: function() {
        var label = "";
        if (this.props.field.label !== null) {
            label = this.props.field.label
        } else {
            label = this.labelify(this.props.fieldname);
        }
        return label;
    },

    _setPlaceholder: function() {
        var placeholder = ""
        if (this.props.field.placeholder !== null) {
            placeholder = this.props.field.placeholder;
        } else {
            switch (this.props.field.type) {
                case "boolean":
                    placeholder = Strings.PLACEHOLDER_CHOOSE;
                    break;
                case "number":
                    placeholder = Strings.PLACEHOLDER_NUMBER;
                    break;
                case "date":
                    placeholder = Strings.PLACEHOLDER_DATE;
                    break;
                case "string":
                default:
                    placeholder = Strings.PLACEHOLDER_TEXT;
            }
        }
        return placeholder;
    },

    _setHelp: function() {
        var help = null;
        if (this.props.field.hint !== null) {
            help = this.props.field.hint;
        }
        return help;
    },

    _setValidation: function() {
        if (this.props.validation !== null) {
            return this.props.validation(this.getValue());
        }
    },

    setRef: function() {
        return "input";
    },

    _renderOptions: function() {
        var options = [];
        if (this.props.field.options !== null){
            for (var key in this.props.field.options) {
                if (this.props.field.options.hasOwnProperty(key)) {
                    options.append(
                        <option value={this.props.field.options[key]}>
                            {this.labelify(this.props.field.options[key])}
                        </option>);
                }
            }
        }
    },


    render: function(){
        return (
            <Input  type={this._setType()}
                    label={this._setLabel()}
                    placeholder={this._setPlaceholder()}
                    help={this._setHelp()}
                    bsStyle={this._setValidation()}
                    hasFeedback
                    ref={this._setRef()}
                    groupClassName="group-class"
                    labelClassName="label-class"
                    onChage={this._handleChange} >
                {this._renderOptions()}
                {this.props.children}
            </Input>
            );
    }
});

module.exports = Field;