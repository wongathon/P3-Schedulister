import React, { Component } from "react"
import API from "../utils/api"
import {Route, Redirect} from 'react-router'
import AdminPanel from './sub/AdminPanel' 
import moment from 'moment'
import ReactModal from 'react-modal'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class Admin extends Component {

	constructor() {
    	super();
    	this.state = {
    		tasks: [],
    		showModal: false,
    		taskDate: moment(),
    		_id: "",
	    	text: "",
	    	recurFrequency: "",
	    	recurAmount: "",
	      recurBetween: ""
    	};

    	this.getTasks = this.getTasks.bind(this);
    	this.deleteTodos = this.deleteTodos.bind(this);
    	this.handleOpenModal = this.handleOpenModal.bind(this);
    	this.handleCloseModal = this.handleCloseModal.bind(this);
    	this.handleChange = this.handleChange.bind(this);
    	this.handleChangeDate = this.handleChangeDate.bind(this);
    	this.handleUpdate = this.handleUpdate.bind(this);
  	}

  	handleChange(event) {
	    this.setState({ [event.target.id]: event.target.value }
	    	);
	}

	handleChangeDate(date){
	    this.setState({taskDate: date }
	    	);
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

	handleOpenModal (item) {
    console.log(item);
    this.setState(
    		{ 	
    			showModal: true,
	    		_id: item._id,
	    		text: item.text ? item.text : "",
	    		taskDate: moment(item.taskDate),
	    		recurFrequency: item.recurFrequency ? item.recurFrequency : "",
	    		recurAmount: item.recurAmount ? item.recurAmount : "",
	        recurBetween: item.recurBetween ? item.recurBetween : ""	
    		}
    	);
    
  	}
  
  	handleCloseModal () {
    this.setState({ showModal: false });
    this.getTasks();
  	}

  	handleUpdate (event) {
  		event.preventDefault();
  		console.log(this.state)

  		const { _id , text, recurFrequency, recurAmount, recurBetween } = this.state;
    	const taskDate = this.state.taskDate;
    	var taskObj = {};

    	console.log(_id);

    if (recurFrequency === "none" || recurFrequency === "") {
      taskObj = {
      	_id: _id,
        text: text,
        taskDate: taskDate, //due today, basically, pulled from Component
        recurAmount: 1
      };

	if (moment(taskDate).isAfter(moment(), 'day')) {
        //if date !== today, nextDate = taskdate. If equals, then will nullify on complete. 
        const nextDate = taskDate; //equals "taskdate"
        console.log("hit me!");
        taskObj.active = false;
        taskObj.nextDate = nextDate;
      } 

    } else {
      //calcs when the next one is. 
      taskObj = {
      	_id: _id,
        text: text,
        taskDate: taskDate,
        recurAny: true,
        recurFrequency: recurFrequency,
        recurAmount: recurAmount,
        recurBetween: recurBetween
      };

       //Start future vs. start today. 
      if (!(moment(taskDate).isSame(moment(), 'day'))) {
        //if date !== today, nextDate = taskdate. If equals, then will nullify on complete. 
        const nextDate = taskDate; //equals "taskdate"
        taskObj.active = false;
        taskObj.nextDate = nextDate;

      //start today. 
      } else {
        //calcs when the next one is, in "nextDate"
        const recursX = recurBetween === "" ? 1 : recurBetween;

        const nextDate = taskDate.clone().add(recursX, recurFrequency).format();

        taskObj.nextDate = nextDate;
      }
    }

    console.log(taskObj);

    API.taskUpdate(taskObj).then( res => {
      console.log("Updating the task:", res.data);
    }).then(this.handleCloseModal());
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

			const dailyTodos = this.state.tasks.filter(item => item.recurFrequency === 'day' && item.taskDate !== null);
	    const weeklyTodos = this.state.tasks.filter(item => item.recurFrequency === 'week' && item.taskDate !== null);
	    const monthlyTodos = this.state.tasks.filter(item => item.recurFrequency === 'month' && item.taskDate !== null);
	    const scheduledTodos = this.state.tasks.filter(item => item.taskDate && item.recurAny === false);
	    const completedTodos = this.state.tasks.filter(item => item.taskDate === null && item.active === false);

	    return (
	    <div>
	      <div className="page-header">
	        <h2>Edit my To-dos</h2>
	      </div>
	      <div className="panel panel-success">
	        <div className="panel-heading">
	          <h3 className="panel-title">Daily Todos</h3>
	        </div>
	        <div className="panel-body">
	          <ul className="list-group">
	            <AdminPanel todos={dailyTodos} editTask={this.editTask} deleteTodos={this.deleteTodos} openModal={this.handleOpenModal}/> 
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
	            <AdminPanel todos={weeklyTodos} editTask={this.editTask} deleteTodos={this.deleteTodos} openModal={this.handleOpenModal} /> 
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
	            <AdminPanel todos={monthlyTodos} editTask={this.editTask} deleteTodos={this.deleteTodos} openModal={this.handleOpenModal} /> 
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
	            <AdminPanel todos={scheduledTodos} editTask={this.editTask} deleteTodos={this.deleteTodos} openModal={this.handleOpenModal} /> 
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
           contentLabel="Update Modal"
           style={{
              content: {
                left: '25%',
                right: '25%'
              }
            }}
        > 
          <button onClick={this.handleCloseModal} className="btn btn-xs btn-default pull-right">X</button>
          <div className="panel panel-success">
        <div className="panel-heading">
          <h3 className="panel-title">Update Form</h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.handleUpdate}>
            <div className="form-group">
               
             <h4>Describe your task</h4>
             <input
               value={this.state.text}
               type="text"
               className="form-control"
               id="text"
               onChange={this.handleChange}
               required

             />

             <h4>Recurs</h4><p><i>Not required</i></p>
             <div className="radio">
               <label>
                 <input type="radio" value={'none'} id='recurFrequency' 
                 checked={this.state.recurFrequency === 'none'}
                 onChange={this.handleChange} />
                 None
               </label>
             </div>
             <div className="radio">
               <label>
                 <input type="radio" value='day' id='recurFrequency'
                 checked={this.state.recurFrequency === 'day'}
                 onChange={this.handleChange} />
                 Daily
               </label>
             </div>
             <div className="radio">
               <label>
                 <input type="radio" value='week' id='recurFrequency'
                 checked={this.state.recurFrequency === 'week'}
                 onChange={this.handleChange} />
                 Weekly
               </label>
             </div>
             <div className="radio">
               <label>
                 <input type="radio" value='month' id='recurFrequency'
                 checked={this.state.recurFrequency === 'month'}
                 onChange={this.handleChange} />
                 Monthly
               </label>
             </div>

              <h4>Repeat for{' '}
                <input type="text" pattern="[\d*]"
                  onInput={this.handleChange}
                  size="2"
                  id="recurAmount"
                  value={this.state.recurAmount} />
                  {this.state.recurFrequency === "none" ? "" : this.state.recurFrequency+"s"}.
              </h4>

              <h4>Recur every{' '}
                <input type="text" pattern="[\d*]" 
                  onInput={this.handleChange}
                  size="2"
                  id="recurBetween"
                  value={this.state.recurBetween} />
                {this.state.recurFrequency  === "none" ? "" : this.state.recurFrequency+"s"}.
              </h4>

              <h4>Task Date</h4>
              <p><i>Start date if recurring, or one time event</i></p>
              <DatePicker
                selected={this.state.taskDate}
                onChange={this.handleChangeDate}
              />
              <hr />
              <button
                 type="submit"
                 className="btn btn-success"
              >Update Task</button>
            </div>
          </form>
        </div>
      </div>

          
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
