// @flow
import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../../histroy';
import { connect } from 'react-redux';
import { authenticate, unauthenticate } from '../../actions/session';
import Home from '../Home';
import NotFound from '../../components/NotFound';
import Login from '../Login';
import Signup from '../Signup';
import MatchAuthenticated from '../../components/MatchAuthenticated';
import RedirectAuthenticated from '../../components/RedirectAuthenticated';

type Props = {
  authenticate: () => void,
  unauthenticate: () => void,
  isAuthenticated: boolean,
  willAuthenticate: boolean,
}

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.props.authenticate();
    } else {
      this.props.unauthenticate();
    }
  }

  props: Props

  render() {
    const { isAuthenticated, willAuthenticate } = this.props;
    const authProps = { isAuthenticated, willAuthenticate };

    return (
      <Router history={history}>
        <Switch style={{ display: 'flex', flex: '1' }}>
          <MatchAuthenticated exact path="/" component={Home} {...authProps} />
          <RedirectAuthenticated path="/login" component={Login} {...authProps} />
          <RedirectAuthenticated path="/signup" component={Signup} {...authProps} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    willAuthenticate: state.session.willAuthenticate,
  }),
  { authenticate, unauthenticate }
)(App);
