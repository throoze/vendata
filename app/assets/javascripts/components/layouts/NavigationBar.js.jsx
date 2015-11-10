// ./components/NavigationBar.js.jsx
var BS             = require('react-bootstrap'),
    SessionStore   = require('../../stores/SessionStore.react.jsx');
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

NavigationBar = React.createClass({
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

module.exports = NavigationBar;