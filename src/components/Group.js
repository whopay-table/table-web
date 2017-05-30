import React, { Component, PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import GroupHeader from './GroupHeader';

export default class Group extends Component {
  static propTypes = {

  };

  render() {
    const {
      group,
      logout
    } = this.props;

    return (
      <div className="c-group">
        <GroupHeader
          logout={logout}
        />
        <Switch>
          <Route exact path="/" component={GroupHome} />
          {/* <Route path="/transactions/create" component={GroupTransactionCreateContainer} />
          <Route path="/transactions" component={GroupTransactions} />
          <Route path="/users" component={GroupUsers} />
          <Route path="/users/create" component={GroupUserCreateContainer} */}
        </Switch>
        {JSON.stringify(group)}
      </div>
    );
  }
}
