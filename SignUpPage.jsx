//Get React dependencies
import React, { PropTypes } from 'react';
//Get React styling modules
import Dialog from 'react-toolbox/lib/dialog';
import {Button} from 'react-toolbox/lib/button';
//Calling child
import SignUpForm from './sub/SignUpForm.jsx';


class SignUpPage extends Component {
  constructor(props){
    super(props);
    this.state= {
      error:{},
      active: false,
      user: {
	      username:'',
	      password:'',
	      password:'',	      
	      email:''
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
  this.signUp = this.signUp.bind(this);
  this.newUser = this.newUser.bind(this);

//Create new user
  newUser(event) {
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({
      user
    });
  }
//Create entries for database
  signUp(event) {//may remove encodeURIComponent
    const username= encodeURIComponent(this.state.username);
    const email= encodeURIComponent(this.state.user.email);
    const password=encodeURIComponent(this.state.user.password);
    const passwordc=encodeURIComponent(this.state.user.passwordc);
    //may remove formData
    const formData = `username=${username}&email=${email}&password=${password}&passwordc=${passwordc}`;
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
        <Button label='Sign Up' onClick={this.handleToggle} />
        <Dialog 
          actions={this.actions}
          active={this.state.active}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          title='Welcome and Sign Up'
        >
      		<SignUpForm
            onSubmit={this.signUp}
            onChange={this.newUser}
            errors={this.state.errors}
            user={this.state.user}
          />
        </Dialog>
      </div>
  		)
  }
}
}

//ensure router is called
SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SignUpPage;