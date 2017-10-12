import * as ActionTypes from 'src/constants/ActionTypes';

export default function groupUserTransactionLists(state = {}, action) {
  switch (action.type) {
    case ActionTypes.GET_USER_TRANSACTIONS.request:
      return state;

    case ActionTypes.GET_USER_TRANSACTIONS.success:
      return Object.assign({}, state, {
        [action.params._groupId]: action.response
      });

    case ActionTypes.GET_USER_TRANSACTIONS.failure:
      return state;

    default:
      return state;
  }
}
