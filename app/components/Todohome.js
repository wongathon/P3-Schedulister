import React, { Component } from "react";
import TodoItem from "./sub/MainPanel";
import Schedule from "./sub/Schedule";
import API from "../utils/API";

class Todohome extends Component {
  constructor() {
    super();
    this.state = { 
      todos: [],
      todoSchedule: []
    };

    this.getTasks = this.getTasks.bind(this);
  }

  componentDidMount() {
    this.getTasks();
  }

  getTasks() {
    //build axios methods
    API.getTasks().then((res) => {
      this.setState({ todos: res.data });
    });
  }

  getSchedule() {
    API.getSchedule().then((res) => {
      this.setState({ todoSchedule: res.data})
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <TodoPanel
            tasks={this.state.todos}
            getTasks={this.getTasks}
          />
        </div>
        <hr />
        <div className="row">
          <Schedule 
            tasks={this.state.todoSchedule}
            getSchedule={this.getSchedule}
          />
        </div>
      </div>
    );
  }
}

export default Todohome;