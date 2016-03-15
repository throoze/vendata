var React                 = require('react');

var Strings = require('../../constants/VendataConstants.js').Strings;

var BS                    = require('react-bootstrap');
var SessionActionCreators = require('../../actions/SessionActionCreators.js.jsx'),
    SessionStore          = require('../../stores/SessionStore.js.jsx'),
    ErrorNotice           = require('../common/ErrorNotice.js.jsx');
var Input                 = BS.Input;
var ButtonInput           = BS.ButtonInput,
    Panel                 = BS.Panel,
    Alert                 = BS.Alert,
    Table                 = BS.Table,
    Collapse              = BS.Collapse;


function getStateFromStores() {
    return {
       Data: SessionStore.getUserStatistics()
    };
}

// var blah = <Table responsive>
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Strings.NAME</th>
//                             <th>Strings.FORM_NUMBER</th>
//                             <th>Strings.VALIDATION_NUMBER</th>
//                             <th>Strings.LAST_TIME_CONNECTED</th>
//                             <th>Strings.ROLE</th>
//                             <th>Strings.EMAIL</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {this.state.Users.map(function(usuario){
//                             return (
//                                 <tr>
//                                     <td>1</td>
//                                     <td>Table cell</td>
//                                     <td>Table cell</td>
//                                     <td>Table cell</td>
//                                     <td>Table cell</td>
//                                     <td>Table cell</td>
//                                     <td>Table cell</td>
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                 </Table>


var Estadisticas = React.createClass({

    getInitialState: function() {
        SessionActionCreators.loadUserStatistics();
        return getStateFromStores();
    },

    componentDidMount: function() {
        SessionStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        SessionStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(getStateFromStores());
    },

    _myStatistics: function(e){

        var email = this.props.uEmail;
        var res = this.state.Data.filter( function(user) {
            if ( user.email == email )
                return true;
            else
                return false;
            });
        return res;
    },

    render: function() {
        var Pe =  this.props.uEmail == "null" ? (
           this.state.Data.map(function(usuario){
                                var fecha = usuario.last_connection == null ? "No se ha conectado" : usuario.last_connection.slice(0,10);
                                return (
                                    <tr>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.name}</td>
                                        <td>{usuario.num_scrapings}</td>
                                        <td>{usuario.num_validations}</td>
                                        <td>{fecha}</td>
                                        <td>{usuario.sign_in_count}</td>
                                        <td>{usuario.role}</td>
                                    </tr>
                                );
            }) 
           ) :  (
            this._myStatistics().map(function(usuario){
                                var fecha = usuario.last_connection == null ? "No se ha conectado" : usuario.last_connection.slice(0,10);
                                    return (
                                        <tr>
                                            <td>{usuario.id}</td>
                                            <td>{usuario.email}</td>
                                            <td>{usuario.name}</td>
                                            <td>{usuario.num_scrapings}</td>
                                            <td>{usuario.num_validations}</td>
                                            <td>{fecha}</td>
                                            <td>{usuario.sign_in_count}</td>
                                            <td>{usuario.role}</td>
                                        </tr>
                                 );
                             })
            
           );

        return (
            <div>
                <Table responsive>
                     <thead>
                     <tr>
                        <th>#</th>
                        <th>{Strings.EMAIL}</th>
                        <th>{Strings.NAME}</th>
                        <th>{Strings.SCRAPING_NUMBER}</th>
                        <th>{Strings.VALIDATION_NUMBER}</th>
                        <th>{Strings.LAST_TIME_CONNECTED}</th>
                        <th>{Strings.CONNECTION_NUMBER}</th>
                        <th>{Strings.ROLE}</th>
                    </tr>
                    </thead>
                    <tbody>
                        { Pe }                          
                    </tbody>
                </Table>
            </div>
        );
    }

});

module.exports = Estadisticas;