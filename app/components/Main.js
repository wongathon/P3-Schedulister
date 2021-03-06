// Include React
import React, { Component } from 'react'
import Navbar from './sub/Navbar'

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
              {this.props.children}
            </div>
          </div>
        </div>
    )
  }
}

// Export the component back for use in other files
export default Main;








