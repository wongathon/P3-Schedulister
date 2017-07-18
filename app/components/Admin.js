import React, { Component } from "react"
import API from "../utils/api"
import {hashHistory} from 'react-router'
<<<<<<< HEAD
import AddTask from './Addtask'
var moment = require('moment');
import ReactModal from 'react-modal';
=======
import AdminPanel from './sub/AdminPanel' 
import moment from 'moment'

>>>>>>> ad0b1f90c1ff204ac7a73bdcb67f96c2f1f3e6e0

class Admin extends Component {

	constructor() {
    	super();
    	this.state = {
    		tasks: [],
    		showModal: false
    	}

    	this.getTasks = this.getTasks.bind(this);
    	this.editTask = this.editTask.bind(this);
    	this.deleteTodos = this.deleteTodos.bind(this);
    	this.handleOpenModal = this.handleOpenModal.bind(this);
    	this.handleCloseModal = this.handleCloseModal.bind(this);
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

  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

	editTask(item) {
		//go to Add Task form
		//hashHistory.push('/addtask/');
		console.log(item._id);
		
	}

<<<<<<< HEAD
	renderDailyTodos() {
	    // Getting a filtered array of daily and active items.
	    const dailyTodos = this.state.tasks.filter(item => item.active === true && item.recurFrequency === 'day');
	    
	    //this.setState({ todos: activeTodos });
	    return dailyTodos.map(item => (
	       <div key={item._id} style={styles.lineHeight}>
	        <listItem>{item.text}&nbsp;&nbsp;
	        <button className="btn btn-xs btn-primary"
	        		onClick={this.handleOpenModal}>EDIT</button>
	        		&nbsp;&nbsp;
	        <button className="btn btn-xs btn-danger"
	        		onClick={this.deleteTodos.bind(this, item._id)}
	        		>X</button>
	      	</listItem>
	      	<hr/>
	      </div>
      ));
	}

	renderWeeklyTodos() {
	    // Getting a filtered array of weekly and active items.
	    const weeklyTodos = this.state.tasks.filter(item => item.active === true && item.recurFrequency === 'week');
	    
	    //this.setState({ todos: activeTodos });
	    return weeklyTodos.map(item => (
	       <div key={item._id} style={styles.lineHeight}>
	        <listItem>{item.text}&nbsp;&nbsp;
	        <button className="btn btn-xs btn-primary"
	        		onClick={this.editTask.bind(this, item)}>EDIT</button>
	        		&nbsp;&nbsp;
	        <button className="btn btn-xs btn-danger"
	        		onClick={this.deleteTodos.bind(this, item._id)}
	        		>X</button>
	      	</listItem>
	      	<hr/>
	      </div>
      ));
	}

	renderMonthlyTodos() {
	    // Getting a filtered array of weekly and active items.
	    const monthlyTodos = this.state.tasks.filter(item => item.active === true && item.recurFrequency === 'month');
	    
	    //this.setState({ todos: activeTodos });
	    return monthlyTodos.map(item => (
	       <div key={item._id} style={styles.lineHeight}>
	        <listItem>{item.text}&nbsp;&nbsp;
	        <button className="btn btn-xs btn-primary"
	        		onClick={this.editTask.bind(this, item)}>EDIT</button>
	        		&nbsp;&nbsp;
	        <button className="btn btn-xs btn-danger"
	        		onClick={this.deleteTodos.bind(this, item._id)}
	        		>X</button>
	      	</listItem>
	      	<hr/>
	      </div>
      ));
	}

	renderScheduledTodos() {
	    // Getting a filtered array of weekly and active items.
	    const scheduledTodos = this.state.tasks.filter(item => item.active === true && item.recurAny === false);
	    
	    //this.setState({ todos: activeTodos });
	    return scheduledTodos.map(item => (
	       <div key={item._id} style={styles.lineHeight}>
	        <listItem>{item.text} - Scheduled: {moment(item.taskDate).format('MMMM Do YYYY')}&nbsp;&nbsp;
	        <button className="btn btn-xs btn-primary"
	        		onClick={this.editTask.bind(this, item)}>EDIT</button>
	        		&nbsp;&nbsp;
	        <button className="btn btn-xs btn-danger"
	        		onClick={this.deleteTodos.bind(this, item._id)}
	        		>X</button>
	      	</listItem>
	      	<hr/>
	      </div>
      ));
	}

	renderCompletedTodos() {
	    // Getting a filtered array of weekly and active items.
	    const completedTodos = this.state.tasks.filter(item => item.active === false);
	    
	    //this.setState({ todos: activeTodos });
	    return completedTodos.map(item => (
	       <div key={item._id} style={styles.lineHeight}>
	        <listItem>{item.text} - Scheduled: {moment(item.taskDate).format('MMMM Do YYYY')}&nbsp;&nbsp;
	        <button className="btn btn-xs btn-primary"
	        		onClick={this.editTask.bind(this, item)}>EDIT</button>
	        		&nbsp;&nbsp;
	        <button className="btn btn-xs btn-danger"
	        		onClick={this.deleteTodos.bind(this, item._id)}
	        		>X</button>
	      	</listItem>
	      	<hr/>
	      </div>
      ));
	}

=======
>>>>>>> ad0b1f90c1ff204ac7a73bdcb67f96c2f1f3e6e0
	deleteTodos(item) {
	    API.deleteTask(item)
	    .then(alert('This task will be deleted forever'))
	    .then(this.getTasks())
        .catch(function (error) {
            console.log(error);
        });
	}

	render() {

			const dailyTodos = this.state.tasks.filter(item => item.active === true && item.recurFrequency === 'day');
	    const weeklyTodos = this.state.tasks.filter(item => item.active === true && item.recurFrequency === 'week');
	    const monthlyTodos = this.state.tasks.filter(item => item.active === true && item.recurFrequency === 'month');
	    const scheduledTodos = this.state.tasks.filter(item => item.active === true && item.recurAny === false);
	    const completedTodos = this.state.tasks.filter(item => item.active === false);

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
	      <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
        >
          <button onClick={this.handleCloseModal}>Close Modal</button>
          <h1>Is this shit working or what?</h1>
        </ReactModal>
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


