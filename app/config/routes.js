import React from "react";
import { Route, IndexRoute, Router, browserHistory } from "react-router";

import Main from '../components/Main';
import Todohome from '../components/Todohome';
import Admin from '../components/Admin';
import Addtask from '../components/Addtask';
import UserAdmin from '../components/UserAdmin';

const routes = (
  <Router history={broserHisotry}>
    <Route path="/" component={Main}>
      <Route path="admin" component={Admin} />
      <Route path="add" component={Addtask} />
      <Route path="user" component={UserAdmin} />
      <IndexRoute component={Todohome} />
    </Route>
  </Router>
);

export default routes;
