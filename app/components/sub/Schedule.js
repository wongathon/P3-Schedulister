import React, { Component } from 'react';
import ScheduleItem from "./ScheduleItem";

class Schedule extends Component {
  // Defining a constructor method where we set our initial state

 renderScheduledTasks() {
    // Getting an array of scheduled tasks
    const tasks = this.props.todoSchedule;
    const scheduled = tasks.filter(item => item.nextDate);

   // Mapping through our active scheduled tasks
    return scheduled.map(item => (
      <ScheduleItem 
        item={item}
        key={item._id}
      />
    ));
  }

 render() {
    // Running {this.renderScheduledTasks} to return the result of the method
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
            <h3 className="panel-title">Schedule</h3>
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