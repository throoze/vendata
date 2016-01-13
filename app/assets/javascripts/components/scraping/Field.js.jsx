// ./components/scraping/ScrapingForm.js.jsx
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
        if (this.props.field.options === null || this.props.field.options === undefined) {
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
        if (this.props.field.label !== null && this.props.field.label !== undefined) {
            label = this.props.field.label;
        } else {
            label = this._labelify(this.props.fieldname);
        }
        return label;
    },

    _setPlaceholder: function() {
        // var placeholder = ""
        // if (this.props.field.placeholder !== null) {
        //     placeholder = this.props.field.placeholder;
        // } else {
        //     switch (this.props.field.type) {
        //         case "boolean":
        //             placeholder = Strings.PLACEHOLDER_CHOOSE;
        //             break;
        //         case "number":
        //             placeholder = Strings.PLACEHOLDER_NUMBER;
        //             break;
        //         case "date":
        //             placeholder = Strings.PLACEHOLDER_DATE;
        //             break;
        //         case "string":
        //         default:
        //             placeholder = Strings.PLACEHOLDER_TEXT;
        //     }
        // }
        // return placeholder;
        return this._setLabel();
    },

    _setHelp: function() {
        var help = null;
        if (this.props.field.hint !== null && this.props.field.hint !== undefined) {
            help = this.props.field.hint;
        }
        return help;
    },

    _setValidation: function() {
        if (this.props.validation !== null && this.props.validation !== undefined) {
            var validate = this.props.validation;
            return validate(this.getValue());
        }
    },

    _setRef: function() {
        return "input";
    },

    _renderOptions: function() {
        if (this.props.field.options !== undefined){
            var options = [];
            for (var i = 0; i < this.props.field.options.length; i++) {
                options.push(
                    <option key={this.props.fieldname+this.props.field.options[i]} value={this.props.field.options[i]}>
                        {this._labelify(this.props.field.options[i])}
                    </option>);
            }
            return options;
        } else {
            return null;
        }
    },


    render: function(){
        var output = null;
        if (this._renderOptions() !== null) {
            output = (
                <Input  type={this._setType()}
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
        } else {
            output = (
                <Input  type={this._setType()}
                        placeholder={this._setPlaceholder()}
                        help={this._setHelp()}
                        bsStyle={this._setValidation()}
                        hasFeedback
                        ref={this._setRef()}
                        groupClassName="group-class"
                        labelClassName="label-class"
                        onChage={this._handleChange} />
                );
        }
        return output;
    }
});

module.exports = Field;