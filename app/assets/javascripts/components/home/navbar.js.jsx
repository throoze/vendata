// ./components/home/navbar.js.jsx
var datauri = require('datauri');
var Link    = ReactRouter.Link;

NavigationBar = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    render: function() {

        var logo_menu = "assets/" + datauri(__dirname+'/../../../images/Logo-menu.png');

        var navbar = (
            <nav className="navbar navbar-custom navbar-fixed-top" role="navigation" style={{backgroundColor: "rgba(255, 255, 255, 0.8)"}}>
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-main-collapse">
                            <i className="fa fa-bars"></i>
                        </button>
                        <a className="navbar-brand page-scroll" href="#page-top">
                            <img src={logo_menu} className="img-logo"/>  
                        </a>
                    </div>

                    <div className="collapse navbar-collapse navbar-right navbar-main-collapse">
                        <ul className="nav navbar-nav">
                            <li className="hidden">
                                <a href="#page-top"></a>
                            </li>
                            <li>
                                <a id="link-to-about" className="page-scroll" href="#about">¿Qui&eacute;nes somos?</a>
                            </li>
                            <li>
                                <a id="link-to-whatsthis" className="page-scroll" href="#download">¿Qu&eacute; es Vendata?</a>
                            </li>
                            <li>
                                <a id="link-to-docs" className="page-scroll" href="#contact">Documentaci&oacute;n</a>
                            </li>                    
                            <li>
                                <a id="link-to-research" className="page-scroll" href="http://armando.info/historias/featured/7179=el-ministerio-de-alimentacion-es-un-cuartel-de-amigos">Investigaciones</a>
                            </li>                    
                            <li>
                                <a id="link-to-blog" className="page-scroll" href="https://blogvendata.wordpress.com/">Blog</a>
                            </li>                    
                            <li>
                                <Link to="platform">Vendata (Scraping)</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            );
        return navbar;
    }

});

module.exports = NavigationBar;