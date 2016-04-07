var React = require('react/addons');
var action = require('./../actions/GroceryItemActionCreator.jsx');

module.exports = React.createClass({
    remove: function(e) {
        e.preventDefault();
        action.remove(this.props.item);
    },
    togglePurchase: function(e) {
        e.preventDefault();

        if (this.props.item.purchased) {
            action.unbuy(this.props.item);
        } else {
            action.buy(this.props.item);
        }
    },
    render: function () {
        return (
            <div className="grocery-item row">
                <div className="six columns">
                    <h4 className={this.props.item.purchased ? "strikethrough" : ""}>
                        {this.props.item.name}
                    </h4>
                </div>
                <form className="three columns" onSubmit={this.remove}>
                    <button>&times;</button>
                </form>
                <form className="three columns" onSubmit={this.togglePurchase}>
                    <button className={this.props.item.purchased ? "" : "button-primary"}>
                        {this.props.item.purchased ? "Remove from Cart" : "Add to Cart"}
                    </button>
                </form>
            </div>
        )
    }
})