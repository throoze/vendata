// ./components/home/whatsthis.js.jsx


WhatsThis = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    render: function() {

        var html = (
            <section name="whatsthis" className="background-turquoise vendata">
                <div className="container">
                    <div className="row">
                    <div className="border-white">
                        
                        <div className="col-lg-6">
                            <p className="section-paragraph">
                                En la primera fase de creaci&oacute;n del proyecto, se seleccion&oacute; una muestra del total de
                                Gacetas Oficiales y se definieron los temas de inter&eacute;s p&uacute;blico a vaciar. Luego, se
                                estableci&oacute; una estructura b&aacute;sica del documento y se construy&oacute; un formulario
                                web de vaciado. El formulario se subi&oacute; a una plataforma web, en donde tambi&eacute;n se
                                deposit&oacute; el total de Gacetas Oficiales. Se crearon perfiles de usuarios para los colaboradores
                                y con la entrega de un manual de procedimiento y un tutorial se comenz&oacute; a vaciar información
                                de manera manual. Cada dato ingresado es chequeado y limpiado.
                            </p>                
                            <p className="section-paragraph">
                                Con la data obtenida, hasta el momento, se realiz&oacute; la investigacion disponible en este portal.
                                En nuestro blog puedes encontrar nuestras actualizaciones e informaci&oacute;n adicional referente
                                al proyecto.
                            </p>
                        </div>
                        <div className="col-lg-4 col-lg-push-2">
                            <h1 className="section-heading"> ¿Qu&eacute; es Vendata? </h1>                    
                            <a href="https://blogvendata.wordpress.com/" className="btn btn-default"> Blog Vendata</a>
                        </div>
                    </div>
                    </div>            
                </div>
            </section>
            );
        return html;
    }

});

module.exports = WhatsThis;