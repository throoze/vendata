var Navbar        = require('./navbar');
var Header        = require('./header');
var Content       = require('./content');
var WhoWeAre      = require('./whoweare');
var Members       = require('./members');
var Collaborators = require('./collaborators');
var Carousel      = require('./carousel');
var OurGoal       = require('./ourgoal');
var WhatsThis     = require('./whatsthis');
var Docs          = require('./docs');
var Footer        = require('./footer');
var datauri       = require('datauri');

HomePage = React.createClass({

    componentDidMount: function() {
        var self = this;
        $('#link-to-about').on('click', function(e) {
            e.preventDefault();
            self.scrollToSection('about');
        });
        $('#link-to-whatsthis').on('click', function(e) {
            e.preventDefault();
            self.scrollToSection('whatsthis');
        });
        $('#link-to-docs').on('click', function(e) {
            e.preventDefault();
            self.scrollToSection('docs');
        });
        $('#flecha-arriba').on('click', function(e) {
            e.preventDefault();
            self.scrollToAnchor('page-top');
        });
    },

    scrollToAnchor: function (aid){
        var aTag = $("a[name='"+ aid +"']");
        $('html,body').animate({scrollTop: aTag.offset().top},'slow');
    },

    scrollToSection: function (sid){
        var aTag = $("section[name='"+ sid +"']");
        $('html,body').animate({scrollTop: aTag.offset().top},'slow');
    },

    render: function() {
        var url = "assets/" + datauri(__dirname+'/../../../images/iconos/Flecha-arriba.png');
        return (
            <div>
                <a name="page-top"></a>
                <Navbar />
                <Header />
                <Content />
                <WhoWeAre />
                <Members />
                <Collaborators />
                <Carousel />
                <OurGoal />
                <aside className="image-bg-fixed-height"></aside>
                <WhatsThis />
                <section>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <hr/>
                            </div>
                        </div>
                    </div>
                </section>
                <aside className="image-bg-fixed-doc"></aside>
                <Docs />
                <section className="pre-footer">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <hr/>
                                <img id="flecha-arriba" src={url} className="img-responsive img-flecha-arriba "/>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
            );
    }

});

module.exports = HomePage