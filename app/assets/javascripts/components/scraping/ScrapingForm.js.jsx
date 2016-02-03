// ./components/scraping/ScrapingForm.js.jsx
var ReactRouter            = require('react-router');
var BS                     = require('react-bootstrap');
var ScrapingStore          = require('../../stores/ScrapingStore');
var DateTimeField          = require('react-bootstrap-datetimepicker');
var ScrapingActionCreators = require('../../actions/ScrapingActionCreators');
var Strings                = VendataConstants.Strings;
var Utils                  = VendataConstants.Utils;
var Select                 = require('react-select');
var Panel                  = BS.Panel,
    Input                  = BS.Input,
    Modal                  = BS.Modal,
    Button                 = BS.Button;

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

    validate: function() {/*NOOP*/},

    _setLabel: function() {
        var label = "";
        if (this.props.field.label !== null && this.props.field.label !== undefined) {
            label = this.props.field.label;
        } else {
            label = Utils.labelify(this.props.fieldname.toString());
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
                return { value: opt , label: Utils.labelify(opt.toString()) };
            });
        } else {
            return null;
        }
    },

    _update: function (value) {
        var callback = this.props.onChange;
        if (this._hasOptions()){
            this.setState({ value: value }, callback);
        } else {
            // This was inspired by:
            // http://stackoverflow.com/a/14042239/667599
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

    validate: function() {
        var errors = [];
        if (isNaN(this.state.value))
            errors.push({
                from: [Utils.labelify(this.props.fieldname.toString())],
                error: Strings.ERROR_MUST_BE_DATE
            });
        if (errors.length > 0)
            throw errors;
    },

    _setLabel: function() {
        var label = "";
        if (this.props.field.label !== null && this.props.field.label !== undefined) {
            label = this.props.field.label;
        } else {
            label = Utils.labelify(this.props.fieldname.toString());
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

    validate: function() {
        var errors = [];
        if (isNaN(this.state.value))
            errors.push({
                from: [Utils.labelify(this.props.fieldname.toString())],
                error: Strings.ERROR_MUST_BE_NUMBER
            });
        if (errors.length > 0)
            throw errors;
    },

    _setLabel: function() {
        var label = "";
        if (this.props.field.label !== null && this.props.field.label !== undefined) {
            label = this.props.field.label;
        } else {
            label = Utils.labelify(this.props.fieldname.toString());
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

    validate: function() {
        var errors = [];
        if (this.state.value !== true && this.state.value !== false)
            errors.push({
                from: [Utils.labelify(this.props.fieldname.toString())],
                error: Strings.ERROR_MUST_BE_BOOLEAN
            });
        if (errors.length > 0)
            throw errors;
    },

    _setLabel: function() {
        var label = "";
        if (this.props.field.label !== null && this.props.field.label !== undefined) {
            label = this.props.field.label;
        } else {
            label = Utils.labelify(this.props.fieldname.toString());
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
                    label={this._setLabel()}
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

    validate: function() {
        var self = this;
        var errors = [];
        var fieldname = this.props.fieldname;
        this.state.value.forEach( function(element, index) {
            try {
                if (element)
                    self.refs["field-"+index].validate();
            } catch(e) {
                errors = errors.concat(e);
            }
        });
        if (errors.length > 0) {
            errors.map(function(element){
                var from = element.from; 
                from.unshift(Utils.labelify(fieldname.toString()));
                return from;
            });
        }
        if (errors.length > 0)
            throw errors;
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
                <Field {...this.props} value={this.state.value[index]} onChange={this._update_element(index)} showLabel={false} extra={extra} ref={"field-"+index.toString()} key={fieldname+"-field-"+index.toString()} fieldname={index}/>
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
            showLabel = <label>{Utils.labelify(this.props.fieldname.toString())}</label>;
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
                this.setState({ value: this.state.value });
        }
    },

    getValue: function() {
        var value = this.state.value;
        $.extend(value, {classname: this.props.entity});
        return value;
    },

    validate: function() {
        var errors = [];
        if (!this.state.entity_chosen)
            errors.push({
                from: [Utils.labelify(this.props.fieldname.toString())],
                error: Strings.ERROR_SELECT_ENTITY
            });
        try {
            if (this.refs.field)
                this.refs.field.validate();
        } catch(e) {
            errors = errors.concat(e);
        } finally {
            if (errors.length > 0)
                throw errors;
        }
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
            entity = (<Entity {...this.props} type={this.state.entity} ref="field" onChange={this._update} extra={null} />);
        }
        options = alternatives.map(function(alt){
                    var msg = schemata.descriptions[alt].human_readable;
                    return { value: alt, label: msg };
                });
        var showLabel = null;
        if (this.props.showLabel)
            showLabel = <label>{Utils.labelify(this.props.fieldname.toString())}</label>;
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

    _getList: function(){
        if(!String.prototype.trim) {  
            String.prototype.trim = function () {  
                return this.replace(/^\s+|\s+$/g,'');  
            };  
        } 
        var options = [];
        var constants = ScrapingStore.getConstants(this.props.type);
        if (constants) {
            var label_fields = this.props.schemata.descriptions[this.props.type].to_str;
            options = constants.map(function(elem, i){
                var label_str = "";
                label_fields.forEach( function(el, ind) {
                    label_str += elem[el]+" ";
                });
                return { value: elem._id.$oid , label: label_str.trim() }
            });
        }
        this.setState({ options: options });
    },

    componentDidMount: function() {
        ScrapingStore.addConstantsChangeListener(this._getList);
        ScrapingActionCreators.loadConstantClass(this.props.type);
    },

    componentWillUnmount: function() {
        ScrapingStore.removeConstantsChangeListener(this._getList);
    },

    getValue: function(){
        var value = this.state.value;
        $.extend(value, {classname: this.props.type});
        return value;
    },

    validate: function() {/*NOOP*/},

    _update: function(value){
        this.setState({ value: value }, this.props.onChange);
    },

    _add_new_constant: function(){
        var self = this;
        var submit= function(event){
            var constant = self.refs.constant.getValue();
            console.log("Creating constant...",constant);
        };
        var title = Strings.CREATE_NEW + " " + Utils.labelify(this.props.fieldname.toString());
        var body = (<ConstantCreator {...this.props}/>);
        this.props.showModal(title, body);
    },

    render: function() {
        var showLabel = null;
        if (this.props.showLabel)
            showLabel = <label>{Utils.labelify(this.props.fieldname.toString())}</label>;
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

var ConstantCreator = React.createClass({

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
        var value = {};
        for (var key in this.state.value) {
            if (this.state.value.hasOwnProperty(key) && this.state.value[key])
                value[key] = this.state.value[key];
        }
        value.classname = this.props.type;
        return value;
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
        var callback = this.props.onChange;
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
    },

    _submit: function(event){
        var self = this;
        var errors = [];
        var schema = this._findSchema(this.props);
        var fields = Object.keys(schema.fields);
        var fieldname = this.props.fieldname;
        fields.forEach( function(element, index) {
            try {
                self.refs[element].validate();
            } catch(e) {
                errors = errors.concat(e);
            }
        });
        if (errors.length > 0) {
            errors.map(function(element){
                var from = element.from; 
                from.unshift(Utils.labelify(fieldname.toString()));
                return from;
            });
        }
        if (errors.length > 0) {
            var formatted_errors = Utils.reformat(errors); 
            var message = []; 
            Object.keys(formatted_errors).forEach( function(element, index) {
                if (formatted_errors.hasOwnProperty(element))
                    message.push(
                        <div key={"error-"+index}>
                            <label>{element}</label><br/>
                            {formatted_errors[element].map(function(error, i){
                                return (
                                    <div className="indented" key={"error-div-"+i}>
                                        {error}
                                    </div>
                                    );
                            })}
                        </div>
                        );
            });
            this.props.notificationSystem.addNotification({
                title: Strings.ERROR_FORM,
                message: message,
                position: 'tc',
                level: 'error'
            });
        } else {
            var value = this.getValue();
            ScrapingActionCreators.createConstant(value, function(){
                self.props.notificationSystem.addNotification({
                    title: Strings.CREATED,
                    message: Strings.SUCCESSFULLY_CREATED,
                    position: 'tc',
                    level: 'success'
                });
                self.props.hideModal();
            }, function(msgs){
                self.props.notificationSystem.addNotification({
                    title: Strings.ERROR,
                    message: <div>{Strings.ERROR_FORM+". "+Strings.NOTIFY_DEV_TEAM}<br/>{msgs}</div>,
                    position: 'tc',
                    level: 'error'
                });
                self.props.hideModal();
            });
        }
    },

    render: function() {
        var type = this.props.type;
        var schema = this._findSchema(this.props);
        var schemata = this.props.schemata;
        var fields = [];
        var self = this;

        var showLabel = null;
        var childrenShowLabel = this.props.showLabel;
        var fields = [];
        for (var key in schema.fields) {
            if (schema.fields.hasOwnProperty(key)) {
                var hidden = schema.fields[key].hidden !== null &&
                             schema.fields[key].hidden !== undefined ?
                             schema.fields[key].hidden : false;
                if (!hidden)
                    fields.push(key);
            }
        }
        fields.sort();
        if (this.props.showLabel) {
            showLabel = <label>{Utils.labelify(this.props.fieldname.toString())}</label>;
        } else {
            childrenShowLabel = true;
        }
        return (
            <Panel>
                {showLabel}
                {fields.map(function(field){
                    return (
                        <Field {...self.props}
                           key={type+"-"+field}
                           type={schema.fields[field].type}
                           fieldname={field}
                           field={schema.fields[field]}
                           schemata={schemata}
                           ref={field}
                           extra={null}
                           showLabel={childrenShowLabel}
                           value={self.state.value? self.state.value[field] : undefined}
                           onChange={self._update}/>
                    );
                })}
                <Button bsStyle="success" onClick={this._submit}>{Strings.SUBMIT}</Button>
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
        var value = this.state.value;
        if(!this._is_abstract_or_constant())
            $.extend(value, {classname: this.props.type});
        return value;
    },

    validate: function() {
        var self = this;
        var errors = [];
        var schema = this._findSchema(this.props);
        var fields = Object.keys(schema.fields);
        var fieldname = this.props.fieldname;
        if (this._is_abstract_or_constant()) {
            try {
                this.refs.entity.validate();
            } catch(e) {
                errors = errors.concat(e);
            }
        } else {
            fields.forEach( function(element, index) {
                try {
                    self.refs[element].validate();
                } catch(e) {
                    errors = errors.concat(e);
                }
            });
            if (errors.length > 0) {
                errors.map(function(element){
                    var from = element.from;
                    from.unshift(Utils.labelify(fieldname.toString()));
                    return from;
                });
            }
        }
        if (errors.length > 0)
            throw errors;
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

    _is_abstract_or_constant: function(){
        var schema = this._findSchema(this.props);

        var is_abstract = (schema.description.abstract !== undefined) && 
                          (schema.description.abstract !== null) ?
                           schema.description.abstract : false;
        var is_constant = schema.description.constant;
        return is_abstract || is_constant;
    },

    _update: function(){
        var schema = this._findSchema(this.props);
        var fields = Object.keys(schema.fields);
        var callback = this.props.onChange;
        if (this._is_abstract_or_constant()) {
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
                var childrenShowLabel = this.props.showLabel;
                var fields = [];
                for (var key in schema.fields) {
                    if (schema.fields.hasOwnProperty(key)) {
                        var hidden = schema.fields[key].hidden !== null &&
                                     schema.fields[key].hidden !== undefined ?
                                     schema.fields[key].hidden : false;
                        if (!hidden)
                            fields.push(key);
                    }
                }
                fields.sort();
                if (this.props.showLabel) {
                    showLabel = <label>{Utils.labelify(this.props.fieldname.toString())}</label>;
                } else {
                    childrenShowLabel = true;
                }
                return (
                    <Panel>
                        {showLabel}
                        {fields.map(function(field){
                            return (
                                <Field {...self.props}
                                   value={self.state.value? self.state.value[field] : undefined} 
                                   key={type+"-"+field}
                                   type={schema.fields[field].type}
                                   fieldname={field}
                                   field={schema.fields[field]}
                                   schemata={schemata}
                                   ref={field}
                                   extra={null}
                                   showLabel={childrenShowLabel}
                                   onChange={self._update}/>
                            );
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

    validate: function() {
        var errors = [];
        if (!this.props.field.nullable)
            if (this.state.value === null)
                errors.push({
                    from: [Utils.labelify(this.props.fieldname.toString())],
                    error: Strings.ERROR_NULL_FIELD
                });
        if (!this.props.field.blank)
            if (this.state.value === "")
                errors.push({
                    from: [Utils.labelify(this.props.fieldname.toString())],
                    error: Strings.ERROR_EMPTY_FIELD
                });
        try {
            this.refs.field.validate();
        } catch(e) {
            errors = errors.concat(e);
        }
        if (errors.length > 0)
            throw errors;
        
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
            showModal: false,
            modal: {
                title: null,
                body: null
            },
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

    _update: function(event){
        this.setState({ scraping: this.refs.root.getValue() });
    },

    _hide_modal: function(){
        this.setState({
            showModal: false,
            modal: {
                title: null,
                body: null
            }
        });
    },

    _show_modal: function(title, body){
        this.setState({
            showModal: true,
            modal: {
                title: title,
                body: body
            }
        });
    },

    _submit: function() {
        try {
            this.refs.root.validate();
            var value = this.refs.root.getValue();
            this.props.notificationSystem.addNotification({
                message: 'Form Successfully Validated!',
                position: 'tc',
                level: 'success'
            });
        } catch(errors) {
            var formatted_errors = Utils.reformat(errors); 
            var message = []; 
            Object.keys(formatted_errors).forEach( function(element, index) {
                if (formatted_errors.hasOwnProperty(element))
                    message.push(
                        <div key={"error-"+index}>
                            <label>{element}</label><br/>
                            {formatted_errors[element].map(function(error, i){
                                return (
                                    <div className="indented" key={"error-div-"+i}>
                                        {error}
                                    </div>
                                    );
                            })}
                        </div>
                        );
            });
            this.props.notificationSystem.addNotification({
                title: Strings.ERROR_FORM,
                message: message,
                autoDismiss: 0,
                position: 'tc',
                level: 'error'
            });
        }
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
                <Panel className="modal-container" id="scraping-form" header={title} bsStyle={"primary"} >
                    {downloadPDF}
                    <Field {...this.props} showModal={this._show_modal} hideModal={this._hide_modal} ref="root" onChange={this._update} schemata={this.props.schemata} type={this.props.schemata.root_collection} fieldname={fieldname} field={{}}/>
                    <Modal
                        show={this.state.showModal}
                        onHide={this._hide_modal}
                        container={this}
                        aria-labelledby="contained-modal-title" >
                      <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">{this.state.modal.title}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {this.state.modal.body}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={this._hide_modal}>{Strings.CLOSE}</Button>
                      </Modal.Footer>
                    </Modal>
                    <Button bsStyle="success" onClick={this._submit}>{Strings.SUBMIT}</Button>
                </Panel>
            );
        } else {
            return null;
        }
    }
});

module.exports = ScrapingForm;