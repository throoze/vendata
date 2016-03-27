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
        Users: SessionActionCreators.loadAllUsers()
    };
}


var ListaUsuarios = React.createClass({

    getInitialState: function() {
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

    render: function() {
        return (
            <div>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Strings.NAME</th>
                            <th>Strings.FORM_NUMBER</th>
                            <th>Strings.VALIDATION_NUMBER</th>
                            <th>Strings.LAST_TIME_CONNECTED</th>
                            <th>Strings.ROLE</th>
                            <th>Strings.EMAIL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Users.map(function(usuario){
                            return (
                                <tr>
                                    <td>1</td>
                                    <td>Table cell</td>
                                    <td>Table cell</td>
                                    <td>Table cell</td>
                                    <td>Table cell</td>
                                    <td>Table cell</td>
                                    <td>Table cell</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }

});

module.exports = ListaUsuarios;