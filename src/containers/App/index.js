// @flow
import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../../histroy';
import { connect } from 'react-redux';
import { authenticate } from '../../actions/session';
import Home from '../Home';
import NotFound from '../../components/NotFound';
import Login from '../Login';
import Signup from '../Signup';

type Props = {
  authenticate: () => void,
}

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.props.authenticate();
    }
  }

  props: Props

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

export default connect(
  null,
  { authenticate }
)(App);
