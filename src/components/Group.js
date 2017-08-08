import React, { Component, PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import GroupHeader from './GroupHeader';
import GroupHome from './GroupHome';
import GroupInvite from './GroupInvite';
import GroupTransactionCreateContainer from '../containers/GroupTransactionCreateContainer';
import GroupTransactions from './GroupTransactions';

export default class Group extends Component {
  static propTypes = {

  };

  render() {
    const {
      currentUser,
      group,
      groupname,
      transactions,
      getMoreTransactions,
      refreshGroup,
      logout,
    } = this.props;

    return (
      <div className="c-group">
        <Switch>
          {/*
            <Route path="/transactions" component={GroupTransactions} />
            <Route path="/users" component={GroupUsers} />
            <Route path="/users/create" component={GroupUserCreateContainer} />
          */}
          <Route
            path="/:groupname/transactions/create"
          >
            <GroupTransactionCreateContainer
              isFromCurrentUser={true}
              group={group}
              groupname={groupname}
              logout={logout}
              refreshGroup={refreshGroup}
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
              logout={logout}
            />
          </Route>
          <Route exact path="/:groupname/invite">
            <GroupInvite
              currentUser={currentUser}
              group={group}
              groupname={groupname}
              logout={logout}
            />
          </Route>
          <Route exact path="/:groupname">
            <GroupHome
              currentUser={currentUser}
              group={group}
              groupname={groupname}
              transactions={transactions}
              logout={logout}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}
