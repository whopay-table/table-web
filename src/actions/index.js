
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
