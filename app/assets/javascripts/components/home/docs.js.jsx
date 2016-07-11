// ./components/home/docs.js.jsx
var datauri = require('datauri');


Docs = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    render: function() {
        var github = "assets/" + datauri(__dirname+'/../../../images/Logo-Github.png');
        var html = (
            <section name="docs" className="background-turquoise vendata">
                <div className="container">
                    <div className="row">
                    <div className="border-white">
                        
                        <div className="col-lg-6">
                            <h1 className="section-title"> Documentaci&oacute;n </h1>                    
                            <a href="https://github.com/throoze/vendata"> 
                            <img src={github} className="img-responsive img-github"/>
                            </a>
                        </div>

                        <div className="col-lg-6">
                            <p className="section-paragraph">
                                Vendata es un proyecto completamente libre y abierto. Se encuentra bajo licencia GPLv.2. Si deseas
                                reutilizar todo o parte del c&oacute;digo de Vendata, puedes hacerlo mediante un fork de nuestro
                                repositorio en Github. Si deseas contribuir al proyecto, puedes hacerlo de varias maneras:
                            </p>
                            <p className="section-paragraph">
                                <li className="paragraph-bold"> Si eres desarrollador:</li>
                                <p className="section-paragraph-nested">                                
                                    <li className="paragraph">
                                        Puedes enviar un pull request a nuestro repositorio en Github
                                    </li>
                                    <li className="paragraph">
                                        {'Puedes ponerte en contacto con los coordinadores del proyecto mediante el correo electrónico '}
                                        <b>vendataorg@gmail.com</b>
                                    </li>
                                    <li className="paragraph">
                                        Las instrucciones para levantar el ambiente de
                                        desarrollo <a style={{color: "white"}} href="https://github.com/throoze/vendata/blob/develop/instalacion-del-ambiente-de-desarrollo.md"><b>puedes encontrarlas aqu&iacute;</b></a>
                                    </li>
                                </p>
                            </p> 
                            <p className="section-paragraph">
                                <li className="paragraph-bold"> Si deseas liberar data:</li>
                                <p className="section-paragraph-nested">                                
                                    <li className="paragraph">
                                        Escribenos a <b>escueladedatosvenezuela@gmail.com</b> y te damos m&aacute;s detalles.
                                    </li>
                                </p>
                            </p>
                            <p className="section-paragraph">
                                <li className="paragraph-bold"> Si deseas ser una institucion aliada:</li>
                                <p className="section-paragraph-nested">                                
                                    <li className="paragraph">
                                        Escribenos a <b> escueladedatosvenezuela@gmail.com</b> / <b>vendataorg@gmail.com</b> y te damos
                                        {' '}m&aacute;s detalles.
                                    </li>
                                </p>
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

module.exports = Docs;