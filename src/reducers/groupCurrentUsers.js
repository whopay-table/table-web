import * as ActionTypes from 'src/constants/ActionTypes';

export default function groupCurrentUsers(state = {}, action) {
  switch (action.type) {
    case ActionTypes.GET_CURRENT_USER.request:
      return Object.assign({}, state, {
        [action.params._groupId]: undefined
      });

    case ActionTypes.GET_CURRENT_USER.success:
      return Object.assign({}, state, {
        [action.params._groupId]: action.response
      });

    case ActionTypes.GET_CURRENT_USER.failure:
      return Object.assign({}, state, {
        [action.params._groupId]: null
      });

    case ActionTypes.UPDATE_USER.success:
      return Object.assign({}, state, {
        [action.params._groupId]: action.response
      });

    default:
      return state;
  }
}
