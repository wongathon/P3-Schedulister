import React, { Component } from "react";
import API from '../../utils/api';

class TodoItem extends Component {

  completeTodo(task) {
    API.taskComplete(task).then(this.props.getTasks);
  }

  render() {
    const todo = this.props.todo;
    return (
      <li className="list-group-item">
         <button
            className="btn btn-success"
            onClick={() => this.completeTodo(todo)}
            style={todo.active ? style.todo : style.done } 
          />
          {" "+todo.text}
      </li>
    )
  }
};

const style = {
  todo: {
    cursor: "pointer",
    color: "green"
  },
  done: {
    color: "red"
  }
};

export default TodoItem
