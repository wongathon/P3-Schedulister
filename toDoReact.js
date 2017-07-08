/**
 * Created by elenastaylor on 7/7/17.
 */
var Item = React.createClass({
    render: function(){
        return <li>{this.props.value}</li>
    }
});
var Box = React.createClass({
    getInitialState(){
        return {
            text: "",
            items: []
        }
    },
    handleChange: function(e){
        this.setState({
            text: e.target.value
        })
    },
    handleClick: function(e){
        var text = this.state.text;
        var items = this.state.items;
        items.push(text);
        this.setState({
            text: "",
            items: items
        })
    },
    handleRemove: function(e){
        var taskIndex = parseInt(e.target.value, 10);
        this.setState(state => {
            state.items.splice(taskIndex, 1);
        return {items: state.items};
    });
    },
    render: function(){
        var text = this.state.text;
        var items = this.state.items;
        return <div>
        <input type="text" value={text} onChange={this.handleChange}/>
        <input type="button" value="add" onClick={this.handleClick}/>
        <input type="button" value="delete" onClick={this.handleRemove}/>
        <ul id="list">{
                items.map(function(item){
                return <Item value={item}/>
            })
    }</ul>
        </div>
    }
});

ReactDOM.render(
<Box/>,
    document.getElementById('content')
);