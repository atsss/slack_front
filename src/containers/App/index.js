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
import Sidebar from '../../components/Sidebar';
import Room from '../Room';

type Props = {
  authenticate: () => void,
  unauthenticate: () => void,
  isAuthenticated: boolean,
  willAuthenticate: boolean,
  currentUserRooms: Array,
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
    const { isAuthenticated, willAuthenticate, currentUserRooms } = this.props;
    const authProps = { isAuthenticated, willAuthenticate };

    return (
      <Router history={history}>
        <div style={{ display: 'flex', flex: '1' }}>
          {isAuthenticated &&
            <Sidebar
              rooms={currentUserRooms}
            />
          }
          <Switch>
            <MatchAuthenticated exact path="/" component={Home} {...authProps} />
            <RedirectAuthenticated path="/login" component={Login} {...authProps} />
            <RedirectAuthenticated path="/signup" component={Signup} {...authProps} />
            <MatchAuthenticated path="/r/:id" component={Room} {...authProps} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    willAuthenticate: state.session.willAuthenticate,
    currentUserRooms: state.rooms.currentUserRooms,
  }),
  { authenticate, unauthenticate }
)(App);
