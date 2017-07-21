// Include React
import React from "react"
import { Route, Link } from 'react-router'

const Navbar = () => {
    return (
      <div>
        <h3 className="appTitle"><i className="fa fa-check-square-o"></i>Schedulister</h3>
        <ul className="nav nav-pills nav-stacked">
          <li><Link className="sidebar" to='/'>To-Do List</Link></li>
          <li><Link className="sidebar" to='/addtask'>Add a Todo</Link></li>
          <li><Link className="sidebar" to='/admin'>My Todos Admin</Link></li>
          <li><Link className="sidebar" to='/useradmin'>My Profile</Link></li>
        </ul>
        <br/>
      </div>
    )
}

export default Navbar