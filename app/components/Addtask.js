import React, { Component } from 'react';
import API from "../utils/api";
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class AddTask extends Component {
  constructor() {
    super();
    this.state = {
      desc : "",
      recurs: "",
      recurEvery: "",
      repeatEvery: "",
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
    var taskObj = this.state;
    //add this.props.parent method in Admin tab. 
    API.saveTask(taskObj).then();
    //console.log(taskObj);
    this.setState({
      desc : "",
      recurs: "",
      recurEvery: "",
      repeatEvery: "",
      date: moment()
    });
    //execute axios add task w/API. 
  } 

  render() {
    return (
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
                 <input type="radio" value='days' id='recurs'
                 checked={this.state.recurs === 'days'}
                 onChange={this.handleChange} />
                 Daily
               </label>
             </div>
             <div className="radio">
               <label>
                 <input type="radio" value='weeks' id='recurs'
                 checked={this.state.recurs === 'weeks'}
                 onChange={this.handleChange} />
                 Weekly
               </label>
             </div>
             <div className="radio">
               <label>
                 <input type="radio" value='months' id='recurs'
                 checked={this.state.recurs === 'months'}
                 onChange={this.handleChange} />
                 Monthly
               </label>
             </div>

              <h4>Recur every{' '}
                <input type="text" pattern="[\d*]" 
                  onInput={this.handleChange}
                  size="2"
                  id="recurEvery"
                  value={this.state.recurEvery} />
                {this.state.recurs  === "none" ? "" : this.state.recurs}.
              </h4>

              <h4>Repeat for{' '}
                <input type="text" pattern="[\d*]"
                  onInput={this.handleChange}
                  size="2"
                  id="repeatEvery"
                  value={this.state.repeatEvery} />
                  {this.state.recurs === "none" ? "" : this.state.recurs}.
              </h4>

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
    );
  }
}

export default AddTask;