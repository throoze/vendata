// ./components/mixins/SchemataAware.js.jsx
var ScrappingStore          = require('../../stores/ScrappingStore');

// <throoze> is there a way to parametrize mixins?
// <throoze> i would like to pass a callback to them, to register it as a listener to the store events
// <throoze> or as a workaround, can I refer to `this` inside a mixin?
// <GreenJello> throoze, yeah you can use `this` in mixins
// <GreenJello> and you can write functions that take some options and return mixins
// <throoze> would `this`(inside the mixin) refer to `this` in the component that includes the mixin?
// <chenghiz> yeah
// <throoze> aahh thats also a pretty cool option, writing functions!
// <throoze> it hadnt ocurred to me
// <throoze> thanks as always for your help guys!


var SchemataAware = function (callback){
    return {
        componentDidMount: function() {
            ScrappingStore.addSchemataChangeListener(callback);
        },

        componentWillUnmount: function() {
            ScrappingStore.removeSchemataChangeListener(callback);
        }
    }
};

module.exports = SchemataAware;