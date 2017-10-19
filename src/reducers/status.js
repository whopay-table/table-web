import * as ActionTypes from 'src/constants/ActionTypes';

export default function status(state = {}, action) {
  switch (action.type) {
    case ActionTypes.GET_TRANSACTIONS.success:
      if (action.response.length > 0) {
        return state;
      } else {
        return Object.assign({}, state, {
          isOutOfTransactions: Object.assign({}, state.isOutOfTransactions, {
            [action.params._groupId]: true,
          }),
        });
      }
    default:
      return state;
  }
}
