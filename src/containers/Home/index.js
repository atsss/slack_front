// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/session';
import Navbar from '../../components/Navbar';

// import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faGhost } from '@fortawesome/free-solid-svg-icons'
//
// library.add(faGhost)

type Props = {
  logout: () => void,
  currentUser: Object,
  isAuthenticated: boolean,
}

class Home extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleLogout = () => this.props.logout(this.context.router);

  render() {
    const { currentUser, isAuthenticated } = this.props;

    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
        {isAuthenticated &&
          <div>
            <span>{currentUser.username}</span>
          </div>
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.currentUser,
  }),
  { logout }
)(Home);
