// ./components/scrapping/Entity.js.jsx
var React          = require('react');
var BS             = require('react-bootstrap');
var Field          = require('./Field');
var Strings        = VendataConstants.Strings;
var Input          = BS.Input;
var Panel          = BS.Panel;
var ScrappingStore = require('../../stores/ScrappingStore');


var Entity = React.createClass({

    getDefaultProps: function() {
        return {
            wrapper: Panel,
            entity: null
        };
    },

    getInitialState: function() {
        return this._findSchemata();
    },

    componentDidMount: function() {
        ScrappingStore.addSchemataChangeListener(this._setStateFromStore);
    },

    componentWillUnmount: function() {
        ScrappingStore.removeSchemataChangeListener(this._setStateFromStore);
    },

    _setStateFromStore: function() {
        this.setState(this._findSchemata());
    },

    _findSchemata: function() {
        return { schemata: ScrappingStore.getSchemata() };
    },

    _findEntity: function() {
        if (this.props.entity !== null){
            var schemata = this.state.schemata;
            var entity = {
                schemata: {
                    description: schemata.descriptions[this.props.entity],
                    parenthood: schemata.parenthood[this.props.entity],
                    inheritance: schemata.inheritance[this.props.entity],
                    constraints: schemata.constraints[this.props.entity],
                    fields: {}
                }
            };
            parents = entity.schemata.inheritance.reverse();
            for (var parent in parents) {
                $.extend(entity.schemata.fields, schemata.descriptions[parent].fields);
            }
            $.extend(entity.schemata.fields, entity.schemata.description.fields);
            return entity;
        } else {
            return {
                schemata: {
                    description: null,
                    parenthood: null,
                    inheritance: null,
                    constraints: null,
                    fields: null
                }
            };
        }
    },
    
    render: function() {
        var wrapper = this.props.wrapper;
        var entity = this._findEntity();
        return (
            <wrapper>
                {function() { for (var key in entity.fields){
                    if (entity.fields.hasOwnProperty(key)){
                        <Field fieldname={key} field={entity.fields[key]} />
                    }
                }}()}
            </wrapper>
        );
    }
});

module.exports = Entity;