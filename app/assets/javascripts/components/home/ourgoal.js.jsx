// ./components/home/ourgoal.js.jsx


OurGoal = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    render: function() {

        var html = (
            <section>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <hr/>
                            <p className="target">
                                Nuestro objetivo es coadyudar la transparencia institucional, el desarrollo de un Gobierno abierto
                                y la ejecuci&oacute;n de contralor&iacute;a social por parte de la sociedad venezolana
                            </p>

                            <hr/>
                        </div>
                    </div>
                </div>
            </section>
            );
        return html;
    }

});

module.exports = OurGoal;