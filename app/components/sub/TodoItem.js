import React, { Component } from "react";
import API from '../../utils/api';
import moment from "moment";

class TodoItem extends Component {

  completeTodo(task) {
    API.taskComplete(task)
      .then(this.props.getTasks)
      .then(this.props.getSchedule);
  }

  render() {
    const todo = this.props.todo;
    
    const recurs = todo.recurFrequency ? ("Recurs every " + (todo.recurBetween > 1 ? todo.recurBetween+" " : " ")+todo.recurFrequency + (todo.recurBetween > 1 ? "s.":".")) : " ";
    const recurAmount = todo.recurAmount ? (todo.recurAmount > 1 ? (todo.recurAmount + " occurences left.") : "One-time" ) : "";
    //recurs daily


    
    return (
      <li className="list-group-item">
         <a
            className={ (moment(todo.taskDate).isBefore(moment(), "day") ) ? "btn btn-danger" : "btn btn-success" }
            onClick={() => this.completeTodo(todo)}
          >{ (moment(todo.taskDate).isBefore(moment(), "day") ) ? "OK" : <i className="fa fa-check"></i>}</a><b>{" "+todo.text}</b>
            {
              (moment(todo.nextDate).isBefore(moment(), "day")) 
                ? <span style={style.warn}> Reactivate? Will reset starting today.</span>
                : ( (moment(todo.taskDate).isBefore(moment(), "day")) 
                      ? <span style={style.warn}> Overdue!</span>
                      : ""
                )
            }
          <p><i>{recurs}{' '}{recurAmount}</i></p>
      </li>
    )
  }
};

const style = {
  todo: {
    cursor: "pointer",
    color: "green"
  },
  confirm: {
    cursor: "pointer",
    color: "red"
  },
  warn: {
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
