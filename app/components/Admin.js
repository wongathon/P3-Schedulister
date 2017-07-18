import React, { Component } from "react"
import API from "../utils/api"
import {hashHistory} from 'react-router'
import AdminPanel from './sub/AdminPanel' 
import moment from 'moment'


class Admin extends Component {

	constructor() {
    	super();
    	this.state = {
    		tasks: []
    	}

    	this.getTasks = this.getTasks.bind(this);
    	this.editTask = this.editTask.bind(this);
    	this.deleteTodos = this.deleteTodos.bind(this);
  	}

	componentDidMount() {
		this.getTasks();
	}
	
	getTasks() {
		//build axios methods
		API.getTasks().then((res) => {
			console.log(res.data);
		 this.setState({ tasks: res.data });
		});
	}


	editTask(item) {
		//go to Add Task form
		//hashHistory.push('/addtask/');
		console.log(item._id);
		
		
			
		
	}

	deleteTodos(item) {
	    API.deleteTask(item)
	    .then(alert('This task will be deleted forever'))
	    .then(this.getTasks())
        .catch(function (error) {
            console.log(error);
        });
	}

	render() {

<<<<<<< HEAD
		const dailyTodos = this.state.tasks.filter(item => item.active === true && item.recurFrequency === 'day');
	    const weeklyTodos = this.state.tasks.filter(item => item.active === true && item.recurFrequency === 'week');
	    const monthlyTodos = this.state.tasks.filter(item => item.active === true && item.recurFrequency === 'month');
	    const scheduledTodos = this.state.tasks.filter(item => item.active === true && item.recurAny === false);
	    const completedTodos = this.state.tasks.filter(item => item.active === false);
	    
=======
			const dailyTodos = this.state.tasks.filter(item => item.recurFrequency === 'day');
	    const weeklyTodos = this.state.tasks.filter(item => item.recurFrequency === 'week');
	    const monthlyTodos = this.state.tasks.filter(item => item.recurFrequency === 'month');
	    const scheduledTodos = this.state.tasks.filter(item => moment(item.taskDate).isAfter(moment(), 'day') === true);
	    const completedTodos = this.state.tasks.filter(item => item.taskDate === null && item.active === false);

>>>>>>> 5bf9eb65e6d209a68119eb4e0c7b5cdf13cb85e5
	    return (
	    <div>
	      <div className="panel panel-success">
	        <div className="panel-heading">
	          <h3 className="panel-title">Daily Todos</h3>
	        </div>
	        <div className="panel-body">
	          <ul className="list-group">
	            <AdminPanel todos={dailyTodos} editTask={this.editTask} deleteTodos={this.deleteTodos} /> 
	          </ul>
	        </div>
	      </div>
	      <br />
	      <div className="panel panel-info">
	        <div className="panel-heading">
	          <h3 className="panel-title">Weekly Todos</h3>
	        </div>
	        <div className="panel-body">
	          <ul className="list-group">
	            <AdminPanel todos={weeklyTodos} editTask={this.editTask} deleteTodos={this.deleteTodos} /> 
	          </ul>
	        </div>
	      </div>
		<br />
	      <div className="panel panel-warning">
	        <div className="panel-heading">
	          <h3 className="panel-title">Monthly Todos</h3>
	        </div>
	        <div className="panel-body">
	          <ul className="list-group">
	            <AdminPanel todos={monthlyTodos} editTask={this.editTask} deleteTodos={this.deleteTodos} /> 
	          </ul>
	        </div>
	      </div>
	     <br />
	      <div className="panel panel-danger">
	        <div className="panel-heading">
	          <h3 className="panel-title">Once-off Todos</h3>
	        </div>
	        <div className="panel-body">
	          <ul className="list-group">
	            <AdminPanel todos={scheduledTodos} editTask={this.editTask} deleteTodos={this.deleteTodos} /> 
	          </ul>
	        </div>
	      </div>
	      <br />
	      <div className="panel panel-default">
	        <div className="panel-heading">
	          <h3 className="panel-title">Completed Todos</h3>
	        </div>
	        <div className="panel-body">
	          <ul className="list-group">
							<AdminPanel todos={completedTodos} editTask={this.editTask} deleteTodos={this.deleteTodos} /> 
	          </ul>
	        </div>
	      </div>
	    </div>
	  );
	}
}

const styles = {
	lineHeight: {
	lineHeight: 2.1,
	}
};

// Exporting this component as the default (only) export
export default Admin;

