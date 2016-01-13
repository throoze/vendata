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
            entity: "select"
        };
        return state;
    },

    getDefaultProps: function() {
        return {
            wrapper: Panel
        };
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

    _findEntity: function() {
        if (this.props.type !== null && this.props.type !== undefined){
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
        var type = this.props.type;
        var entity_name = this.state.entity;
        var entity = this._findEntity();
        var schemata = this.props.schemata;
        var abstract = entity.description.abstract !== undefined && 
                       entity.description.abstract !== null? entity.description.abstract : false;
        var alternatives = this.props.schemata.parenthood[this.props.type];
        var fields = [];
        if (abstract) {
            fields.push(
                <div key={type+"-input-select"} className="form-group">
                    <select type="select" selected={this.state.entity} onChange={this._chooseAlternative} ref="choose_alternative" className="form-control">
                        <option key={type+"-option-default"} value="select">{Strings.CHOOSE_ALTERNATIVE_ENTITY}</option>
                        {alternatives.map(function(alternative){
                            return (
                                <option key={type+"-option-"+alternative} value={alternative}>{schemata.descriptions[alternative].human_readable}</option>
                                );
                        })}
                    </select>
                </div>
                );
            if (this.state.entity_chosen) {
                fields.push(<Entity key={this.props.type+"-"+this.state.entity} type={this.state.entity} schemata={schemata} ref="entity"/>);
            }
        } else {
            Object.keys(entity.fields).map(function(field){
                if (entity.fields[field].hidden === null || entity.fields[field].hidden === undefined || !entity.fields[field].hidden)
                    return fields.push(<Field key={type+"-"+entity_name+"-"+field} type={entity.fields[field].type} fieldname={field} field={entity.fields[field]} schemata={schemata}/>);
            });
        }
        return (
            <Panel>
                {fields.map(function(field){ return field;})}
            </Panel>
        );
    }
});

module.exports = Entity;