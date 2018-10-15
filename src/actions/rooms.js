import api from '../api';
import history from '../histroy'

export function fetchRooms() {
  return dispatch => api.fetch('/rooms')
    .then((response) => {
      dispatch({ type: 'FETCH_ROOMS_SUCCESS', response });
    });
}

export function fetchUserRooms(userId) {
  return dispatch => api.fetch(`/users/${userId}/rooms`)
    .then((response) => {
      dispatch({ type: 'FETCH_USER_ROOMS_SUCCESS', response });
    });
}

export function createRoom(data, router) {
  return dispatch => api.post('/rooms', data)
    .then((response) => {
      dispatch({ type: 'CREATE_ROOM_SUCCESS', response });
      history.push(`/r/${response.data.id}`);
    });
}

export function joinRoom(roomId, router) {
  return dispatch => api.post(`/rooms/${roomId}/join`)
    .then((response) => {
      dispatch({ type: 'ROOM_JOINED', response });
      history.push(`/r/${response.data.id}`);
    });
}
