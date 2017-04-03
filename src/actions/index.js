
import * as ActionTypes from '../constants/ActionTypes';

export const getGroupIndex = groupname => (dispatch, getState) => {
  return dispatch({
    API_REQUEST: {
      type: ActionTypes.GET_GROUP_INDEX,
      method: 'GET',
      endpoint: '/groups',
      params: {
        groupname: groupName
      }
    }
  });
};
