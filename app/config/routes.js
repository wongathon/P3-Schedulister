import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Template from '../components/Main';
import Home from '../components/Todohome';
import AddTask from '../components/Addtask';
import Admin from '../components/Admin';
import UserAdmin from '../components/UserAdmin';

const createRoutes = () => {
  return (
    <Route path="/" component={Template}>
      <IndexRoute component={Home} />
      <Route path="/addtask" component={AddTask} />
      <Route path="/admin" component={Admin} />
      <Route path="/useradmin" component={UserAdmin} />
    </Route>
  )
};

const Navigation = createRoutes();

export default Navigation;