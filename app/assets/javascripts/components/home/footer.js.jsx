// ./components/home/footer.js.jsx
var datauri = require('datauri');


Footer = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    render: function() {
        var ipys          = "assets/" + datauri(__dirname+'/../../../images/logos/Logo-Ipys.png');
        var transparencia = "assets/" + datauri(__dirname+'/../../../images/logos/Logo-transparencia.png');
        var armando       = "assets/" + datauri(__dirname+'/../../../images/logos/Logo-armando.png');
        var escuela       = "assets/" + datauri(__dirname+'/../../../images/logos/Logo-escuela-de-datos.png');
        var html = (
            <footer className="footer" >
                <div className="container-fluid">
                    <div className="row">
                        <div className="footer-logos">                     
                          <div className="footer-logos-inner">                            
                            <div className="col-lg-3">
                                <img src={ipys}/>
                            </div>
                            <div className="col-lg-3">
                                <img src={transparencia}/>
                            </div>
                            <div className="col-lg-3">
                                <img src={armando}/>
                            </div>
                            <div className="col-lg-3">
                                <img src={escuela}/>
                            </div>
                          </div>   
                        </div>             
                    </div>
                </div>
                <div className="background-turquoise" style={{overflow: "hidden"}}>    
                    <div className="col-lg-8">
                      <p>&copy; Es un proyecto de IPYS Venezuela y Transparencia, con colaboracion de Escuela de Datos, Armando info. 2016</p>
                    </div>
                    <div className="col-lg-4" style={{textAlign: "right"}}> 
                      <a style={{color: "#333333"}} href="mailto:vendataorg@gmail.com" className="white">vendataorg@gmail.com</a>
                    </div>
                </div>
            </footer>
            );
        return html;
    }

});

module.exports = Footer;