

var style = {
 display: 'inline-block',  
   position: 'fixed',
   top: 0,
   bottom: 0,
   left: 10,
   right: 0,
   width: 240,
   height: 150,
   margin: 'auto'
};

var Index = React.createClass({
  render: function() {
    return (
      <div  style={style}>
        
          HOLA MUNDO!
        
      </div>
      );
  }
});

module.exports = Index;