// ./components/home/header.js.jsx
var datauri = require('datauri');


Header = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    render: function() {
        var url = "assets/"+datauri(__dirname+'/../../../images/Logo-Beta-Vendata.png');
        var html = (
            <header className="image-bg-fluid-height">
                <img className="img-responsive img-right" src={url} />
            </header>
            );
        return html;
    }

});

module.exports = Header;