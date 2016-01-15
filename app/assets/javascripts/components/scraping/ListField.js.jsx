// // ./components/scraping/ListField.js.jsx
// //var React      = require('react');
// var BS         = require('react-bootstrap');
// //var BasicField = require('./BasicField');
// //var Entity     = require('./Entity');
// var Strings    = VendataConstants.Strings;
// var Utils      = VendataConstants.Utils;
// var Panel      = BS.Panel;
// var Button     = BS.Button;


// var ListField = React.createClass({

//     _chooseType: function() {
//         var choose = null;
//         var type = this.props.type;
//         switch (type) {
//             case "boolean":
//             case "date":
//             case "string":
//             case "number":
//                 choose = "BasicField";
//                 break;
//             default:
//                 if (Utils.startsWith(type, "[") && Utils.endsWith(type, "]")) {
//                     choose = "ListField";
//                 } else {
//                     choose = "Entity";
//                 }
//         }
//         return choose;
//     },

//     render: function() {
//         var type = this._chooseType();
//         var field = null;
//         switch(type){
//             case "BasicField":
//                 field = (<BasicField {...this.props}/>);
//                 break;
//             case "Entity":
//                 field = (<Entity {...this.props}/>);
//                 break;
//             case "ListField":
//                 field = (<ListField {...this.props} type={Utils.peel(this.props.field.type)}/>);
//                 break;
//             default:
//         }
//         console.log('ListField: ');
//         return (
//             <Panel>
//                 <div className="fields-container">
//                     <div>
//                         {field}<Button className="remove" bsStyle="danger">Strings.DELETE</Button>
//                     </div>
//                 </div>
//                 <Button className="add-new" bsStyle="success">Strings.ADD</Button>
//             </Panel>
//         );
//     }
// });

// module.exports = ListField;