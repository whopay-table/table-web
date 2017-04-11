
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
