// @flow
import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../../histroy';
import Home from '../Home';
import NotFound from '../../components/NotFound';
import Login from '../Login';
import Signup from '../Signup';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch style={{ display: 'flex', flex: '1' }}>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
