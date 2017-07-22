// Include React
import React from "react"
import { Route, Link } from 'react-router'

const Navbar = () => {
    return (
      <div>
        <h3 className="appTitle">Schedulister</h3>
        <ul className="nav nav-pills nav-stacked">
          <li><Link to='/'><i className="fa fa-tasks pull-right" aria-hidden="true"></i>To-do List</Link></li>
          <li><Link to='/addtask'><i className="fa fa-plus pull-right" aria-hidden="true"></i>Add a To-do</Link></li>
          <li><Link to='/admin'><i className="fa fa-pencil pull-right" aria-hidden="true"></i>My To-do Admin</Link></li>
          <li><Link to='/useradmin'><i className="fa fa-user pull-right" aria-hidden="true"></i>My Profile</Link></li>
        </ul>
      </div>
    )
}

export default Navbar