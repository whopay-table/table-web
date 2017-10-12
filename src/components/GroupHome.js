import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Bar from 'src/components/common/Bar';
import BarItem from 'src/components/common/BarItem';
import Button from 'src/components/common/Button';
import Container from 'src/components/common/Container';
import ContentGroup from 'src/components/common/ContentGroup';

import GroupHeader from 'src/components/GroupHeader';
import GroupPayback from 'src/components/GroupPayback';
import GroupSettlement from 'src/components/GroupSettlement';
import GroupWithdraw from 'src/components/GroupWithdraw';
import Transaction from 'src/components/Transaction';
import UserBalance from 'src/components/UserBalance';
import UserBalanceBar from 'src/components/UserBalanceBar';

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

  state = {
    isWithdrawVisible: false,
    isPaybackVisible: false,
    isSettlementVisible: false,
  };

  showWithdraw() {
    this.setState({ isWithdrawVisible: true });
  }

  hideWithdraw() {
    this.setState({ isWithdrawVisible: false });
  }

  showPayback() {
    this.setState({ isPaybackVisible: true });
  }

  hidePayback() {
    this.setState({ isPaybackVisible: false });
  }

  showSettlement() {
    this.setState({ isSettlementVisible: true });
  }

  hideSettlement() {
    this.setState({ isSettlementVisible: false });
  }

  renderWithdrawBlock() {
    const {
      currentUser,
      group,
    } = this.props;
    const {
      isWithdrawVisible,
    } = this.state;

    const withdrawButton = !isWithdrawVisible ? (
      <ContentGroup>
        <Bar>
          <BarItem align="left">
            <Button
              onClick={() => this.showWithdraw()}
            >
              현금 출금하기
            </Button>
          </BarItem>
        </Bar>
      </ContentGroup>
    ) : null;

    const withdraw = isWithdrawVisible ? (
      <GroupWithdraw
        group={group}
        currentUser={currentUser}
        onClose={() => this.hideWithdraw()}
      />
    ) : null;

    return (
      <div className="u-info-block-container">
        {withdrawButton}
        {withdraw}
      </div>
    );
  }

  renderPaybackBlock() {
    const {
      currentUser,
      group,
    } = this.props;
    const {
      isPaybackVisible,
    } = this.state;

    const paybackButton = !isPaybackVisible ? (
      <ContentGroup>
        <Bar>
          <BarItem align="left">
            <Button
              onClick={() => this.showPayback()}
            >
              빚 갚기
            </Button>
          </BarItem>
        </Bar>
      </ContentGroup>
    ) : null;

    const payback = isPaybackVisible ? (
      <GroupPayback
        group={group}
        currentUser={currentUser}
        onClose={() => this.hidePayback()}
      />
    ) : null;

    return (
      <div className="u-info-block-container">
        {paybackButton}
        {payback}
      </div>
    );
  }

  renderSettlementBlock() {
    const {
      currentUser,
      group,
    } = this.props;
    const {
      isSettlementVisible,
    } = this.state;

    const settlementButton = !isSettlementVisible ? (
      <ContentGroup>
        <Bar>
          <BarItem align="left">
            <Button
              onClick={() => this.showSettlement()}
            >
              그룹 전체 정산하기
            </Button>
          </BarItem>
        </Bar>
      </ContentGroup>
    ) : null;

    const settlement = isSettlementVisible ? (
      <GroupSettlement
        group={group}
        currentUser={currentUser}
        onClose={() => this.hideSettlement()}
      />
    ) : null;

    return (
      <div className="u-info-block-container">
        {settlementButton}
        {settlement}
      </div>
    );
  }

  render() {
    const {
      currentUser,
      group,
      groupname,
      transactions,
      userTransactions,
      acceptTransaction,
      rejectTransaction,
      isWaitingAcceptTransaction,
      isWaitingRejectTransaction,
      refreshPage,
      logout,
    } = this.props;

    const userBalanceBars = group.users.sort((a, b) => (a.balance - b.balance)).map(user => (
      <UserBalanceBar
        key={user.id}
        users={group.users}
        user={user}
        currentUser={currentUser}
      />
    ));

    const transactionItems = userTransactions.map(transaction => (
      <Transaction
        key={transaction.id}
        transaction={transaction}
        currentUser={currentUser}
        acceptTransaction={acceptTransaction}
        rejectTransaction={rejectTransaction}
        isWaitingAcceptTransaction={isWaitingAcceptTransaction}
        isWaitingRejectTransaction={isWaitingRejectTransaction}
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
      <Container
        className="c-group-home"
        type="wrapper"
        isGroupHeadered={true}
      >
        <GroupHeader
          currentUser={currentUser}
          group={group}
          groupname={groupname}
          logout={logout}
          activeMenuItem="home"
        />
        <Container>
          <div className="c-group-home__user-balance">
            <a
              className="c-group-home__refresh-button"
              onClick={() => refreshPage()}
            >
              ↻
            </a>
            <UserBalance
              users={group.users}
              user={currentUser}
            />
            {currentUser.balance > 0 ? this.renderWithdrawBlock() : null}
            {currentUser.balance < 0 ? this.renderPaybackBlock() : null}
          </div>
          <div className="c-group-home__info-blocks">
            <div className="c-group-home__group-balance">
              <div className="c-group-home__section-title">
                그룹 잔액 현황
              </div>
              {userBalanceBars}
              {currentUser.balance !== 0 ? this.renderSettlementBlock() : null}
            </div>
            <div className="c-group-home__transactions">
              <div className="c-group-home__section-title">
                내 거래 내역
              </div>
              {transactionItems}
              {allTransactionsButton}
            </div>
          </div>
        </Container>
      </Container>
    );
  }
}
