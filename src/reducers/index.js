import { combineReducers } from 'redux';
import * as ActionTypes from 'src/constants/ActionTypes';
import groupIndexes from 'src/reducers/entities/groupIndexes';
import groups from 'src/reducers/entities/groups';
import groupSessions from 'src/reducers/entities/groupSessions';
import groupUserIdsByEmails from 'src/reducers/entities/groupUserIdsByEmails';
import groupCurrentUsers from 'src/reducers/entities/groupCurrentUsers';
import groupTransactionLists from 'src/reducers/entities/groupTransactionLists';
import groupUserTransactionLists from 'src/reducers/entities/groupUserTransactionLists';
import isWaiting from 'src/reducers/isWaiting';
import status from 'src/reducers/status';

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
  entities,
  isWaiting,
  status,
});

export default app;
