// ./components/NavigationBar.js.jsx
var BS             = require('react-bootstrap');
var Link           = ReactRouter.Link;
// react-bootstrap components:
var Navbar         = BS.Navbar,
    NavBrand       = BS.NavBrand,
    Nav            = BS.Nav,
    NavDropdown    = BS.NavDropdown,
    MenuItem       = BS.MenuItem,
    NavItem        = BS.NavItem,
    CollapsibleNav = BS.CollapsibleNav;

NavigationBar = React.createClass({

    render: function() {
        var rightItem = this.props.isLoggedIn ? (
            <NavDropdown eventKey={3} title={this.props.email} id="collapsible-nav-dropdown">
                <MenuItem eventKey={1}>Perfil</MenuItem>
                <MenuItem eventKey={2} href="/logout">Logout</MenuItem>
            </NavDropdown>
            ) : (
            <li data-role="presentation" eventKey={1}><Link to="login">Login</Link></li>
            );
        return (
            <Navbar fixedTop toggleNavKey={0}>
                <NavBrand><Link to="/">Vendata</Link></NavBrand>
                <CollapsibleNav eventKey={0}>
                    <Nav navbar right>
                    {rightItem}
                    </Nav>
                </CollapsibleNav>
            </Navbar>
        );
    }

});

module.exports = NavigationBar;