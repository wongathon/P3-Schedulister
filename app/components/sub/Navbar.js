// Include React
import React from "react"
import { Link } from 'react-router'
import Home from '../Todohome'
import AddTask from '../addtask'
import Admin from '../Admin'
import UserAdmin from '../UserAdmin'

const Navbar = () => {

    return (
      <div>
        <ul className="nav nav-pills nav-stacked">
          <li><Link to='/' component={Home}>Home</Link></li>
          <li><Link to='/addtask' component={AddTask}>Add Task</Link></li>
          <li><Link to='/admin' component={Admin}>Admin</Link></li>
          <li><Link to='/useradmin' component={UserAdmin}>User Admin</Link></li>
        </ul>
      </div>
      
    )
  
}

export default Navbar;