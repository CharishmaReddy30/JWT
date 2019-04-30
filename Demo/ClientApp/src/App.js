import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { NavMenu } from './components/NavMenu';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Welcome } from './components/Welcome';
import { Logout } from './components/Logout'

export default class App extends Component {
  displayName = App.name

  render() {
      return (
          <div>
              <NavMenu/>
              <Switch>
                  <Route exact path='/login' component={Login} />
                  <Route path='/register' component={Register} />
                  <Route path='/welcome' component={Welcome} />
                  <Route path='/logout' component={Logout} />
                  <Redirect from="/" exact to="/login" />
              </Switch>
          </div>
    );
  }
}
