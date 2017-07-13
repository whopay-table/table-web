import React, { Component, PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import GroupHeader from './GroupHeader';
import GroupHome from './GroupHome';
import GroupTransactionCreateContainer from '../containers/GroupTransactionCreateContainer';

export default class Group extends Component {
  static propTypes = {

  };

  render() {
    const {
      currentUser,
      group,
      groupname,
      transactions,
      logout
    } = this.props;

    return (
      <div className="c-group">
        <GroupHeader
          group={group}
          groupname={groupname}
          logout={logout}
        />
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
              groupname={groupname}
            />
          </Route>
          <Route exact path="/:groupname">
            <GroupHome
              currentUser={currentUser}
              group={group}
              groupname={groupname}
              transactions={transactions}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}
