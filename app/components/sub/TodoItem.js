import React, { Component } from "react";
import API from '../../utils/api';

class TodoItem extends Component {

  completeTodo(task) {
    API.taskComplete(task)
      .then(this.props.getTasks)
      .then(this.props.getSchedule);
  }

  render() {
    const todo = this.props.todo;
    
    const recurs = todo.recurFrequency ? ("recurs every " + todo.recurFrequency) : " ";
    //recurs daily
    
    return (
      <li className="list-group-item">
         <a
            className="btn btn-success"
            onClick={() => this.completeTodo(todo)}
            style={todo.active ? style.todo : style.done } 
          ><i className="fa fa-check"></i></a>{" "+todo.text}
          <p><i>{recurs}</i></p>
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


// return (
//       <li className="list-group-item">
//          <button
//             className="btn btn-success"
//             onClick={() => this.completeTodo(todo)}
//             style={todo.active ? style.todo : style.done } 
//           /> {" "+todo.text}
//           <p><i>{recurs}</i></p>
//       </li>
//     )
