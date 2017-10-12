import * as ActionTypes from 'src/constants/ActionTypes';

function filterGroupUsers(group) {
  const filteredGroup = Object.assign({}, group);
  filteredGroup.users = filteredGroup.users.filter(u => !u.isDisabled);
  return filteredGroup;
}

export default function groups(state = {}, action) {
  switch (action.type) {
    case ActionTypes.GET_GROUP.request:
      return Object.assign({}, state, {
        [action.params._id]: undefined
      });

    case ActionTypes.GET_GROUP.success:
      return Object.assign({}, state, {
        [action.params._id]: filterGroupUsers(action.response)
      });

    case ActionTypes.GET_GROUP.failure:
      return Object.assign({}, state, {
        [action.params._id]: null
      });

    default:
      return state;
  }
}
