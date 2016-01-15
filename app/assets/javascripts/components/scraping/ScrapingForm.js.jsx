// ./components/scraping/ScrapingForm.js.jsx
var ReactRouter   = require('react-router');
var BS            = require('react-bootstrap');
var ScrapingStore = require('../../stores/ScrapingStore');
var Strings       = VendataConstants.Strings;
var Utils         = VendataConstants.Utils;
var Panel         = BS.Panel,
    Input         = BS.Input,
    Button        = BS.Button;

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
        if (this.props.field.options !== undefined && this.props.field.options !== null){
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

var ListField = React.createClass({
    render: function() {
        var childType = Utils.peel(this.props.field.type);
        return (
            <Panel>
                <div className="fields-container">
                    <div>
                        <Field {...this.props} />
                        <Button className="remove" bsStyle="danger">{Strings.DELETE}</Button>
                    </div>
                </div>
                <Button className="add-new" bsStyle="success">{Strings.ADD}</Button>
            </Panel>
        );
    }
});

function findSchema(props) {
    if (props.type !== null && props.type !== undefined){
        var schemata = props.schemata;
        var entity = {
                description: schemata.descriptions[props.type],
                parenthood: schemata.parenthood[props.type],
                inheritance: schemata.inheritance[props.type],
                constraints: schemata.constraints[props.type],
                fields: {}
            };
        parents = entity.inheritance.reverse();
        for (var parent in parents) {
            $.extend(entity.fields, schemata.descriptions[parents[parent]].fields);
        }
        $.extend(entity.fields, entity.description.fields);
        return entity;
    } else {
        return {
                description: null,
                parenthood: null,
                inheritance: null,
                constraints: null,
                fields: null
            };
    }
} 

var AbstractEntity = React.createClass({

    getInitialState: function(){
        var state = {
            entity_chosen: false,
            entity: "select"
        };
        return state;
    },

    _chooseAlternative: function(e) {
        if (e.target.value == "select") {
            this.setState({
                entity: "select",
                entity_chosen: false
            });
        } else {
            this.setState({
                entity:e.target.value,
                entity_chosen: true
            });
        }
    },

    render: function() {
        var type = this.props.type;
        var alternatives = ["select"].concat(this.props.schemata.parenthood[this.props.type]);
        var schemata = this.props.schemata;
        var entity = null;
        if (this.state.entity_chosen){
            entity = (<Entity {...this.props} type={this.state.entity} />);
        }
        return (
            <Panel>
                <div className="form-group">
                    <select className="form-control" onChange={this._chooseAlternative} ref={type+"-options"}>
                        {alternatives.map(function(alt){
                            var msg = alt != "select" ? schemata.descriptions[alt].human_readable
                            :Strings.CHOOSE_ALTERNATIVE_ENTITY;
                            return (<option key={alt+"-option"} value={alt}>{msg}</option>);
                        })}
                    </select>
                </div>
                {entity}
            </Panel>
            );
    }

});

var Entity = React.createClass({

    getDefaultProps: function() {
        return {
            wrapper: Panel
        };
    },

    render: function() {
        var type = this.props.type;
        var schema = findSchema(this.props);
        var schemata = this.props.schemata;
        var abstract = (schema.description.abstract !== undefined) && 
                       (schema.description.abstract !== null)? schema.description.abstract : false;
        var fields = [];

        if (abstract) {
            return (<AbstractEntity {...this.props} />);
        } else {
            return (
                <Panel>
                    {(Object.keys(schema.fields)).map(function(field){
                        var hidden = schema.fields[field].hidden !== null 
                                  && schema.fields[field].hidden !== undefined
                                   ? schema.fields[field].hidden : false;
                        if (!hidden) {
                            return (
                                <Field key={type+"-"+field}
                                   type={schema.fields[field].type}
                                   fieldname={field}
                                   field={schema.fields[field]}
                                   schemata={schemata}/>
                            );
                        }
                    })}
                </Panel>
                );
        }
    }
});

var Field = React.createClass({

    getInitialState: function(){
        return { type: null };
    },

    componentDidMount: function() {
        this._chooseType();
    },

    _chooseType: function() {
        var type = this.props.type;
        switch (type) {
            case "boolean":
            case "date":
            case "string":
            case "number":
                this.setState({ type: "BasicField" });
                break;
            default:
                if (Utils.startsWith(type, "[") && Utils.endsWith(type, "]")) {
                    this.setState({ type: "ListField" });
                } else {
                    this.setState({ type: "Entity" });
                }
        }
    },

    render: function() {
        switch(this.state.type){
            case "BasicField":
                return (<BasicField {...this.props}/>);
            case "Entity":
                console.log('Field: -> Entity.  this.props: ',this.props);
                return (<Entity {...this.props}/>);
            case "ListField":
                return (<ListField {...this.props} type={Utils.peel(this.props.field.type)}/>);
            default:
                return null;
        }
    }
});


var ScrapingForm = React.createClass({
    
    getInitialState: function(){
        var state = {
            scraping: {},
            root_chosen: false,
            root: null,
            doc: ScrapingStore.getDocument()
        };
        return state;
    },

    componentDidMount: function() {
        ScrapingStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        ScrapingStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState({
            doc: ScrapingStore.getDocument()
        });
    },

    render: function(){
        var downloadPDF = null;
        if (this.state.doc !== null){
            var id = this.state.doc.dc_id.valueOf();
            var splitted = id.split("-");
            var head = splitted.shift();
            var tail = splitted.join("-");
            var url = "https://assets.documentcloud.org/documents/";
            url += head +"/" + tail + ".pdf";
            downloadPDF = (
                <Button key="scraping-download-document" bsStyle="info" href={url} target="_blank" >{Strings.DOWNLOAD_PDF}</Button>
            );
        }
        var title = (<h3>{Strings.SCRAPING_FORM_TITLE}</h3>);
        if (this.state.doc) {
            return (
                <Panel id="scraping-form" header={title} bsStyle={"primary"}>
                    {downloadPDF}
                    <Field schemata={this.props.schemata} type={this.props.schemata.root_collection} />
                </Panel>
            );
        } else {
            return null;
        }
    }
});

module.exports = ScrapingForm;