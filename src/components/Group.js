import React, { Component, PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import GroupHeader from './GroupHeader';
import GroupHome from './GroupHome';

export default class Group extends Component {
  static propTypes = {

  };

  render() {
    const {
      currentUser,
      group,
      groupname,
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
            <Route path="/transactions/create" component={GroupTransactionCreateContainer} />
            <Route path="/transactions" component={GroupTransactions} />
            <Route path="/users" component={GroupUsers} />
            <Route path="/users/create" component={GroupUserCreateContainer} />
          */}
          <Route
            path="/"
            render={() => (
              <GroupHome
                currentUser={currentUser}
                groupname={groupname}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
