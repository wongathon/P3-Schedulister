// Include React
import React from "react"
import { Route, Link } from 'react-router'

const Navbar = () => {
    return (
      <div>
        <h3 className="appTitle">Schedulister</h3>
        <ul className="nav nav-pills nav-stacked">
          <li><Link to='/'>To-Do List</Link></li>
          <li><Link to='/addtask'>Add a Todo</Link></li>
          <li><Link to='/admin'>My Todos Admin</Link></li>
          <li><Link to='/useradmin'>My Profile</Link></li>
        </ul>
      </div>
    )
}

export default Navbar