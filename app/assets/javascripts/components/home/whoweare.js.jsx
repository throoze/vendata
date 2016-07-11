// ./components/home/whoweare.js.jsx


WhoWeAre = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    render: function() {

        var html = (
            <section name="about" className="background-turquoise">
                <div className="container">
                    <div className="row">
                    <div className="border-white">
                        
                        <div className="col-lg-4 col-lg-push-1 quien-title">
                            <h1 className="section-heading"> ¿Qui&eacute;nes Somos? </h1>                    
                        </div>
                        <div className="col-lg-6 col-lg-push-1">
                            <p className="section-paragraph">
                                A mediados de 2015, el Instituto de Prensa y Sociedad de Venezuela (IPYS Venezuela) y Transparencia
                                Venezuela convocaron a un equipo multidisciplinario de periodistas, programadres y diseñadores web
                                para crear Vendata, una plataforma de b&uacute;squeda online que permite poner al alcance de los
                                venezolanos, en formatos reutilizables y c&oacute;digo abierto, informacion oficial contenida en
                                archivos {"PDF's"}.
                            </p>
                            <p className="section-paragraph">
                                Vendata es un proyecto colaborativo con la participaci&oacute;n de m&aacute;s de 50 personas de
                                distintas profesiones y organizaciones no gubernamentales aliadas que est&aacute; dirigida a
                                periodistas de investigaci&oacute;n, investigadores y ciudadanos interesados en conocer las
                                decisiones del Estado venezolano.
                            </p>
                            <p className="section-paragraph">
                                Vendata se encuentra en fase de desarrollo y en etapa de liberaci&oacute;n de datos relacionados con
                                seis temas de inter&eacute;s p&uacute;blico: designaciones de funcionarios p&uacute;blicos,
                                creaci&oacute;n de empresas y organismos del Estado, aprobaci&oacute;n de leyes y cr&eacute;ditos
                                adicionales, expropiaciones y ascensos militares. Durante el primer semestre de 2017 se hara
                                p&uacute;blica toda la data para su consulta.
                            </p>
                            <p className="section-paragraph">
                                Nuestro objetivo es coadyudar a la transparencia institucional, el desarollo de un Gobierno abierto y
                                la ejecuci&oacute;n de contralor&iacute;a social por parte de la sociedad venezolana.
                            </p>
                        </div>
                    </div>
                    </div>            
                </div>
            </section>
            );
        return html;
    }

});

module.exports = WhoWeAre;