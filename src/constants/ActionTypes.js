
const getRequestActionTypes = actionType => ({
  request: `${actionType}:REQUEST`,
  success: `${actionType}:SUCCESS`,
  failure: `${actionType}:FAILURE`
});

export const GET_GROUP_INDEX = getRequestActionTypes('GET_GROUP_INDEX');
export const CREATE_GROUP = getRequestActionTypes('CREATE_GROUP');
export const CREATE_USER = getRequestActionTypes('CREATE_USER');
export const UPDATE_USER = getRequestActionTypes('UPDATE_USER');
export const DESTROY_USER = getRequestActionTypes('DESTROY_USER');
export const RESET_USER_PASSWORD = getRequestActionTypes('RESET_USER_PASSWORD');
export const GET_GROUP = getRequestActionTypes('GET_GROUP');
export const GET_USER_ID_BY_EMAIL = getRequestActionTypes('GET_USER_ID_BY_EMAIL');
export const GET_CURRENT_USER = getRequestActionTypes('GET_CURRENT_USER');
export const GET_TRANSACTIONS = getRequestActionTypes('GET_TRANSACTIONS');
export const GET_USER_TRANSACTIONS = getRequestActionTypes('GET_USER_TRANSACTIONS');
export const CREATE_TRANSACTION = getRequestActionTypes('CREATE_TRANSACTION');
export const ACCEPT_TRANSACTION = getRequestActionTypes('ACCEPT_TRANSACTION');
export const REJECT_TRANSACTION = getRequestActionTypes('REJECT_TRANSACTION');
export const LOGIN = getRequestActionTypes('LOGIN');
export const LOGOUT = getRequestActionTypes('LOGOUT');
