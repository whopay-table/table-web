import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import GroupHeader from './GroupHeader';
import Transaction from './Transaction';

export default class GroupTransactions extends Component {
  static defaultProps = {
    currentUser: {},
    group: {
      users: []
    },
    transactions: []
  };

  render() {
    const {
      currentUser,
      group,
      groupname,
      transactions,
      getMoreTransactions,
      logout
    } = this.props;

    const transactionItems = transactions.map(transaction => (
      <Transaction key={transaction.id} transaction={transaction} />
    ));

    return (
      <div className="c-group-transactions u-group-header-container">
        <GroupHeader
          group={group}
          groupname={groupname}
          logout={logout}
        />
        <div className="u-container">
          <div className="c-group-transactions__body">
            <div className="u-page-title">
              거래 내역
            </div>
            {transactionItems}
            <a
              className="u-more-button"
              onClick={getMoreTransactions}
            >
              더 불러오기
            </a>
          </div>
        </div>
      </div>
    );
  }
}
