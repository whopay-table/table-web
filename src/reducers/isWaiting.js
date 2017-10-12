import * as ActionTypes from 'src/constants/ActionTypes';

export default function isWaiting(state = {}, action) {
  switch (action.type) {
    case ActionTypes.CREATE_GROUP.request:
      return Object.assign({}, state, { createGroup: true });

    case ActionTypes.CREATE_GROUP.success:
      return Object.assign({}, state, { createGroup: false });

    case ActionTypes.CREATE_GROUP.failure:
      return Object.assign({}, state, { createGroup: false });

    default:
      return state;
  }
}
