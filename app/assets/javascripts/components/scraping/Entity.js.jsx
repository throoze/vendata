// // ./components/scraping/Entity.js.jsx
// //var React          = require('react');
// var BS             = require('react-bootstrap');
// //var Field          = require('./Field');
// var Strings        = VendataConstants.Strings;
// var Panel          = BS.Panel;

// function findSchema(props) {
//     if (props.type !== null && props.type !== undefined){
//         var schemata = props.schemata;
//         var entity = {
//                 description: schemata.descriptions[props.type],
//                 parenthood: schemata.parenthood[props.type],
//                 inheritance: schemata.inheritance[props.type],
//                 constraints: schemata.constraints[props.type],
//                 fields: {}
//             };
//         parents = entity.inheritance.reverse();
//         for (var parent in parents) {
//             $.extend(entity.fields, schemata.descriptions[parents[parent]].fields);
//         }
//         $.extend(entity.fields, entity.description.fields);
//         return entity;
//     } else {
//         return {
//                 description: null,
//                 parenthood: null,
//                 inheritance: null,
//                 constraints: null,
//                 fields: null
//             };
//     }
// } 

// var AbstractEntity = React.createClass({

//     getInitialState: function(){
//         var state = {
//             entity_chosen: false,
//             entity: "select"
//         };
//         return state;
//     },

//     _chooseAlternative: function(e) {
//         if (e.target.value == "select") {
//             this.setState({
//                 entity: "select",
//                 entity_chosen: false
//             });
//         } else {
//             this.setState({
//                 entity:e.target.value,
//                 entity_chosen: true
//             });
//         }
//     },

//     render: function() {
//         var type = this.props.type;
//         var alternatives = ["select"].concat(this.props.schemata.parenthood[this.props.type]);
//         var schemata = this.props.schemata;
//         var entity = null;
//         if (this.state.entity_chosen){
//             entity = (<Entity {...this.props} type={this.state.entity} />);
//         }
//         return (
//             <Panel>
//                 <div className="form-group">
//                     <select className="form-control" onChange={this._chooseAlternative} ref={type+"-options"}>
//                         {alternatives.map(function(alt){
//                             var msg = alt != "select" ? schemata.descriptions[alt].human_readable
//                             :Strings.CHOOSE_ALTERNATIVE_ENTITY;
//                             return (<option key={alt+"-option"} value={alt}>{msg}</option>);
//                         })}
//                     </select>
//                 </div>
//                 {entity}
//             </Panel>
//             );
//     }

// });

// var Entity = React.createClass({

//     getDefaultProps: function() {
//         return {
//             wrapper: Panel
//         };
//     },

//     render: function() {
//         var type = this.props.type;
//         var schema = findSchema(this.props);
//         var schemata = this.props.schemata;
//         var abstract = (schema.description.abstract !== undefined) && 
//                        (schema.description.abstract !== null)? schema.description.abstract : false;
//         var fields = [];

//         if (abstract) {
//             return (<AbstractEntity {...this.props} />);
//         } else {
//             return (
//                 <Panel>
//                     {(Object.keys(schema.fields)).map(function(field){
//                         var hidden = schema.fields[field].hidden !== null 
//                                   && schema.fields[field].hidden !== undefined
//                                    ? schema.fields[field].hidden : false;
//                         if (!hidden) {
//                             return (
//                                 <Field key={type+"-"+field}
//                                    type={schema.fields[field].type}
//                                    fieldname={field}
//                                    field={schema.fields[field]}
//                                    schemata={schemata}/>
//                             );
//                         }
//                     })}
//                 </Panel>
//                 );
//         }
//     }
// });

// module.exports = Entity;