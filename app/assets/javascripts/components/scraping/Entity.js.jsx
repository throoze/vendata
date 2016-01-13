// ./components/scraping/Entity.js.jsx
var React          = require('react');
var BS             = require('react-bootstrap');
var Field          = require('./BasicField');
var Strings        = VendataConstants.Strings;
var Input          = BS.Input;
var Panel          = BS.Panel;


var Entity = React.createClass({

    getInitialState: function(){
        var state = {
            entity_chosen: false,
            entity: null
        };
        return state;
    },

    getDefaultProps: function() {
        return {
            wrapper: Panel
        };
    },

    _chooseAlternative: function(e) {
        if (this.refs.choose_alternative.getValue() == "select") {
            this.setState({
                entity: null,
                entity_chosen: false
            });
        } else {
            this.setState({
                entity: this.refs.choose_alternative.getValue(),
                entity_chosen: true
            });
        }
    },

    _findEntity: function() {
        if (this.props.type !== null){
            var schemata = this.props.schemata;
            var entity = {
                    description: schemata.descriptions[this.props.type],
                    parenthood: schemata.parenthood[this.props.type],
                    inheritance: schemata.inheritance[this.props.type],
                    constraints: schemata.constraints[this.props.type],
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
        var wrapper = this.props.wrapper;
        var entity = this._findEntity();
        var schemata = this.props.schemata;
        var abstract = entity.description.abstract !== undefined && 
                       entity.description.abstract !== null? entity.description.abstract : false;
        var alternatives = this.props.schemata.parenthood[this.props.type];
        var fields = [];
        if (abstract) {
            fields.push(
                <Input key={this.state.entity+"-input-select"} type="select" placeholder={Strings.CHOOSE_ALTERNATIVE_ENTITY} onChange={this._chooseAlternative} ref="choose_alternative">
                    <option key={this.state.entity+"-option-select"} value="select">{Strings.CHOOSE_ALTERNATIVE_ENTITY}</option>
                    {alternatives.map(function(alternative){
                        return (
                            <option key={alternative} value={alternative}>{schemata.descriptions[alternative].human_readable}</option>
                            );
                    })}
                </Input>
                );
            if (this.state.entity_chosen) {
                fields.push(<Entity key={this.state.entity} type={this.state.entity} schemata={schemata} ref="entity"/>);
            }
        } else {
            for (var key in entity.fields){
                if (entity.fields.hasOwnProperty(key)){
                    if (entity.fields[key].hidden === null || entity.fields[key].hidden === undefined)
                        fields.push(<Field key={this.props.type+"-"+key} type={entity.fields[key].type} fieldname={key} field={entity.fields[key]} schemata={this.props.schemata}/>);
                }
            }
        }
        return (
            <Panel>
                {fields}
            </Panel>
        );
    }
});

module.exports = Entity;