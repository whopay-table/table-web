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

const entities = combineReducers({
  groupIndexes
});

const app = combineReducers({
  entities
});

export default app;
