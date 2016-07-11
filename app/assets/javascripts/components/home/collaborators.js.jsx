// ./components/home/collaborators.js.jsx
var datauri       = require('datauri');


Collaborators = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    render: function() {
        var url = "assets/" + datauri(__dirname+'/../../../images/iconos/Linea-perfiles.png');
        var html = (
            <section>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <img src={url} className="img-responsive img-center"/>
                            <h1 className="section-colab"> Nuestros Colaboradores</h1>
                        </div>
                    </div>
                </div>
            </section>
            );
        return html;
    }

});

module.exports = Collaborators;