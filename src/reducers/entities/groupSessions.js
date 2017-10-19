import * as ActionTypes from 'src/constants/ActionTypes';
import * as storage from 'src/lib/storage';

export default function groupSessions(state = {}, action) {
  switch (action.type) {
    case ActionTypes.LOGIN.request:
      return Object.assign({}, state, {
        [action.params._groupId]: undefined
      });

    case ActionTypes.LOGIN.success:
      storage.setItem(`table-session-${action.params._groupId}`, action.response.token);
      return Object.assign({}, state, {
        [action.params._groupId]: action.response.token
      });

    case ActionTypes.LOGIN.failure:
      return Object.assign({}, state, {
        [action.params._groupId]: false
      });

    case ActionTypes.LOGOUT.success:
      storage.removeItem(`table-session-${action.params._groupId}`);
      return Object.assign({}, state, {
        [action.params._groupId]: null
      });

    case ActionTypes.DESTROY_USER.success:
      storage.removeItem(`table-session-${action.params._groupId}`);
      return Object.assign({}, state, {
        [action.params._groupId]: null
      });

    case ActionTypes.GET_GROUP.success:
      return Object.assign({}, state, {
        [action.params._id]: action.params._token
      });

    case ActionTypes.GET_GROUP.failure:
      return Object.assign({}, state, {
        [action.params._id]: null
      });

    default:
      return state;
  }
}
