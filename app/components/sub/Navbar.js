// Include React
import React from "react"
import { Route, Link } from 'react-router'

const Navbar = () => {
    return (
      <div>
        <h3 className="appTitle">Schedulister{' '}<i className="fa fa-check-square-o"></i></h3>
        <ul className="nav nav-pills nav-stacked">
<<<<<<< HEAD
          <li><Link to='/'><i className="fa fa-tasks pull-right" aria-hidden="true"></i>To-do List</Link></li>
          <li><Link to='/addtask'><i className="fa fa-plus pull-right" aria-hidden="true"></i>Add a To-do</Link></li>
          <li><Link to='/admin'><i className="fa fa-pencil pull-right" aria-hidden="true"></i>My To-do Admin</Link></li>
          <li><Link to='/useradmin'><i className="fa fa-user pull-right" aria-hidden="true"></i>My Profile</Link></li>
=======
          <li><Link to='/'>My To-do List</Link></li>
          <li><Link to='/addtask'>Add a To-do</Link></li>
          <li><Link to='/admin'>My To-dos Admin</Link></li>
          <li><Link to='/useradmin'>My Profile</Link></li>
>>>>>>> e2ec5f622d9304bdc3e40f63db50a67393f5e452
        </ul>
      </div>
    )
}

export default Navbar