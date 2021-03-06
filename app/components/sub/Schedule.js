import React, { Component } from 'react';
import ScheduleItem from "./ScheduleItem";
import moment from 'moment';

class Schedule extends Component {
  // Defining a constructor method where we set our initial state

 renderScheduledTasks() {
    // Getting an array of scheduled tasks
    const { tasks } = this.props;

    const sched = tasks.filter(item => moment(item.taskDate).isAfter(moment(), 'day') === true);
   // Mapping through our future, INACTIVE tasks
   if (sched) {
    return sched.map(item => (
      <ScheduleItem 
        item={item}
        key={item._id}
      />
    )) 
    } else {
      return (
        <p>nothing yet</p>
      );
    }
  }

 render() {
    // Running {this.renderScheduledTasks} to return the result of the method
    return (
      <div className="panel panel-danger">
        <div className="panel-heading">
            <h3 className="panel-title">Upcoming Schedule</h3>
        </div>

        <div className="panel-body">
            <ul className="list-group">
                {this.renderScheduledTasks()} 
            </ul>
        </div>
      </div>
    );
  }
}

export default Schedule;