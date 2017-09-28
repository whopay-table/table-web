import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Container from 'src/components/common/Container';
import ContentGroup from 'src/components/common/ContentGroup';
import GroupHeader from 'src/components/GroupHeader';
import Label from 'src/components/common/Label';
import Title from 'src/components/common/Title';
import Textbox from 'src/components/common/Textbox';
import Transaction from 'src/components/Transaction';

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
      acceptTransaction,
      rejectTransaction,
      logout,
    } = this.props;

    const transactionItems = transactions.map(transaction => (
      <Transaction
        key={transaction.id}
        transaction={transaction}
        currentUser={currentUser}
        acceptTransaction={acceptTransaction}
        rejectTransaction={rejectTransaction}
      />
    ));

    return (
      <Container
        className="c-group-transactions"
        type="wrapper"
        isGroupHeadered={true}
      >
        <GroupHeader
          currentUser={currentUser}
          group={group}
          groupname={groupname}
          logout={logout}
          activeMenuItem="transactions"
        />
        <Container>
          <ContentGroup>
            <Title>
              거래 내역
            </Title>
          </ContentGroup>
          <ContentGroup>
            {transactionItems}
            <a
              className="u-more-button"
              onClick={getMoreTransactions}
            >
              더 불러오기
            </a>
          </ContentGroup>
        </Container>
      </Container>
    );
  }
}
