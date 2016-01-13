// ./components/scraping/Field.js.jsx
var React         = require('react');
var BS            = require('react-bootstrap');
var ScrapingStore = require('../../stores/ScrapingStore');
var BasicField    = require('./Field');
var ListField     = require('./ListField');
var Entity        = require('./Entity');
var Strings       = VendataConstants.Strings;
var Utils         = VendataConstants.Utils;
var Input         = BS.Input;
var Panel         = BS.Panel;

var Field = React.createClass({

    _chooseType: function() {
        var choose = null;
        var type = this.props.type;
        switch (type) {
            case "boolean":
            case "date":
            case "string":
            case "number":
                choose = "BasicField";
                break;
            default:
                if (Utils.startsWith(type, "[") && Utils.endsWith(type, "]")) {
                    choose = "ListField";
                } else {
                    choose = "Entity";
                }
        }
        return choose;
    },

    render: function() {
        var type = this._chooseType();
        console.log('Field: this.props.type: ', this.props.type);
        console.log('Field: this._chooseType(): ', type);
        var field = null;
        switch(type){
            case "BasicField":
                field = (<BasicField {...this.props}/>);
                break;
            case "Entity":
                field = (<Entity {...this.props}/>);
                break;
            case "ListField":
                field = (<ListField {...this.props} type={Utils.peel(this.props.field.type)}/>);
                break;
            default:
        }
        return field;
    }
});

module.exports = Field;