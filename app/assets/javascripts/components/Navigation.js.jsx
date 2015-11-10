// ./components/Navigation.react.jsx
var BS                 = require('react-bootstrap'),
    Auth               = require('j-toker'),
    _                  = require('lodash'),
    RouteHandler       = require('react-router').RouteHandler,
    RouteStore         = require('../stores/RouteStore.react.jsx'),
    SessionStore       = require('../stores/SessionStore.react.jsx');
// react-bootstrap components:
var Navbar         = BS.Navbar,
    NavBrand       = BS.NavBrand,
    Nav            = BS.Nav,
    NavDropdown    = BS.NavDropdown,
    MenuItem       = BS.MenuItem
    CollapsibleNav = BS.CollapsibleNav;




function getStateFromStores() {
    return {
        isLoggedIn: SessionStore.isLoggedIn(),
        user: SessionStore.getUser()
    };
}

Navigation = React.createClass({
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
        var rightItem = this.state.isLoggedIn ? (
            <NavDropdown eventKey={3} title={self.state.user.email} id="basic-nav-dropdown">
                <MenuItem eventKey="1">Perfil</MenuItem>
                <MenuItem eventKey="2">Logout</MenuItem>
            </NavDropdown>
            ) : (
            <MenuItem eventKey="1">Login</MenuItem>
            );
        return (
            <Navbar fixedTop toggleNavKey={0}>
                <NavBrand><a href="/">Vendata</a></NavBrand>
                <CollapsibleNav eventKey={0}>
                    <Nav right eventKey={1}>
                        {rightItem}
                    </Nav>
                </CollapsibleNav>
            </Navbar>
        );
    }
});

module.exports = Navigation;