//Get React dependencies
import React, { PropTypes } from 'react';
//Get React dependencies
import { Link } from 'react-router';
//Get React styling modules
import Input from 'react-toolbox/lib/input';
import {Button} from 'react-toolbox/lib/button';

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (

  <div className="container">
    <form className="form-signin"  action="/" onSubmit={onSubmit}>
      <h2 className="form-signin-heading">Welcome to Get it Done!</h2>
      <Link href="{'/login'}" label= "Have an account? Click here to sign in!" />
      <br/>      

      <Input type="text" label="Enter username" name="username" errorText={errors.username} onChange={onChange} value={user.username} id="username" icon='account_circle' maxLength={10}/> 
      <br/>

      <Input type="email" label="Enter valid email" name="email" errorText={errors.email} onChange={onChange} value={user.email} id="email" icon='email'/> 
      <br/>

      <Input type="text" label="Enter new password (min. 6 characters)" name="password" errorText={errors.password} onChange={onChange} value={user.password} id="password" /> 
      <br/>

       <Input type="text" label="Confirm password" name="passwordc" errorText={errors.passwordc} onChange={onChange} value={user.passwordc} id="passwordc" /> 
      <br/>
    </form>
  </div>
 
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;