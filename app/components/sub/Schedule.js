import React, { Component } from 'react';
import Moment from 'react-moment';
import 'react-datepicker/dist/react-datepicker.css';

class Schedule extends Component {
    // Defining a constructor method where we set our initial state
    constructor() {
        super();
        // Setting this.state to our scheduledTasks array
        this.state = {
             scheduledTasks: [],
             itemDate: '',
             itemActive: true
        };
        // Binding to this component to have access to 'this'
        this.renderScheduledTasks = this.renderScheduledTasks.bind(this);
    }

    renderScheduledTasks() {
        // Getting an array of scheduled tasks
        const futureScheduledTasks = this.state.ScheduledTasks.filter(item => item.active === true);

        // Mapping through our active scheduled tasks
        return activeScheduledTasks.map(item => (
            <ListItem key={item._id}>
                {item.task}
                {item.date}
            </ListItem>
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
                        <li className="list-group-item">
                            {this.renderScheduledTasks()} {this.state.itemDate}</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Schedule;

