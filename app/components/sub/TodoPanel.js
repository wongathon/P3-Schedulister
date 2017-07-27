import React, { Component } from "react";
import TodoItem from "./TodoItem";
import moment from 'moment';

class TodoPanel extends Component {

  renderTodos() {
    // Getting a filtered array of items. Boild tasks down to todos. 
    //&& moment().diff(item.taskDate, 'days') !== 0

    const activeTodos = this.props.tasks.filter(item => {
      if (item.active === true) {
        return true;
      }
    });

    console.log("active todos", activeTodos);

    if (activeTodos.length > 0) {
      return activeTodos.map(task => (
        <TodoItem 
          key={task._id} 
          todo={task} 
          getTasks={this.props.getTasks} 
          getSchedule={this.props.getSchedule}
        />
      ));
    } else {
      return (
        <p><i>Nothing here yet!</i></p>
      )
    }

    //console.log("active todos", activeTodos);
    //this.setState({ todos: activeTodos });

  }

  render() {
    
    let date = Date.now();

    return (
      <div className="panel panel-success">
        <div className="panel-heading">
          <h3 className="panel-title">Todos - {moment(date).format("dddd, MMMM Do YYYY")}</h3>
        </div>
        <div className="panel-body">
          <ul className="list-group">
            {this.renderTodos()}
          </ul>
        </div>
      </div>
    );
  }
}

// Exporting this component as the default (only) export
export default TodoPanel;


