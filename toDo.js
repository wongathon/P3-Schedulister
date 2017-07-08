/**
 * Created by elenastaylor on 7/7/17.
 */
"use strict";

var Item = React.createClass({
    displayName: "Item",

    render: function render() {
        return React.createElement(
            "li",
            null,
            this.props.value
        );
    }
});
var Box = React.createClass({
    displayName: "Box",
    getInitialState: function getInitialState() {
        return {
            text: "",
            items: []
        };
    },

    handleChange: function handleChange(e) {
        this.setState({
            text: e.target.value
        });
    },
    handleClick: function handleClick(e) {
        var text = this.state.text;
        var items = this.state.items;
        items.push(text);
        this.setState({
            text: "",
            items: items
        });
    },
    handleRemove: function handleRemove(e) {
        var taskIndex = parseInt(e.target.value, 10);
        this.setState(function (state) {
            state.items.splice(taskIndex, 1);
            return { items: state.items };
        });
    },
    render: function render() {
        var text = this.state.text;
        var items = this.state.items;
        return React.createElement(
            "div",
            null,
            React.createElement("input", { type: "text", value: text, onChange: this.handleChange }),
            React.createElement("input", { type: "button", value: "add", onClick: this.handleClick }),
            React.createElement("input", { type: "button", value: "delete", onClick: this.handleRemove }),
            React.createElement(
                "ul",
                { id: "list" },
                items.map(function (item) {
                    return React.createElement(Item, { value: item });
                })
            )
        );
    }
});

ReactDOM.render(React.createElement(Box, null), document.getElementById('content'));