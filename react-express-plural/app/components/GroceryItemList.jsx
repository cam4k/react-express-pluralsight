var React = require('react/addons');
var GroceryItem = require('./GroceryItem.jsx')
var GroceryListAddItem = require('./GroceryListAddItem.jsx')

module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <h1>Grocery List App v0.1</h1>
                <div>
                    {
                        this.props.items.map(function(item, index) {
                            return(
                                <GroceryItem key={"item"+index} item={item}/>
                            )
                        })
                    }
                </div>

                <div>
                    <GroceryListAddItem />
                </div>
            </div>    
        )
    }
});