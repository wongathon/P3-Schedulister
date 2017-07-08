import React, { Component } from "react";

//import other components

class Addtask extends Component {
  constructor() {
    super();
    this.state = {
      desc: "",
      recurs: 'none',
      date: null
    };

    this.submitItem = this.submitItem.bind(this); 
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.taskToAdd !== null) {
      console.log("task added!");
    } else {
      alert("Please fill in the fields!");
    }
  }

  handleChange(event){
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event){
    event.preventDefault();

    var taskObj = this.state;
    
    this.props.setAddItem(taskObj); //ADD TO PARENT
    this.setState({taskToAdd: null});
  }

  render(){
    return(
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
                className="form-control text-center"
                id="desc"
                onChange={this.handleChange}
                required
              />

              <h4>Recurs</h4>
              <p><i>Not required</i></p>
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
                  <input type="radio" value='daily' id='recurs'
                  checked={this.state.recurs === 'daily'}
                  onChange={this.handleChange} />
                  Daily
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value='weekly' id='recurs'
                  checked={this.state.recurs === 'weekly'}
                  onChange={this.handleChange} />
                  Weekly
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value='monthly' id='recurs'
                  checked={this.state.recurs === 'monthly'}
                  onChange={this.handleChange} />
                  Monthly
                </label>
              </div>

              <h4>Date due</h4>
              <p><i>For events, Not required</i></p>
              
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

export default Addtask;