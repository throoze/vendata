// ./components/scraping/BasicField.js.jsx
var BS      = require('react-bootstrap');
var Strings = VendataConstants.Strings;
var Input   = BS.Input;

var BasicField = React.createClass({

    getInitialState: function(){
        return {
            value: null,
            type: this._chooseType()
        };
    },

    _chooseType: function() {
        var type = "";
        if (this.props.field.options === null || this.props.field.options === undefined) {
            console.log('BasicField: field type: ', this.props.field.type);
            switch (this.props.field.type) {
                case "boolean":
                    type = "checkbox";
                    break;
                case "date":
                case "string":
                case "number":
                    type = "text";
                    break;
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
            var fieldname = this.props.fieldname;
            var field = this.props.field;
            var type = this.props.type;
            var labelify = this._labelify;
            
            return this.props.field.options.map(function(opt){
                return (
                    <option key={type+"-"+fieldname+"-"+opt} value={opt}>
                        {labelify(opt)}
                    </option>
                    );
            });
        } else {
            return null;
        }
    },


    render: function(){
        var output = null;
        var options = this._renderOptions(); 
        if (options !== null) {
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
                    {options}
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

module.exports = BasicField;