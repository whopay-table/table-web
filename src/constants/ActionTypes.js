
function getRequestActionTypes(actionType) {
  return {
    request: `${actionType}:REQUEST`,
    success: `${actionType}:SUCCESS`,
    failure: `${actionType}:FAILURE`
  };
}

export const GET_GROUP_INDEX = getRequestActionTypes('GET_GROUP_INDEX');
