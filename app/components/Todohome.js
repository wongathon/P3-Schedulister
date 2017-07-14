import React, { Component } from "react";
import TodoItem from "./sub/TodoItem";
//import Schedule from "./sub/Schedule";
import TodoPanel from "./sub/TodoPanel";
import API from "../utils/api";

class Home extends Component {
  constructor() {
    super();
    this.state = { 
      tasks: [],
      todoSchedule: []
    };

    this.getTasks = this.getTasks.bind(this);
    this.getSchedule = this.getSchedule.bind(this);
  }

  componentDidMount() {
    this.getTasks();
  }

  componentDidUpdate() {
    this.getSchedule();
  }

  getTasks() {
    //build axios methods
    API.getTasks().then((res) => {
      console.log("getTasks:", res.data);
      this.setState({ tasks: res.data });
    });
  }

  getSchedule() {
    API.getSchedule().then((res) => {
      console.log("schedule:", res.data);
      this.setState({ todoSchedule: res.data})
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8 col-md-6">
            <TodoPanel
              tasks={this.state.tasks}
              getTasks={this.getTasks}
            />
          </div>
        </div>
        <hr />
        <div className="row">
          {/*<Schedule 
            tasks={this.state.todoSchedule}
            getSchedule={this.getSchedule}
          />*/}
        </div>
      </div>
    );
  }
}

export default Home;
