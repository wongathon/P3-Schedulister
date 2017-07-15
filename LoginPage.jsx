//Get dependencies
import React, { PropTypes } from 'react';
//Get styling modules
import Dialog from 'react-toolbox/lib/dialog';
import {Button} from 'react-toolbox/lib/button';
//Calling child
import LoginForm from './sub/LoginForm.jsx';

class Login extends Component {
  //may need to add context in constructor and super?
  constructor(props){
    super(props);
    this.state= {
      error:{},
      active: false,
      user: {
	      username:'',
	      password:'',
	     }
  	};
//Function for form if active is true
 handleToggle = () => {
    this.setState({active: !this.state.active});
  }

//Form buttons: add api
 actions = [
    { label: "Join", onClick: this.handleToggle },
    { label: "Cancel", onClick: this.handleToggle }
  ];

//binding props
  this.signIn = this.signIn.bind(this);
  this.currentUser = this.currentUser.bind(this);

//Create seasoned user
  currentUser(event) {
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({
      user
    });
  }

//Logging in
  signIn(event) {//may remove encodeURIComponent
    const username= encodeURIComponent(this.state.username);
    const password=encodeURIComponent(this.state.user.password);
    //may remove formData
    const formData = `username=${username}&password=${password}`;
  }

//AJAX Request: mayberemoved
  const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/signup');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      // success
      if (xhr.status === 200) {
         // change the component-container state
        this.setState({
          errors: {}
        });
        // set a message
        localStorage.setItem('successMessage', xhr.response.message);
        // make a redirect
        this.context.router.replace('/login');
      } 
      // failure
      else {
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;
        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }

//results
  render() {
  	return(
      <div>
        <Button label='Login' onClick={this.handleToggle} />
        <Dialog 
          actions={this.actions}
          active={this.state.active}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          title='Welcome and Sign Up'
        >
    		<SignInForm
          onSubmit={this.signIn}
          onChange={this.currentUser}
          errors={this.state.errors}
          user={this.state.user}
        />
        </Dialog>
      </div>
  		)
  }
}
}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginPage;