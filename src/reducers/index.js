import { combineReducers } from 'redux';
import * as ActionTypes from '../constants/ActionTypes';

function groupIndexes(state = {}, action) {
  switch (action.type) {
    case ActionTypes.GET_GROUP_INDEX.success:
      console.log('response', action);
      return Object.assign({}, state, {
        [action.params.groupname]: action.response.groupId
      });
    case ActionTypes.GET_GROUP_INDEX.failure:
      console.log('failure', action);
      return state;
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
