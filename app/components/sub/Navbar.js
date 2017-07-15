// Include React
import React from "react"
import { Route, Link } from 'react-router'

const Navbar = () => {
    return (
      <div>
        <ul className="nav nav-pills nav-stacked">
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/addtask'>Add Task</Link></li>
          <li><Link to='/admin'>Admin</Link></li>
          <li><Link to='/useradmin'>User Admin</Link></li>
        </ul>
      </div>
    )
}

export default Navbar