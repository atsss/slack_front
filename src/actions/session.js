import { reset } from 'redux-form';
import api from '../api';
import history from '../histroy'

function setCurrentUser(dispatch, response) {
  localStorage.setItem('token', JSON.stringify(response.meta.token));
  dispatch({ type: 'AUTHENTICATION_SUCCESS', response });
}

export function login(data, router) {
  return dispatch => api.post('/sessions', data)
    .then((response) => {
      setCurrentUser(dispatch, response);
      dispatch(reset('login'));
      history.push('/');
    });
}

export function signup(data, router) {
  return dispatch => api.post('/users', data)
    .then((response) => {
      setCurrentUser(dispatch, response);
      dispatch(reset('signup'));
      history.push('/');
    });
}

export function logout(router) {
  return dispatch => api.delete('/sessions')
    .then(() => {
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
      router.transitionTo('/login');
    });
}
