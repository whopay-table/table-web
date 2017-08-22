import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import GroupHeader from './GroupHeader';
import GroupPayback from './GroupPayback';
import GroupSettlement from './GroupSettlement';
import GroupWithdraw from './GroupWithdraw';
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
      <div className="u-button-row u-button-row--tight">
        <a
          className={classnames(
            'u-button',
            'u-button--left-align'
          )}
          onClick={() => this.showWithdraw()}
        >
          현금 출금하기
        </a>
      </div>
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
      <div className="u-button-row u-button-row--tight">
        <a
          className={classnames(
            'u-button',
            'u-button--left-align'
          )}
          onClick={() => this.showPayback()}
        >
          빚 갚기
        </a>
      </div>
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
      <div className="u-button-row u-button-row--tight">
        <a
          className={classnames(
            'u-button',
            'u-button--left-align'
          )}
          onClick={() => this.showSettlement()}
        >
          그룹 전체 정산하기
        </a>
      </div>
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
          currentUser={currentUser}
          group={group}
          groupname={groupname}
          logout={logout}
          activeMenuItem="home"
        />
        <div className="u-container">
          <div className="c-group-home__user-balance">
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
        </div>
      </div>
    );
  }
}
