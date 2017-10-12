import { combineReducers } from 'redux';
import * as ActionTypes from 'src/constants/ActionTypes';
import groupIndexes from 'src/reducers/groupIndexes';
import groups from 'src/reducers/groups';
import groupSessions from 'src/reducers/groupSessions';
import groupUserIdsByEmails from 'src/reducers/groupUserIdsByEmails';
import groupCurrentUsers from 'src/reducers/groupCurrentUsers';
import groupTransactionLists from 'src/reducers/groupTransactionLists';
import groupUserTransactionLists from 'src/reducers/groupUserTransactionLists';

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
