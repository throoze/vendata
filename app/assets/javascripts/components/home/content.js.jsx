// ./components/home/content.js.jsx
var datauri       = require('datauri');


Content = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    render: function() {
        var url = "assets/" + datauri(__dirname+'/../../../images/iconos/Flecha-abajo.png');
        var html = (
            <section>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <hr/>
                            <img src={url} className="img-responsive img-flecha-abajo "/>
                        </div>
                    </div>
                </div>
            </section>
            );
        return html;
    }

});

module.exports = Content;