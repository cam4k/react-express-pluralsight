var dispatcher = require('./../dispatcher.js');

module.exports = {
    add: function (item) {
        dispatcher.dispatch({
            payload: item,
            type:"grocery-item:add"
        });
    },
    remove: function (item) {
        dispatcher.dispatch({
            payload: item,
            type: "grocery-item:remove"
        });
    },
    unbuy: function (item) {
        dispatcher.dispatch({
            payload: item,
            type: "grocery-item:unbuy"
        })
    },
    buy: function (item) {
        dispatcher.dispatch({
            payload: item,
            type: "grocery-item:buy"
        })
    }
}