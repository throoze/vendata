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
var Navbar         = BS.Navbar,
    NavBrand       = BS.NavBrand,
    Nav            = BS.Nav,
    NavDropdown    = BS.NavDropdown,
    MenuItem       = BS.MenuItem,
    NavItem        = BS.NavItem,
    CollapsibleNav = BS.CollapsibleNav,
    DropdownButton = BS.DropdownButton;


NavigationBar = React.createClass({

    render: function() {
        var rightItem = this.props.isLoggedIn ? (
            <NavDropdown eventKey={3} title={this.props.email} id="collapsible-nav-dropdown">
                <MenuItem eventKey={1}>Perfil</MenuItem>
                <MenuItem eventKey={2} href="/logout">
                    <button type="submit" >Logout</button>
                </MenuItem>
            </NavDropdown>
            ) : (
            // <NavDropdown title="Login">
            //     <MenuItem eventKey="1" >
                    <Login></Login>
            //     </MenuItem>    
            // </NavDropdown>   
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