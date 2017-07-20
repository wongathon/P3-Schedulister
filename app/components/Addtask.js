import React, { Component } from 'react';
import { Route } from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import API from "../utils/api";

import 'react-datepicker/dist/react-datepicker.css';

class AddTask extends Component {
  constructor() {
    super();
    this.state = {
      desc : "",
      recurs: "", //weekly/montly/yearly
      repeatXTimes: "", //until 0
      recurEveryX: "", // x days, weeks, months. 
      date: moment()
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleChangeDate(date){
    this.setState({ date: date });
  }

  handleSubmit(event){
    event.preventDefault();
    
    const { desc, recurs, recurEveryX, repeatXTimes, date } = this.state;
    var taskObj = {};

    //Non-recur vs. Recur
    if (recurs === "none" || recurs === "") { 
      
      taskObj = {
        text: desc,
        taskDate: date, //due today, basically, pulled from Component
        recurAmount: 1
      };

      if (moment(date).isAfter(moment(), 'day')) {
        //if date !== today, nextDate = taskdate. If equals, then will nullify on complete. 
        const nextDate = date; //equals "taskdate"
        console.log("hit me!");
        taskObj.active = false;
        taskObj.nextDate = nextDate;
      } 

    } else { // should capture recurs 

      taskObj = {
        text: desc,
        taskDate: date,
        recurAny: true,
        recurFrequency: recurs,
        recurAmount: repeatXTimes,
        recurBetween: recurEveryX,
      };

      //Start future vs. start today. 
      if (!(moment(date).isSame(moment(), 'day'))) {
        //if date !== today, nextDate = taskdate. If equals, then will nullify on complete. 
        const nextDate = date; //equals "taskdate"
        taskObj.active = false;
        taskObj.nextDate = nextDate;

      //start today. 
      } else {
        //calcs when the next one is, in "nextDate"
        const recursX = recurEveryX === "" ? 1 : recurEveryX;

        const nextDate = date.clone().add(recursX, recurs).format();

        taskObj.nextDate = nextDate;
      }
    }

    API.saveTask(taskObj).then( res => {
      console.log("Save task res data:", res.data);
    }).then(
      alert("Task submitted! Change me to a modal you peasant!"),
      //https://stackoverflow.com/questions/41221633/how-to-submit-form-component-in-modal-dialogue-using-antd-react-component-librar
      this.props.router.push('/')
    );
  } 

  render() {

    return (
    <div>
      <div className="page-header">
        <h2>Add a To-do</h2>
      </div>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Add a task!</h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
               
             <h4>Describe your task</h4>
             <input
               value={this.state.desc}
               type="text"
               className="form-control"
               id="desc"
               onChange={this.handleChange}
               required
             />

             <h4>Recurs</h4><p><i>Not required</i></p>
             <div className="radio">
               <label>
                 <input type="radio" value='none' id='recurs' 
                 checked={this.state.recurs === 'none'}
                 onChange={this.handleChange} />
                 None
               </label>
             </div>
             <div className="radio">
               <label>
                 <input type="radio" value='day' id='recurs'
                 checked={this.state.recurs === 'day'}
                 onChange={this.handleChange} />
                 Daily
               </label>
             </div>
             <div className="radio">
               <label>
                 <input type="radio" value='week' id='recurs'
                 checked={this.state.recurs === 'week'}
                 onChange={this.handleChange} />
                 Weekly
               </label>
             </div>
             <div className="radio">
               <label>
                 <input type="radio" value='month' id='recurs'
                 checked={this.state.recurs === 'month'}
                 onChange={this.handleChange} />
                 Monthly
               </label>
             </div>
              <hr />
              <h4>Recur{' '}
                <input type="text" pattern="[\d*]{1,2}"
                  onInput={this.handleChange}
                  size="2"
                  id="repeatXTimes"
                  value={this.state.repeatXTimes} />
                  {' '}times. 
              </h4><p><i>Ex: Enter 6 to remind for 6 days. Leave blank for unlimited times until canceled.</i></p>

              <h4>Recur every{' '}
                <input type="text" pattern="[\d*]{1,2}" 
                  onInput={this.handleChange}
                  size="2"
                  id="recurEveryX"
                  value={this.state.recurEveryX} />
                {this.state.recurs  === "none" ? "" : this.state.recurs+"s"}.
              </h4><p><i>Ex: Enter 2 for bi-weekly, 6 for every 6 weeks, etc.</i></p>
              <hr />

              <h4>Task Date</h4>
              <p><i>Start date if recurring, or one time event</i></p>
              <DatePicker
                selected={this.state.date}
                onChange={this.handleChangeDate}
              />
              <hr />
              <button
                 type="submit"
                 className="btn btn-primary"
              >Add task</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
  }
}

export default AddTask;