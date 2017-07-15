//Get React dependencies
import React, { PropTypes } from 'react';
//Get React dependencies
import { Link } from 'react-router';
//Get React styling modules
import Input from 'react-toolbox/lib/input';
import {Button} from 'react-toolbox/lib/button';

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
//Need to figure out icon if any
  <div className="container">
    <form className="form-signin"  action="/" onSubmit={onSubmit}>
      <h2 className="form-signin-heading">Welcome to Get it Done!</h2>
      <Link href="{'/signup'}" label= "Need an account? Click here to sign up!" />
      <br/>      

      <Input type="text" label="Enter username" name="username" errorText={errors.username} onChange={onChange} value={user.username} id="username" icon='account_circle' maxLength={10}/> 
      <br/>

      <Input type="text" label="Enter new password (min. 6 characters)" name="password" errorText={errors.password} onChange={onChange} value={user.password} id="password" /> 
      <br/>
    </form>
  </div>
 
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;