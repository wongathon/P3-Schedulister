import React, { Component } from "react";
import API from '../../utils/api';

class TodoItem extends Component {

  completeTodo(task) {
    API.taskComplete(task).then(this.props.getTodos);
  }

  render() {
    const todo = this.props.todo;
    return (
      <li className="list-group-item">
         <button
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
    cursor: "pointer"
  },
  done: {
    color: "grey"
  }
};

export default TodoItem
