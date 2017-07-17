// Include React
import React from "react"
import { Route, Link } from 'react-router'

const Navbar = () => {
    return (
      <div>
        <ul className="nav nav-pills nav-stacked">
          <li><Link to='/'>Todos</Link></li>
          <li><Link to='/addtask'>Add a Todo</Link></li>
          <li><Link to='/admin'>My Todos Admin</Link></li>
          <li><Link to='/useradmin'>My Profile</Link></li>
        </ul>
      </div>
    )
}

export default Navbar