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

  componentDidUpdate() {

  }

  getTasks() {
    //build axios methods
    API.getTasks().then((res) => {
      //activate task if date is today, 
      //created at is in the past. 
      //Avoid activating recurring tasks by how? Complete button should shift task date ahead by one is how.
      //COmplete button should set item.taskdate to NULL for non-recurring, also.  
      res.data.forEach( item => {
                //returns true if today                       //returns true if created in past. 
        if( item.active === false && moment(item.taskDate).isSame(moment(), 'day') ) {
          item.active = true;
          //&& moment(item.taskCreated).isBefore(item.taskDate, 'day')
        }
        //Panel will take active & today tasks only. 
      });
      console.log("get Tasks after activated: ", res.data);
      this.setState({ tasks: res.data });
    });
  }

  getSchedule() {
    //INCOMPLETE
    API.getTasksType(
        { nextDate: { $exists: true } }
      ).then((res) => {
      console.log("schedule get:", res.data);
      this.setState({ todoSchedule: res.data })
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
          <div className="col-sm-8 col-md-6"> 
            <Schedule 
              tasks={this.state.todoSchedule}
              getSchedule={this.getSchedule}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
