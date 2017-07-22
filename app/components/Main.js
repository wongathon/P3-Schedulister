// Include React
import React, { Component } from 'react'
import Navbar from './sub/Navbar'
import { Link } from 'react-router'

// Create the Main component
class Main extends Component {

  // Here we render the App component
  render () {

    return (
        <div className="container">
          <div className="row">
            <div className="col-md-3 no-float">
             <Navbar />
            </div>
            <div className="col-md-8 no-float">
              <nav className="nav justify-content-end pull-right">
                <Link to='/'><u>Logout</u></Link>{' '}
                <Link to='/login/user'><u>Login</u></Link>{' '}
                <Link to='/signup/user'><u>Create Account</u></Link>
              </nav>
              {this.props.children}
            </div>
          </div>
        </div>
    )
  }
}

// Export the component back for use in other files
export default Main;








