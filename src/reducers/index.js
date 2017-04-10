import { combineReducers } from 'redux';
import * as ActionTypes from '../constants/ActionTypes';

function groupIndexes(state = {}, action) {
  switch (action.type) {
    case ActionTypes.GET_GROUP_INDEX.request:
      return Object.assign({}, state, {
        [action.params.groupname]: undefined
      });

    case ActionTypes.GET_GROUP_INDEX.success:
      return Object.assign({}, state, {
        [action.params.groupname]: action.response.id
      });

    case ActionTypes.GET_GROUP_INDEX.failure:
      return Object.assign({}, state, {
        [action.params.groupname]: null
      });

    case ActionTypes.CREATE_GROUP.success:
      return Object.assign({}, state, {
        [action.response.groupname]: action.response.id
      });

    default:
      return state;
  }
}

function groups(state = {}, action) {
  switch (action.type) {
    case ActionTypes.GET_GROUP.request:
      return Object.assign({}, state, {
        [action.params._id]: undefined
      });

    case ActionTypes.GET_GROUP.success:
      return Object.assign({}, state, {
        [action.params._id]: action.response
      });

    case ActionTypes.GET_GROUP.failure:
      return Object.assign({}, state, {
        [action.params._id]: null
      });

    default:
      return state;
  }
}

function groupSessions(state = {}, action) {
  switch (action.type) {
    case ActionTypes.LOGIN.request:
      return Object.assign({}, state, {
        [action.params._groupId]: undefined
      });

    case ActionTypes.LOGIN.success:
      return Object.assign({}, state, {
        [action.params._groupId]: action.response.token
      });

    case ActionTypes.LOGIN.failure:
      return Object.assign({}, state, {
        [action.params._groupId]: false
      });

    case ActionTypes.LOGOUT.success:
      return Object.assign({}, state, {
        [action.params._groupId]: null
      });

    default:
      return state;
  }
}

const entities = combineReducers({
  groupIndexes,
  groups,
  groupSessions
});

const app = combineReducers({
  entities
});

export default app;
