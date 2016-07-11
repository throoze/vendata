// ./components/home/carousel.js.jsx
var datauri = require('datauri');


Carousel = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    render: function() {
        var left = "assets/" + datauri(__dirname+'/../../../images/iconos/Flecha-izquierda.png');
        var right = "assets/" + datauri(__dirname+'/../../../images/iconos/Flecha-derecha.png');
        var carousel_1 = "assets/" + datauri(__dirname+'/../../../images/colaboradores/Colaboradores-001.jpg');
        var carousel_2 = "assets/" + datauri(__dirname+'/../../../images/colaboradores/Colaboradores-002.jpg');
        var carousel_3 = "assets/" + datauri(__dirname+'/../../../images/colaboradores/Colaboradores-003.jpg');
        var carousel_4 = "assets/" + datauri(__dirname+'/../../../images/colaboradores/Colaboradores-004.jpg');
        var html = (
            <section>
                <div className="container-fluid">
                    <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
                    {/* <!-- Indicators --> */}
                    <ol className="carousel-indicators">
                      <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
                      <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                      <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                      <li data-target="#carousel-example-generic" data-slide-to="3"></li>
                      <li data-target="#carousel-example-generic" data-slide-to="4"></li>
                    </ol>

                    {/* <!-- Wrapper for slides --> */}
                    <div className="carousel-inner" role="listbox">
                      <div className="item active">
                        <img src={carousel_1} alt="..."/>
                        <div className="carousel-caption">
                        {/* <!-- Caption text sobre la imagen--> */}
                        </div>
                      </div>
                      <div className="item">
                        <img src={carousel_2} alt="..."/>
                        <div className="carousel-caption">
                        {/* <!-- Caption text sobre la imagen--> */}
                        </div>
                      </div>
                      <div className="item">
                        <img src={carousel_3} alt="..."/>
                        <div className="carousel-caption">
                        {/* <!-- Caption text sobre la imagen--> */}
                        </div>
                      </div>
                      <div className="item">
                        <img src={carousel_4} alt="..."/>
                        <div className="carousel-caption">
                        {/* <!-- Caption text sobre la imagen--> */}
                        </div>
                      </div>
                    </div>

                    {/* <!-- Controls --> */}
                    <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                      <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                      <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                      <span className="sr-only">Next</span>
                    </a>
                    </div>
                    <div className="colab-names">
                        {/*<div className="col-lg-2">
                            <img src={left} className="img-responsive img-center"/>
                        </div>*/}
                        <div className="col-lg-8 col-lg-offset-2">                    
                        <p className="cnames">
                            Manuel Alcántara, Adriana De Ponte, Laura Rodríguez, Daniela Alvarado, Mónica Duarte, Andreina Hernández, Ariana Guevara, Oriana Chirinos, Andrea De La Rosa, Mariana Mendoza, Armando Altuve, Oriana Vielma, Katheryn de Abreu.
                        </p>                
                        </div>
                        {/*<div className="col-lg-2">
                            <img src={right} className="img-responsive img-center"/>                
                        </div>*/}
                    </div>

                </div>
            </section>
            );
        return html;
    }

});

module.exports = Carousel;