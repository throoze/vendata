// ./components/scraping/ScrapingForm.js.jsx
var ReactRouter   = require('react-router');
var BS            = require('react-bootstrap');
var ScrapingStore = require('../../stores/ScrapingStore');
var Strings       = VendataConstants.Strings;
var Utils         = VendataConstants.Utils;
var Select        = require('react-select');
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

    _handleChange: function(value) {
        this.setState({
            value: value
        });
    },

    getValue: function() {
        return this.state.value;
    },

    _setType: function() {
        return this.state.type;
    },

    _setLabel: function() {
        var label = "";
        if (this.props.field.label !== null && this.props.field.label !== undefined) {
            label = this.props.field.label;
        } else {
            label = Utils.labelify(this.props.fieldname);
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

    _getOptions: function() {
        if (this.props.field.options !== undefined && this.props.field.options !== null){
            return this.props.field.options.map(function(opt){
                return { value: opt , label: Utils.labelify(opt) };
            });
        } else {
            return null;
        }
    },


    render: function(){
        var output = null;
        var options = this._getOptions(); 
        if (options !== null) {
            output = (
                <Select
                    name={this._setLabel()}
                    allowCreate
                    options={options}
                    value={this.state.value}
                    noResultsText={Strings.NO_RESULTS}
                    placeholder={this._setLabel()} /*Strings.PLACEHOLDER_CHOOSE*/
                    searchingText={Strings.SEARCHING}
                    className="form-group group-class"
                    onChange={this._handleChange}/>
                    );
        } else {
            if (this.props.field.type == "boolean") {
                output = (
                    <Input  type={this._setType()}
                            label={this._setLabel()}
                            placeholder={this._setPlaceholder()}
                            help={this._setHelp()}
                            bsStyle={this._setValidation()}
                            hasFeedback
                            ref={this._setRef()}
                            groupClassName="group-class"
                            labelClassName="label-class"
                            onChage={this._handleChange} />
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
        }
        return output;
    }
});

var ListField = React.createClass({
    render: function() {
        var childType = Utils.peel(this.props.field.type);
        var extra = <Button className="remove" bsStyle="danger">{Strings.DELETE}</Button>;
        return (
            <Panel>
                <div className="fields-container">
                    <label>{Utils.labelify(this.props.fieldname)}</label>
                    <Field {...this.props} extra={extra} fieldname={null}/>
                </div>
                <Button className="add-new" bsStyle="success">{Strings.ADD}</Button>
            </Panel>
        );
    }
});

var AbstractEntity = React.createClass({

    getInitialState: function(){
        var state = {
            entity_chosen: false,
            entity: null
        };
        return state;
    },

    _chooseAlternative: function(value) {
        var chosen = true;
        if (value === null || value === undefined || value == "") {
            chosen = false;
        }
        this.setState({
            entity: value,
            entity_chosen: chosen
        });
    },

    render: function() {
        var type = this.props.type;
        var alternatives = this.props.schemata.parenthood[this.props.type];
        var schemata = this.props.schemata;
        var entity = null;
        if (this.state.entity_chosen){
            entity = (<Entity {...this.props} type={this.state.entity} fieldname={null} />);
        }
        options = alternatives.map(function(alt){
                    var msg = schemata.descriptions[alt].human_readable;
                    return { value: alt, label: msg };
                });
        return (
            <Panel>
                <label>{Utils.labelify(this.props.fieldname)}</label>
                <Select
                    name="options"
                    options={options}
                    value={this.state.entity} 
                    className="form-group group-class"
                    noResultsText={Strings.NO_RESULTS}
                    placeholder={Strings.CHOOSE_ALTERNATIVE_ENTITY}
                    searchingText={Strings.SEARCHING}
                    onChange={this._chooseAlternative}/>
                {entity}
            </Panel>
            );
    }

});

var Constant = React.createClass({
    getInitialState: function(){
        return { constants: [], value: null };
    },

    _choose: function(value){
        this.setState({ value: value });
    },

    _add_new_constant: function(){

    },

    render: function() {
        return (
            <Panel>
                <label>{Utils.labelify(this.props.fieldname)}</label>
                <Select
                    name="constants"
                    options={this.state.constants}
                    value={this.state.value} 
                    className="form-group group-class"
                    noResultsText={Strings.NO_RESULTS}
                    placeholder={Strings.CHOOSE_ALTERNATIVE_ENTITY}
                    searchingText={Strings.SEARCHING}
                    onChange={this._choose}/>
                <Button className="add-new" bsStyle="success" onClick={this._add_new_constant}>{Strings.ADD}</Button>
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

    _findSchema: function(props) {
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
    },

    render: function() {
        var type = this.props.type;
        var schema = this._findSchema(this.props);
        var schemata = this.props.schemata;
        var abstract = (schema.description.abstract !== undefined) && 
                       (schema.description.abstract !== null)? schema.description.abstract : false;
        var is_constant = schema.description.constant; 
        var fields = [];

        if (abstract) {
            return (<AbstractEntity {...this.props} />);
        } else {
            if (is_constant){
                return (<Constant {...this.props} />);
            } else {
                return (
                    <Panel>
                        <label>{Utils.labelify(this.props.fieldname)}</label>
                        {(Object.keys(schema.fields)).map(function(field){
                            var hidden = schema.fields[field].hidden !== null 
                                      && schema.fields[field].hidden !== undefined
                                       ? schema.fields[field].hidden : false;
                            if (!hidden) {
                                return (
                                    <Field {...this.props}
                                       key={type+"-"+field}
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
                return (<div><BasicField {...this.props} extra={null}/>{this.props.extra}</div>);
            case "Entity":
                return (<div><Entity {...this.props} extra={null}/>{this.props.extra}</div>);
            case "ListField":
                return (<div><ListField {...this.props} extra={null} type={Utils.peel(this.props.field.type)}/>{this.props.extra}</div>);
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
        var panel = $("#scraping-form");
        var heading = $("#scraping-form > .panel-heading");
        var body = $("#scraping-form > .panel-body");
        panel.css('max-height', $(window).height() - 85);
        body.css('max-height', $(window).height() - 85 - $(heading).height());
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        ScrapingStore.addChangeListener(this._onChange);
        var panel = $("#scraping-form");
        var heading = $("#scraping-form > .panel-heading");
        var body = $("#scraping-form > .panel-body");
        panel.css('max-height', $(window).height() - 85);
        body.css('max-height', $(window).height() - 85 - 22 - 1 - $(heading).height());
        return true;
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
                <Button key="scraping-download-document" href={url} target="_blank" >{Strings.DOWNLOAD_PDF}</Button>
            );
        }
        var title = (<h3>{Strings.SCRAPING_FORM_TITLE}</h3>);
        if (this.state.doc) {
            var fieldname = this.props.schemata.descriptions[this.props.schemata.root_collection].human_readable;
            return (
                <Panel id="scraping-form" header={title} bsStyle={"primary"} >
                    {downloadPDF}
                    <Field schemata={this.props.schemata} type={this.props.schemata.root_collection} fieldname={fieldname}/>
                </Panel>
            );
        } else {
            return null;
        }
    }
});

module.exports = ScrapingForm;