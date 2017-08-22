import { combineReducers } from 'redux';
import * as ActionTypes from '../constants/ActionTypes';

function groupIndexes(state = {}, action) {
  switch (action.type) {
    case ActionTypes.GET_GROUP_INDEX.request:
      return Object.assign({}, state, {
        [action.params.groupname]: undefined
      });

    case ActionTypes.GET_GROUP_INDEX.success:
      return Object.assign({}, state, {
        [action.params.groupname]: action.response.id
      });

    case ActionTypes.GET_GROUP_INDEX.failure:
      return Object.assign({}, state, {
        [action.params.groupname]: null
      });

    case ActionTypes.CREATE_GROUP.success:
      return Object.assign({}, state, {
        [action.response.groupname]: action.response.id
      });

    default:
      return state;
  }
}

function filterGroupUsers(group) {
  const filteredGroup = Object.assign({}, group);
  filteredGroup.users = filteredGroup.users.filter(u => !u.isDisabled);
  return filteredGroup;
}

function groups(state = {}, action) {
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

function groupSessions(state = {}, action) {
  switch (action.type) {
    case ActionTypes.LOGIN.request:
      return Object.assign({}, state, {
        [action.params._groupId]: undefined
      });

    case ActionTypes.LOGIN.success:
      localStorage.setItem(`table-session-${action.params._groupId}`, action.response.token);
      return Object.assign({}, state, {
        [action.params._groupId]: action.response.token
      });

    case ActionTypes.LOGIN.failure:
      return Object.assign({}, state, {
        [action.params._groupId]: false
      });

    case ActionTypes.LOGOUT.success:
      localStorage.removeItem(`table-session-${action.params._groupId}`);
      return Object.assign({}, state, {
        [action.params._groupId]: null
      });

    case ActionTypes.DESTROY_USER.success:
      localStorage.removeItem(`table-session-${action.params._groupId}`);
      return Object.assign({}, state, {
        [action.params._groupId]: null
      });

    case ActionTypes.GET_GROUP.success:
      return Object.assign({}, state, {
        [action.params._id]: action.params._token
      });

    case ActionTypes.GET_GROUP.failure:
      return Object.assign({}, state, {
        [action.params._id]: null
      });

    default:
      return state;
  }
}

function groupUserIdsByEmails(state = {}, action) {
  switch (action.type) {
    case ActionTypes.GET_USER_ID_BY_EMAIL.request:
      return Object.assign({}, state, {
        [action.params.email]: undefined
      });

    case ActionTypes.GET_USER_ID_BY_EMAIL.success:
      return Object.assign({}, state, {
        [action.params.email]: action.response.id
      });

    case ActionTypes.GET_USER_ID_BY_EMAIL.failure:
      return Object.assign({}, state, {
        [action.params.email]: null
      });

    case ActionTypes.CREATE_USER.success:
      return Object.assign({}, state, {
        [action.response.email]: action.response.id
      });

    default:
      return state;
  }
}

function groupCurrentUsers(state = {}, action) {
  switch (action.type) {
    case ActionTypes.GET_CURRENT_USER.request:
      return Object.assign({}, state, {
        [action.params._groupId]: undefined
      });

    case ActionTypes.GET_CURRENT_USER.success:
      return Object.assign({}, state, {
        [action.params._groupId]: action.response
      });

    case ActionTypes.GET_CURRENT_USER.failure:
      return Object.assign({}, state, {
        [action.params._groupId]: null
      });

    case ActionTypes.UPDATE_USER.success:
      return Object.assign({}, state, {
        [action.params._groupId]: action.response
      });

    default:
      return state;
  }
}

function compareTransactionsByAccepted(a, b) {
  if (b.isAccepted && !a.isAccepted) {
    return 1;
  } else if (a.isAccepted && !b.isAccepted) {
    return -1;
  } else {
    return compareTransactionsByCreatedAt(a, b);
  }
}

function compareTransactionsByCreatedAt(a, b) {
  if (a.createdAt < b.createdAt) {
    return 1;
  } else if (a.createdAt > b.createdAt) {
    return -1;
  } else {
    return 0;
  }
}

function mergeTransactions(transactions, newTransactions, sortByAccepted) {
  const isTransactionsArray = Array.isArray(transactions);
  const transactionIds = {};
  if (isTransactionsArray) {
    for (const t of transactions) {
      transactionIds[t.id] = true;
    }
  }
  const mergedTransactions = isTransactionsArray ? transactions.slice(0) : [];
  for (const t of newTransactions) {
    if (!transactionIds[t.id]) {
      mergedTransactions.push(t);
    }
  }
  mergedTransactions.sort(sortByAccepted ?
    compareTransactionsByAccepted : compareTransactionsByCreatedAt);
  return mergedTransactions;
}

function groupTransactionLists(state = {}, action) {
  switch (action.type) {
    case ActionTypes.GET_TRANSACTIONS.request:
      return state;

    case ActionTypes.GET_TRANSACTIONS.success:
      return Object.assign({}, state, {
        [action.params._groupId]: mergeTransactions(state[action.params._groupId], action.response, false)
      });

    case ActionTypes.GET_TRANSACTIONS.failure:
      return state;

    case ActionTypes.CREATE_TRANSACTION.request:
      return state;

    case ActionTypes.CREATE_TRANSACTION.success:
      return Object.assign({}, state, {
        [action.params.groupId]: mergeTransactions(state[action.params.groupId], action.response, false)
      });

    case ActionTypes.CREATE_TRANSACTION.failure:
      return state;

    case ActionTypes.ACCEPT_TRANSACTION.request:
      return state;

    case ActionTypes.ACCEPT_TRANSACTION.success:
      return Object.assign({}, state, {
        [action.params.groupId]: state[action.params.groupId].map(transaction => (
          transaction.id === action.params.transactionId ? Object.assign({}, transaction, {
            isAccepted: true,
          }) : transaction
        ))
      });

    case ActionTypes.ACCEPT_TRANSACTION.failure:
      return state;

    case ActionTypes.REJECT_TRANSACTION.request:
      return state;

    case ActionTypes.REJECT_TRANSACTION.success:
      return Object.assign({}, state, {
        [action.params.groupId]: state[action.params.groupId].map(transaction => (
          transaction.id === action.params.transactionId ? Object.assign({}, transaction, {
            isRejected: true,
          }) : transaction
        ))
      });

    case ActionTypes.REJECT_TRANSACTION.failure:
      return state;

    default:
      return state;
  }
}

function groupUserTransactionLists(state = {}, action) {
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


const entities = combineReducers({
  groupIndexes,
  groups,
  groupSessions,
  groupUserIdsByEmails,
  groupCurrentUsers,
  groupTransactionLists,
  groupUserTransactionLists,
});

const app = combineReducers({
  entities
});

export default app;
