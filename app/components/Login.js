import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import axios from 'axios';

class Loginv2 extends React.Component {
  constructor() {
    super();
    this.state = {
    	username: '',
    	password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
  	e.preventDefault();
    this.setState({[e.target.name]: e.target.value},  function() {
 		 console.log(this.state);});
     }

  
  handleSubmit(e){
    e.preventDefault();
    const { username, email, password, passwordc } = this.state;
    var body = {}
    body={
     username:username,
     password: password,
    }
    console.log("hello");
    console.log(body);
    axios.post('/login/user', body);
  } 
  

  render() {
    return (
      <div className="panel panel-default" onSubmit={this.handleSubmit} action="/login/user" method="post">
      <div className="panel-heading">
        <h3 className="panel-title">Welcome!</h3>
      </div>
      <div className="panel-body">
        <form className="panel1" onSubmit={this.handleSubmit} >
        <div className="form-group">
          <label>
            Please enter your username
            <input type="text"  className="form-control" name='username' value={this.state.username} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
            Please enter your password:
            <input type="password"  className="form-control" name='password' value={this.state.password} onChange={this.handleChange} />
          </label>
          <br/>
            <button type="submit" className="btn btn-primary">Login</button>  &nbsp;
            <button type="reset" className="btn btn-danger"><a href="/">Cancel</a></button> 
          <br/>
          <hr/>
          <a className="linker" href="/#/signup/user">Click here to create a new account</a>
          
         </div>
        </form>
      </div>
      </div>

    );
  }
}

export default Loginv2;