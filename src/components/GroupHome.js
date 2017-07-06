import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import GroupHeader from './GroupHeader';
import UserBalance from './UserBalance';
import UserBalanceBar from './UserBalanceBar';

export default class GroupHome extends Component {
  static defaultProps = {
    currentUser: {},
    group: {
      users: []
    }
  };

  render() {
    const {
      currentUser,
      group,
      groupname,
      logout
    } = this.props;

    const userBalanceBars = group.users.map(user => (
      <UserBalanceBar key={user.id} users={group.users} user={user} />
    ));

    return (
      <div className="c-group-home u-group-header-container">
        <GroupHeader
          group={group}
          groupname={groupname}
          logout={logout}
        />
        <div className="u-container">
          <div className="c-group-home__user-balance">
            <UserBalance
              users={group.users}
              user={currentUser}
            />
          </div>
          <div className="u-float-container">
            <div className="c-group-home__group-balance">
              <div className="c-group-home__section-title">
                그룹 잔액 현황
              </div>
              {userBalanceBars}
            </div>
            <div className="c-group-home__transactions">
              <div className="c-group-home__section-title">
                최근 거래 내역
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
