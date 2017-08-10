import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import GroupHeader from './GroupHeader';
import Transaction from './Transaction';
import UserBalance from './UserBalance';
import UserBalanceBar from './UserBalanceBar';

const MAX_TRANSACTION_COUNT = 10;

export default class GroupHome extends Component {
  static defaultProps = {
    currentUser: {},
    group: {
      users: [],
    },
    transactions: [],
    userTransactions: [],
  };

  render() {
    const {
      currentUser,
      group,
      groupname,
      transactions,
      userTransactions,
      acceptTransaction,
      rejectTransaction,
      logout,
    } = this.props;

    const userBalanceBars = group.users.map(user => (
      <UserBalanceBar key={user.id} users={group.users} user={user} />
    ));

    const transactionItems = userTransactions.map(transaction => (
      <Transaction
        key={transaction.id}
        transaction={transaction}
        currentUser={currentUser}
        acceptTransaction={acceptTransaction}
        rejectTransaction={rejectTransaction}
      />
    ));

    const allTransactionsButton = (
      <Link
        className="u-more-button"
        to={`/${groupname}/transactions`}
      >
        모든 거래내역 보기
      </Link>
    );

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
                내 거래 내역 
              </div>
              {transactionItems}
              {allTransactionsButton}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
