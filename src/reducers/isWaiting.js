import * as ActionTypes from 'src/constants/ActionTypes';

const WAITING_STATE_ACTION_TYPE_MAP = {
  createGroup: ActionTypes.CREATE_GROUP,
  createTransaction: ActionTypes.CREATE_TRANSACTION,
  createUser: ActionTypes.CREATE_USER,
  destroyUser: ActionTypes.DESTROY_USER,
  updateUser: ActionTypes.UPDATE_USER,
  login: ActionTypes.LOGIN,
  logout: ActionTypes.LOGOUT,
};

export default function isWaiting(state = {}, action) {
  for (const stateKey of Object.keys(WAITING_STATE_ACTION_TYPE_MAP)) {
    const actionType = WAITING_STATE_ACTION_TYPE_MAP[stateKey];
    switch (action.type) {
      case actionType.request:
        return Object.assign({}, state, { [stateKey]: true });
      case actionType.success:
      case actionType.failure:
        return Object.assign({}, state, { [stateKey]: false });
      default:
    }
  }
  switch (action.type) {
    default:
      return state;
  }
}
