// ./components/mixins/ChangeAware.js.jsx
/*
 * The `store` passed must implement the methods:
 *
 *          addChangeListener(callback)
 *          removeChangeListener(callback)
 */

var ChangeAware = function (store, callback){
    return {
        componentDidMount: function() {
            store.addChangeListener(callback);
        },

        componentWillUnmount: function() {
            store.removeChangeListener(callback);
        }
    }
};

module.exports = ChangeAware;