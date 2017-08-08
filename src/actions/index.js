
import * as ActionTypes from '../constants/ActionTypes';

export const getGroupIndex = groupname => (dispatch, getState) => {
  return dispatch({
    API_REQUEST: {
      type: ActionTypes.GET_GROUP_INDEX,
      method: 'GET',
      endpoint: '/groups',
      params: {
        groupname: groupname
      }
    }
  });
};

export const createGroup = params => (dispatch, getState) => {
  return dispatch({
    API_REQUEST: {
      type: ActionTypes.CREATE_GROUP,
      method: 'POST',
      endpoint: '/groups',
      params: params
    }
  });
};

export const createUser = params => (dispatch, getState) => {
  return dispatch({
    API_REQUEST: {
      type: ActionTypes.CREATE_USER,
      method: 'POST',
      endpoint: `/groups/${params.groupId}/users`,
      params: {
        'user[email]': params['user[email]'],
        'user[username]': params['user[username]'],
        'user[name]': params['user[name]'],
        'user[password]': params['user[password]'],
        'user[password_confirmation]': params['user[password_confirmation]'],
        'user[account_info]': params['user[account_info]'],
        'group_id': params.groupId,
        'group_signup_key': params.groupSignupKey
      }
    }
  });
};

export const getGroup = id => (dispatch, getState) => {
  const token = getState().entities.groupSessions[id] || localStorage.getItem(`table-session-${id}`);
  return dispatch({
    API_REQUEST: {
      type: ActionTypes.GET_GROUP,
      method: 'GET',
      endpoint: `/groups/${id}`,
      params: {
        _id: id,
        _token: token
      },
      token: token
    }
  });
};

export const getUserIdByEmail = params => (dispatch, getState) => {
  return dispatch({
    API_REQUEST: {
      type: ActionTypes.GET_USER_ID_BY_EMAIL,
      method: 'GET',
      endpoint: `/groups/${params.groupId}/users`,
      params: {
        email: params.email,
        group_signup_key: params.groupSignupKey
      }
    }
  });
}

export const getUserIdByUsername = params => (dispatch, getState) => {
  return dispatch({
    API_REQUEST: {
      type: ActionTypes.GET_USER_ID_BY_USERNAME,
      method: 'GET',
      endpoint: `/groups/${params.groupId}/users`,
      params: {
        username: params.username,
        group_signup_key: params.groupSignupKey
      }
    }
  });
}

export const getCurrentUser = params => (dispatch, getState) => {
  const groupId = params.groupId;
  const token = getState().entities.groupSessions[groupId] || localStorage.getItem(`table-session-${groupId}`);
  return dispatch({
    API_REQUEST: {
      type: ActionTypes.GET_CURRENT_USER,
      method: 'GET',
      endpoint: `/groups/${params.groupId}/users/me`,
      params: {
        _groupId: params.groupId
      },
      token: token
    }
  });
};

export const createTransaction = params => (dispatch, getState) => {
  const groupId = params.groupId;
  const token = getState().entities.groupSessions[groupId];
  return dispatch({
    API_REQUEST: {
      type: ActionTypes.CREATE_TRANSACTION,
      method: 'POST',
      endpoint: `/groups/${params.groupId}/transactions`,
      params: params,
      token: token
    }
  });
};

export const acceptTransaction = params => (dispatch, getState) => {
  const groupId = params.groupId;
  const token = getState().entities.groupSessions[groupId];
  return dispatch({
    API_REQUEST: {
      type: ActionTypes.ACCEPT_TRANSACTION,
      method: 'POST',
      endpoint: `/groups/${params.groupId}/transactions/${params.transactionId}/accept`,
      params: params,
      token: token
    }
  });
};

export const rejectTransaction = params => (dispatch, getState) => {
  const groupId = params.groupId;
  const token = getState().entities.groupSessions[groupId];
  return dispatch({
    API_REQUEST: {
      type: ActionTypes.REJECT_TRANSACTION,
      method: 'POST',
      endpoint: `/groups/${params.groupId}/transactions/${params.transactionId}/reject`,
      params: params,
      token: token
    }
  });
};

export const getTransactions = params => (dispatch, getState) => {
  const groupId = params.groupId;
  const token = getState().entities.groupSessions[groupId] || localStorage.getItem(`table-session-${groupId}`);
  return dispatch({
    API_REQUEST: {
      type: ActionTypes.GET_TRANSACTIONS,
      method: 'GET',
      endpoint: `/groups/${params.groupId}/transactions`,
      params: {
        _groupId: params.groupId,
        offset: params.offset,
        count: params.count
      },
      token: token
    }
  });
};

export const login = params => (dispatch, getState) => {
  return dispatch({
    API_REQUEST: {
      type: ActionTypes.LOGIN,
      method: 'POST',
      endpoint: `/groups/${params.groupId}/login`,
      params: {
        _groupId: params.groupId,
        email: params.email,
        password: params.password
      }
    }
  });
};

export const logout = params => (dispatch, getState) => {
  return dispatch({
    API_REQUEST: {
      type: ActionTypes.LOGOUT,
      method: 'POST',
      endpoint: `/groups/${params.groupId}/logout`,
      params: {
        _groupId: params.groupId
      },
      token: getState().entities.groupSessions[params.groupId]
    }
  });
};
