var dispatcher = require('./../dispatcher.js');
var helper = require('./../helpers/RestHelper.js');

function GroceryItemStore() {
    var items = [];

    helper.get("/api/items")
    .then(function (data) {
        items = data;
        triggerListeners();
    })

    var listeners = [];

    function getItems() {
        return items;
    }

    function addGroceryItem(item) {
        items.push(item);
        triggerListeners();

        helper.post("/api/items", item);
    }

    function deleteGroceryItem(item) {
        var index = items.indexOf(item);
        if (index > -1) {
            items.splice(index, 1);
        }
        triggerListeners();
        helper.remove("/api/items/" + item._id);
    }

    function setGroceryItemPurchasedState(item, state) {
        var index = items.indexOf(item);
        if (index > -1) {
            items[index].purchased = state;
        }
        triggerListeners();

        helper.patch("/api/items/" + item._id, item);
    }

    function onChange(listener) {
        listeners.push(listener);
    }

    function triggerListeners() {
        listeners.forEach(function (listener) {
            listener(items);
        });
    };

    dispatcher.register(function (event) {
        var split = event.type.split(':');
        if (split[0] === 'grocery-item') {
            switch (split[1]) {
                case "add":
                    addGroceryItem(event.payload);
                    break;
                case "remove":
                    deleteGroceryItem(event.payload);
                    break;
                case "buy":
                    setGroceryItemPurchasedState(event.payload, true);
                    break;
                case "unbuy":
                    setGroceryItemPurchasedState(event.payload, false);
                    break;
            }
        }
    });

    return {
        getItems: getItems,
        onChange: onChange
    };
}

module.exports = new GroceryItemStore();