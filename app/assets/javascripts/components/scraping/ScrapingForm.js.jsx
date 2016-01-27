// ./components/scraping/ScrapingForm.js.jsx
var ReactRouter      = require('react-router');
var BS               = require('react-bootstrap');
var ScrapingStore    = require('../../stores/ScrapingStore');
var DateTimeField    = require('react-bootstrap-datetimepicker');
var Strings          = VendataConstants.Strings;
var Utils            = VendataConstants.Utils;
var Select           = require('react-select');
var Panel            = BS.Panel,
    Input            = BS.Input,
    Button           = BS.Button;

var TextField = React.createClass({
    getInitialState: function(){
        return { 
            value: null,
            tmpValue: null
            };
    },

    componentWillMount: function(){
        if (this.props.value !== null && this.props.value !== undefined){
            this.setState({ value: this.props.value });
        }
    },

    getValue: function() {
        return this.state.value;
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

    _hasOptions: function() {
        return this.props.field.options !== undefined &&
               this.props.field.options !== null &&
               this.props.field.options;
    },

    _getOptions: function() {
        if (this._hasOptions()){
            return this.props.field.options.map(function(opt){
                return { value: opt , label: Utils.labelify(opt) };
            });
        } else {
            return null;
        }
    },

    _actually_update_it: function(){

    },

    _update: function (value) {
        var callback = this.props.onChange;
        if (this._hasOptions()){
            this.setState({ value: value }, callback);
        } else {
            // This was inspired by:
            // http://stackoverflow.com/questions/14042193/how-to-trigger-an-event-in-input-text-after-i-stop-typing-writing 
            var self = this;
            var timeout = 500;//1e3;
            if (timeoutReference !== null) clearTimeout(timeoutReference);
            timeoutReference = setTimeout(function(){
                    // if we made it here, our timeout has elapsed. Fire the
                    // callback
                    if (timeoutReference === null || !timeoutReference)
                        return;
                    timeoutReference = null;
                    self.setState({ value: self.refs.input.getValue() }, callback);
                }, timeout);
            this.setState({ tmpValue: this.refs.input.getValue() });
        }
    },

    render: function(){
        var output = null;
        var options = this._getOptions(); 
        if (options !== null) {
            output = (
                <Select
                    className="form-group group-class"
                    name={this._setLabel()}
                    allowCreate
                    options={options}
                    value={this.state.value}
                    noResultsText={Strings.NO_RESULTS}
                    placeholder={this._setLabel()} /*Strings.PLACEHOLDER_CHOOSE*/
                    searchingText={Strings.SEARCHING}
                    onChange={this._update}/>
                    );
        } else {
            output = (
                <Input  type="text"
                        ref="input"
                        groupClassName="group-class"
                        labelClassName="label-class"
                        hasFeedback
                        placeholder={this._setLabel()}
                        onChange={this._update}
                        value={this.state.tmpValue} />
                );
        }
        return output;
    }
});

var DateField = React.createClass({
    getInitialState: function(){
        return { value: null };
    },

    getDefaultProps: function() {
        return {
            mode: "date",
            inputFormat: "DD/MM/YYYY",
        };
    },

    componentWillMount: function(){
        if (this.props.value !== null && this.props.value !== undefined){
            this.setState({ value: this.props.value });
        }
    },

    getValue: function() {
        return this.state.value;
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

    _update: function (newDate) {
        var callback = this.props.onChange;
        var value = newDate !== ""? newDate : null;
        this.setState({ value: newDate }, callback);
    },

    render: function(){
        var output = null;
        var style = { position: "relative" };
        output = (
            <div style={style} className="form-group group-class">
            <DateTimeField  
                    mode={this.props.mode}
                    viewMode={this.props.mode}
                    inputFormat={this.props.inputFormat}
                    defaultText={this._setLabel()}
                    onChange={this._update}
                    dateTime={this.state.value || undefined} />
            </div>
            );
        return output;
    }
});

var NumberField = React.createClass({
    getInitialState: function(){
        return { value: null };
    },

    componentWillMount: function(){
        if (this.props.value !== null && this.props.value !== undefined){
            this.setState({ value: this.props.value });
        }
    },

    getValue: function() {
        return this.state.value;
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

    _update: function (value) {
        var callback = this.props.onChange;
        this.setState({ value: this.refs.input.getValue() }, callback);
    },

    render: function(){
        var output = null;
        output = (
            <Input  type="text"
                    ref="input"
                    groupClassName="group-class"
                    labelClassName="label-class"
                    hasFeedback
                    placeholder={this._setLabel()}
                    onChange={this._update}
                    value={this.state.value} />
            );
        return output;
    }
});

var BooleanField = React.createClass({
    getInitialState: function(){
        return { value: null };
    },

    componentWillMount: function(){
        if (this.props.value !== null && this.props.value !== undefined){
            this.setState({ value: this.props.value });
        }
    },

    getValue: function() {
        return this.state.value;
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

    _update: function (value) {
        var callback = this.props.onChange;
        this.setState({ value: this.refs.input.getChecked() }, callback);
    },

    render: function(){
        var output = null;
        output = (
            <Input  type="checkbox"
                    ref="input"
                    groupClassName="group-class"
                    labelClassName="label-class"
                    hasFeedback
                    placeholder={this._setLabel()}
                    onChange={this._update}
                    value={this.state.value} />
            );
        return output;
    }
});

var ListField = React.createClass({

    getInitialState: function() {
        return {
            value: [null]
        };
    },

    getDefaultProps: function() {
        return {
            showLabel: true
        };
    },

    componentWillMount: function(){
        if (this.props.value !== null && this.props.value !== undefined){
            if( Object.prototype.toString.call( this.props.value ) === '[object Array]' ) {
                this.setState({ value: this.props.value });
            }
        }
    },

    getValue: function(){
        return this.state.value;
    },

    _delete_element: function(index){
        var callback = this.props.onChange;
        if (this.state.value.length > 1) {
            var self = this;
            return function(){
                var oldValue = self.state.value;
                oldValue.splice(index, 1);
                self.setState({ value: oldValue }, callback);
            };
        } else {
            return function(){};
        }
    },

    _update_element: function(index){
        var callback = this.props.onChange;
        var self = this;
        return function() {
            var oldValue = self.state.value;
            oldValue[index] = self.refs["field-"+index.toString()].getValue();
            this.setState({ value: oldValue }, callback);
        };
    },

    _field_template: function(index) {
        var extra = null;
        if (this.state.value.length > 1)
            extra = <Button className="remove" bsStyle="danger" key={fieldname+"-button-delete-"+index.toString()} onClick={this._delete_element(index)}>{Strings.DELETE}</Button>;
        var fieldname = this.props.fieldname
        return (
            <div className="fields-container" key={fieldname+"-container-"+index.toString()}>
                <label key={fieldname+"-label-"+index.toString()}>{index+1}</label>
                <Field {...this.props} value={this.state.value[index]} onChange={this._update_element(index)} showLabel={false} extra={extra} ref={"field-"+index.toString()} key={fieldname+"-field-"+index.toString()} fieldname={null}/>
            </div>
            );
    },

    _add_new: function(){
        var callback = this.props.onChange;
        var newValue = this.state.value;
        newValue.push(null);
        this.setState({ value: newValue }, callback);
    },

    render: function() {
        var childType = Utils.peel(this.props.field.type);
        var field_template = this._field_template;
        var counter = -1;
        var showLabel = null;
        if (this.props.showLabel)
            showLabel = <label>{Utils.labelify(this.props.fieldname)}</label>;
        return (
            <Panel>
                {showLabel}
                {this.state.value.map(function(item){
                    counter++;
                    return field_template(counter);
                })}
                <Button className="add-new" bsStyle="success" onClick={this._add_new}>{Strings.ADD}</Button>
            </Panel>
        );
    }
});

var AbstractEntity = React.createClass({

    getInitialState: function(){
        var state = {
            entity_chosen: false,
            entity: null,
            value: null
        };
        return state;
    },

    getDefaultProps: function() {
        return {
            showLabel: true
        };
    },

    componentWillMount: function(){
        if (this.props.value !== null && this.props.value !== undefined){
            if (typeof this.props.value === 'object')
                this.setState({ value: this.props.value });
        }
    },

    getValue: function(){
        return this.state.value;
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

    _update: function(event) {
        var callback = this.props.onChange;
        if (this.refs.field !== null && this.refs.field !== undefined)
            this.setState({ value: this.refs.field.getValue() }, callback);
    },

    render: function() {
        var type = this.props.type;
        var alternatives = this.props.schemata.parenthood[this.props.type];
        var schemata = this.props.schemata;
        var entity = null;
        if (this.state.entity_chosen){
            entity = (<Entity {...this.props} type={this.state.entity} fieldname={null} ref="field" onChange={this._update} extra={null} />);
        }
        options = alternatives.map(function(alt){
                    var msg = schemata.descriptions[alt].human_readable;
                    return { value: alt, label: msg };
                });
        var showLabel = null;
        if (this.props.showLabel)
            showLabel = <label>{Utils.labelify(this.props.fieldname)}</label>;
        return (
            <Panel>
                {showLabel}
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
                {this.props.extra}
            </Panel>
            );
    }

});

var Constant = React.createClass({
    getInitialState: function(){
        return { options: [], value: null };
    },

    getDefaultProps: function() {
        return {
            showLabel: true
        };
    },

    componentWillMount: function(){
        if (this.props.value !== null && this.props.value !== undefined){
            if (typeof this.props.value === 'object')
                this.setState({ value: this.props.value });
        }
    },

    getValue: function(){
        return this.state.value;
    },

    _update: function(value){
        this.setState({ value: value }, this.props.onChange);
    },

    _add_new_constant: function(){
        // TODO: manage constants state
    },

    render: function() {
        var showLabel = null;
        if (this.props.showLabel)
            showLabel = <label>{Utils.labelify(this.props.fieldname)}</label>;
        return (
            <Panel>
                {showLabel}
                <Select
                    name="constants"
                    options={this.state.options}
                    value={this.state.value} 
                    className="form-group group-class"
                    noResultsText={Strings.NO_RESULTS}
                    placeholder={Strings.CHOOSE_ALTERNATIVE_ENTITY}
                    searchingText={Strings.SEARCHING}
                    onChange={this._update}
                    extra={null} />
                <Button className="add-new" bsStyle="success" onClick={this._add_new_constant}>{Strings.ADD}</Button>
                {this.props.extra}
            </Panel>
            );
    }
});

var Entity = React.createClass({

    getDefaultProps: function() {
        return {
            wrapper: Panel,
            showLabel: true
        };
    },

    getInitialState: function() {
        return {
            value: null
        };
    },

    getValue: function(){
        return this.state.value;
    },

    componentWillMount: function(){
        if (this.props.value !== null && this.props.value !== undefined){
            if (typeof this.props.value === 'object')
                this.setState({ value: this.props.value });
        }
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

    _update: function(){
        var schema = this._findSchema(this.props);
        var fields = Object.keys(schema.fields);
        var is_abstract = (schema.description.abstract !== undefined) && 
                          (schema.description.abstract !== null)? schema.description.abstract : false;
        var is_constant = schema.description.constant;
        var callback = this.props.onChange;
        if (is_abstract || is_constant) {
            this.setState({ value: this.refs.entity.getValue() }, callback);
        } else {
            var value = {};
            var self = this;
            fields.map(function(field){
                var hidden = schema.fields[field].hidden !== null && 
                             schema.fields[field].hidden !== undefined ?
                             schema.fields[field].hidden : false;
                if (!hidden)
                    value[field] = self.refs[field].getValue();
            });
            this.setState({ value: value }, callback);
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
        var self = this;

        if (abstract) {
            return (<AbstractEntity {...this.props} onChange={this._update} ref={"entity"}/>);
        } else {
            if (is_constant){
                return (<Constant {...this.props} onChange={this._update} ref={"entity"}/>);
            } else {
                var showLabel = null;
                var fields = Object.keys(schema.fields);
                if (this.props.showLabel)
                    showLabel = <label>{Utils.labelify(this.props.fieldname)}</label>;
                return (
                    <Panel>
                        {showLabel}
                        {fields.map(function(field){
                            var hidden = schema.fields[field].hidden !== null 
                                      && schema.fields[field].hidden !== undefined
                                       ? schema.fields[field].hidden : false;
                            if (!hidden) {
                                return (
                                    <Field {...self.props}
                                       key={type+"-"+field}
                                       type={schema.fields[field].type}
                                       fieldname={field}
                                       field={schema.fields[field]}
                                       schemata={schemata}
                                       ref={field}
                                       extra={null}
                                       onChange={self._update}/>
                                );
                            }
                        })}
                        {this.props.extra}
                    </Panel>
                    );
            }
        }
    }
});

var Field = React.createClass({

    getInitialState: function(){
        return {
            value: null
        };
    },

    componentWillMount: function(){
        if (this.props.value !== null && this.props.value !== undefined){
            this.setState({ value: this.props.value });
        }
    },

    getValue: function() {
        return this.state.value;
    },

    _update: function() {
        var callback = this.props.onChange;
        this.setState({ value: this.refs.field.getValue() }, callback);
    },

    render: function() {
        var ref = "field";
        switch(this.props.type){
            case "boolean":
                return (<div><BooleanField {...this.props} extra={null} ref={ref} onChange={this._update}/>{this.props.extra}</div>);
            case "date":
                return (<div><DateField {...this.props} extra={null} ref={ref} onChange={this._update}/>{this.props.extra}</div>);
            case "string":
                return (<div><TextField {...this.props} extra={null} ref={ref} onChange={this._update}/>{this.props.extra}</div>);
            case "number":
                return (<div><NumberField {...this.props} extra={null} ref={ref} onChange={this._update}/>{this.props.extra}</div>);
            default:
                if (Utils.startsWith(this.props.type, "[") && Utils.endsWith(this.props.type, "]")) {
                    return (<div><ListField {...this.props} extra={null} ref={ref} onChange={this._update} type={Utils.peel(this.props.field.type)}/>{this.props.extra}</div>);
                } else {
                    return (<Entity {...this.props} ref={ref} onChange={this._update}/>);
                }
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