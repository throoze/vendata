// // ./components/scraping/Field.js.jsx
// //var React         = require('react');
// //var BasicField    = require('./BasicField');
// //var ListField     = require('./ListField');
// //var Entity        = require('./Entity');
// var Strings       = VendataConstants.Strings;
// var Utils         = VendataConstants.Utils;

// var Field = React.createClass({

//     getInitialState: function(){
//         return { type: null };
//     },

//     componentDidMount: function() {
//         this._chooseType();
//     },

//     _chooseType: function() {
//         var type = this.props.type;
//         switch (type) {
//             case "boolean":
//             case "date":
//             case "string":
//             case "number":
//                 this.setState({ type: "BasicField" });
//                 break;
//             default:
//                 if (Utils.startsWith(type, "[") && Utils.endsWith(type, "]")) {
//                     this.setState({ type: "ListField" });
//                 } else {
//                     this.setState({ type: "Entity" });
//                 }
//         }
//     },

//     render: function() {
//         switch(this.state.type){
//             case "BasicField":
//                 console.log('Field: -> BasicField.  this.props: ',this.props);
//                 return (<BasicField {...this.props}/>);
//             case "Entity":
//                 console.log('Field: -> Entity.  this.props: ',this.props);
//                 return (<Entity {...this.props}/>);
//             case "ListField":
//                 console.log('Field: -> ListField.  this.props: ',this.props);
//                 return (<ListField {...this.props} type={Utils.peel(this.props.field.type)}/>);
//             default:
//                 return null;
//         }
//     }
// });

// module.exports = Field;