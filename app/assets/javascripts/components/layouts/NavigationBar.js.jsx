// ./components/layouts/NavigationBar.js.jsx
var React          = require('react');
var ReactRouter    = require('react-router');
var BS             = require('react-bootstrap');
var Link           = ReactRouter.Link;
//
var SessionStore   = require('../../stores/SessionStore.js.jsx'),
    Login          = require('../session/Login.js.jsx'),
    SessionActionCreators = require('../../actions/SessionActionCreators.js.jsx');
// react-bootstrap components:
var Dropdown       = BS.Dropdown;
var Navbar         = BS.Navbar,
    NavBrand       = BS.NavBrand,
    Nav            = BS.Nav,
    NavDropdown    = BS.NavDropdown,
    MenuItem       = BS.MenuItem,
    NavItem        = BS.NavItem,
    CollapsibleNav = BS.CollapsibleNav,
    DropdownButton = BS.DropdownButton,
    DropdownToggle = Dropdown.Toggle,
    Panel          = BS.Panel,
    DropdownMenu   = Dropdown.Menu,
    Button         = BS.Button;


NavigationBar = React.createClass({

    getInitialState: function() {
        return { open: false };
    },

    componentDidMount: function() {
        SessionStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        SessionStore.removeChangeListener(this._onChange);
    },

    _preventDefault: function (e) {
        e.preventDefault();
    },

    _setOpen: function (e){
        this.setState({open: !this.state.open });
    },
    
    _handleLogout:function(){
        SessionActionCreators.Logout();
    },

    render: function() {
        var rightItem = this.props.isLoggedIn ? (
            <NavDropdown eventKey={3} title={this.props.email} id="collapsible-nav-dropdown">
                <MenuItem eventKey={1}>Perfil</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={2} href="/logout">
                    <Button  onClick={this._handleLogout} bsStyle="primary" bsSize="small">Logout</Button>
                </MenuItem>
            </NavDropdown>
            ) : (
            <Dropdown className="login-button" open={this.state.open} >
              <DropdownToggle bsRole="toggle" onClick={this._setOpen}>
                Login
              </DropdownToggle>

              <DropdownMenu  className="login-form" bsRole="menu">
                    <Login></Login>
              </DropdownMenu>
            </Dropdown>
            );
        return (
            <Navbar fixedTop toggleNavKey={0}>
                <NavBrand><Link to="/">Vendata</Link></NavBrand>
                <CollapsibleNav eventKey={0}>
                    <Nav navbar right >
                        {rightItem}
                    </Nav>
                </CollapsibleNav>
            </Navbar>
        );
    }

});

module.exports = NavigationBar;