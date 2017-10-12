import * as ActionTypes from 'src/constants/ActionTypes';

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

export default function groupTransactionLists(state = {}, action) {
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
