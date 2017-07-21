import React from 'react';
import { HashRouter as Router, Route, Link, Redirect, IndexRoute } from 'react-router-dom';

import Main from '../components/Main';
import Home from '../components/Todohome';
import AddTask from '../components/Addtask';
import Admin from '../components/Admin';
import UserAdmin from '../components/UserAdmin';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

class LoginControl extends React.Component {
  constructor() {
    super();
    this.state = {
      ready: true,
      signedUp: undefined,
      loggedIn: undefined,
      forms: []
    };

    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleSignup(ifSuccess) {
    this.setState({
      signedUp: ifSuccess,
      ready: true
    });
  }

  handleLogin(ifSuccess) {
    this.setState({
      loggedIn: ifSuccess,
      ready: false
    });
  }

  handleLogout() {
    axios.get('/user/logout').then(res => {
      this.setState({ loggedIn: false });
    });
  }

  render() {
    return (
      <Router>
        <div>
          {this.state.ready ? (<div>
          <Route path="/" component={Main}>
            <IndexRoute component={Home} />
            <Route path="/login/user" component={() => (this.state.loggedIn ?
              <Redirect to="/" /> :
              <Login handleResponse={this.handleLogin} />
            )} />
            <Route path="/signup/user" component={({ history }) => (this.state.loggedIn ?
              <Redirect to="/" /> :
              <SignUp history={history} handleResponse={this.handleSignup} />
            )} />
            <Route path="/addtask" component={() => (this.state.loggedIn ?  
              <AddTask /> :
              <Redirect to='/login/user' />
            )} />
            <Route path="/admin" component={() => (this.state.loggedIn ?  
              <Admin /> :
              <Redirect to='/login/user' />
            )} />
            <Route path="/useradmin" component={() => (this.state.loggedIn ?  
              <UserAdmin /> :
              <Redirect to='/login/user' />
            )} />
          </Route>
          </div>) : <div>"Not ready"</div>}
        </div>
      </Router>
    );
  }
}


export default LoginControl;