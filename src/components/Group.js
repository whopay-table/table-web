import React, { Component, PropTypes } from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import GroupHeader from './GroupHeader';
import GroupHome from './GroupHome';
import GroupInvite from './GroupInvite';
import GroupTransactionCreateContainer from '../containers/GroupTransactionCreateContainer';
import GroupTransactions from './GroupTransactions';
import GroupUserUpdateContainer from '../containers/GroupUserUpdateContainer';
import GroupUserDestroyContainer from '../containers/GroupUserDestroyContainer';
import NotFound from './NotFound';

export default class Group extends Component {
  static propTypes = {

  };

  render() {
    const {
      currentUser,
      group,
      groupname,
      isWaitingLogout,
      isWaitingAcceptTransaction,
      isWaitingRejectTransaction,
      isWaitingGetTransactions,
      isOutOfTransactions,
      transactions,
      userTransactions,
      getMoreTransactions,
      refreshGroup,
      refreshUserTransactions,
      refreshPage,
      acceptTransaction,
      rejectTransaction,
      logout,
    } = this.props;

    return (
      <div className="c-group">
        <Switch>
          <Route
            path="/:groupname/transactions/create"
          >
            <GroupTransactionCreateContainer
              isFromCurrentUser={true}
              group={group}
              groupname={groupname}
              logout={logout}
              refreshGroup={refreshGroup}
              refreshUserTransactions={refreshUserTransactions}
              refreshPage={refreshPage}
            />
          </Route>
          <Route
            path="/:groupname/transactions/create_request"
          >
            <GroupTransactionCreateContainer
              isFromCurrentUser={false}
              group={group}
              groupname={groupname}
              logout={logout}
              refreshGroup={refreshGroup}
              refreshUserTransactions={refreshUserTransactions}
            />
          </Route>
          <Route
            path="/:groupname/transactions"
          >
            <GroupTransactions
              currentUser={currentUser}
              group={group}
              groupname={groupname}
              transactions={transactions}
              getMoreTransactions={getMoreTransactions}
              acceptTransaction={acceptTransaction}
              rejectTransaction={rejectTransaction}
              isWaitingAcceptTransaction={isWaitingAcceptTransaction}
              isWaitingRejectTransaction={isWaitingRejectTransaction}
              isWaitingGetTransactions={isWaitingGetTransactions}
              isOutOfTransactions={isOutOfTransactions}
              logout={logout}
            />
          </Route>
          <Route path="/:groupname/invite">
            <GroupInvite
              currentUser={currentUser}
              group={group}
              groupname={groupname}
              logout={logout}
            />
          </Route>
          <Route path="/:groupname/me/update">
            <GroupUserUpdateContainer
              currentUser={currentUser}
              group={group}
              groupname={groupname}
              logout={logout}
              refreshGroup={refreshGroup}
              refreshUserTransactions={refreshUserTransactions}
            />
          </Route>
          <Route path="/:groupname/me/destroy">
            <GroupUserDestroyContainer
              currentUser={currentUser}
              group={group}
              groupname={groupname}
              logout={logout}
            />
          </Route>
          <Route path="/:groupname/users/create">
            <Redirect push to={`/${groupname}`} />
          </Route>
          <Route exact path="/:groupname">
            <GroupHome
              currentUser={currentUser}
              group={group}
              groupname={groupname}
              transactions={transactions}
              userTransactions={userTransactions}
              acceptTransaction={acceptTransaction}
              rejectTransaction={rejectTransaction}
              isWaitingAcceptTransaction={isWaitingAcceptTransaction}
              isWaitingRejectTransaction={isWaitingRejectTransaction}
              refreshPage={refreshPage}
              refreshGroup={refreshGroup}
              refreshUserTransactions={refreshUserTransactions}
              logout={logout}
            />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}
