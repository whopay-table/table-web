import * as ActionTypes from 'src/constants/ActionTypes';

export default function groupUserIdsByEmails(state = {}, action) {
  switch (action.type) {
    case ActionTypes.GET_USER_ID_BY_EMAIL.request:
      return Object.assign({}, state, {
        [action.params.email]: undefined
      });

    case ActionTypes.GET_USER_ID_BY_EMAIL.success:
      return Object.assign({}, state, {
        [action.params.email]: action.response.id
      });

    case ActionTypes.GET_USER_ID_BY_EMAIL.failure:
      return Object.assign({}, state, {
        [action.params.email]: null
      });

    case ActionTypes.CREATE_USER.success:
      return Object.assign({}, state, {
        [action.response.email]: action.response.id
      });

    default:
      return state;
  }
}
