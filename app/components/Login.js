import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';

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
    let url=window.location.href;
    console.log(url);
    let userData = {}
    userData.method ='POST'
    userData.headers ['Accept']='application/json'
    userData.headers ['Content-Type'] ='application/json'
    userData.bodyc = JSON.stringify({
      username: this.state.username,
      password: this.state.password
      })
    fetch(url, userData).then(function(response) {
      return response.json()})
      .then(function(jsonData) {
        return jsonData
      })
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
            <button type="submit" className="btn btn-danger">Cancel</button> 
          <br/>
          <a href="/#/signup/user">Click here to create a new account</a>
        </div>
        </form>
      </div>
      </div>

    );
  }
}

export default Loginv2;