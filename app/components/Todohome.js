import React, { Component } from "react";
import TodoItem from "./sub/TodoItem";
import Schedule from "./sub/Schedule";
import TodoPanel from "./sub/TodoPanel";
import API from "../utils/api";
import moment from 'moment';

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
    this.getSchedule();
  }

  getTasks() {
    API.getTasks().then((res) => {
      res.data.forEach( item => {
                //activates true if today        
        if ( item.active === false && moment(item.taskDate).isSame(moment(), 'day') ) {
          item.active = true;
          API.taskUpdate(item);
        }
        //Must push activated tasks back to DB. 
      });
      this.setState({ tasks: res.data });
    });
  }

  getSchedule() {
    //INCOMPLETE... 
    //active = false, 
    API.getTasksType(
        { nextDate: { $exists: true } }
      ).then((res) => {
      this.setState({ todoSchedule: res.data })
    });
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <h2>My To-do List</h2>
        </div>
          <TodoPanel
            tasks={this.state.tasks}
            getTasks={this.getTasks}
            getSchedule={this.getSchedule}
          />
          <hr/>
          <Schedule 
            tasks={this.state.todoSchedule}
          />
      </div>
    );
  }
}

export default Home;
