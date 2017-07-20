import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import axios from 'axios';

const user= {
	username: '',
	email:'',
	password: '',
	passwordc: ''
};
class SignUp extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
    	username: '',
    	email: '',
    	password: '',
    	passwordc: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
  	event.preventDefault();
    this.setState({[event.target.name]: event.target.value},  function() {
 		 console.log(this.state);});
     }



  handleSubmit(event) {
  	event.preventDefault();
    const { username, email, password, passwordc } = this.state;
    var body = {}
    body={
     username:username,
     email: email,
     password: password,
     passwordc: passwordc
    }
    console.log("hello");
    console.log(body);
    axios.post('/signup/user', body)
  } 

    
  
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Welcome!</h3>
        </div>
        <div className="panel-body">
          <form action="/signup/user"  onSubmit={this.handleSubmit} method="POST">
            <div className="form-group">
              <label>
                Please enter a username for your account:
                <input type="text" className="form-control" name='username' value={this.state.username} onChange={this.handleChange} />
              </label>
              <br/>
              <label>
                Please enter your email address:
                <input type="email" className="form-control" name='email' value={this.state.email} onChange={this.handleChange} />
              </label>
              <br/>
              <label>
                Create a password:
                <input type="password" className="form-control" name='password' value={this.state.password} onChange={this.handleChange} />
              </label>
              <br/>
              <label>
                Confirm password:
                <input type="password" className="form-control" name='passwordc' value={this.state.passwordc} onChange={this.handleChange} />
              </label>
              <br/>
              <button type="submit" className="btn btn-primary">Create Account</button>  &nbsp;
              <button type="submit" className="btn btn-danger">Cancel</button> 
              <br/>
              <button><a href="/#/login/user">Already have an account? Click here to Login</a></button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;