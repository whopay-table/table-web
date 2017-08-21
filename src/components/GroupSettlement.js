import classnames from 'classnames';
import NumberFormat from 'react-number-format';
import React, { Component, PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

export default class GroupSettlement extends Component {
  static defaultProps = {
    currentUser: {},
    group: {
      users: [],
    },
    onClose: () => {},
  };

  getPayments() {
    const {
      currentUser,
      group,
    } = this.props;

    const groupPayments = {};
    const users = group.users.map(user => Object.assign({}, user));

    while (users.map(u => u.balance).filter(b => (b !== 0)).length > 0) {
      users.sort((a, b) => (a.balance - b.balance));
      const amount = -users[0].balance;
      groupPayments[users[0].id] = {
        user: users[users.length - 1],
        amount,
      };
      users[0].balance = 0;
      users[users.length - 1].balance -= amount;
    }
    return groupPayments;
  }

  renderGroupInfo() {
    const { group } = this.props;
    const groupPayments = this.getPayments();

    return group.users.filter(user => groupPayments[user.id]).map(user => {
      const payment = groupPayments[user.id];
      return (
        <li
          key={user.id}
          className="c-group-settlement__item u-info-block__item"
        >
          {user.name} ➔ {payment.user.name}: {this.renderAmount(payment.amount)}
        </li>
      );
    });
  }

  renderCurrentUserInfo() {
    const { currentUser } = this.props;
    const groupPayments = this.getPayments();
    const payment = groupPayments[currentUser.id];
    const { user, amount } = payment;

    return [
      <li
        key={currentUser.id}
        className="c-group-settlement__item u-info-block__item"
      >
        {`${user.name} 에게 ${amount} 를 현금으로 주고, `}
        {`그룹의 모든 사람들이 정산을 위한 현금 전달을 마칠 때까지 기다려주세요.`}
      </li>,
      <li
        key={`${currentUser.id}-2`}
        className="c-group-settlement__item u-info-block__item"
      >
        {`모든 사람들의 현금 전달이 끝나면, WHOPAY에서 같은 액수를 ${user.name} 에게 송금 요청합니다.`}
      </li>
    ];
  }

  renderAmount(amount) {
    return (
      <NumberFormat
        value={amount}
        suffix="원"
        displayType="text"
        thousandSeparator={true}
      />
    );
  }

  isCurrentUserPaymentRequired() {
    const { currentUser } = this.props;
    const groupPayments = this.getPayments();
    return groupPayments[currentUser.id] ? true : false;
  }

  render() {
    const { group, currentUser } = this.props;

    const isCurrentUserPaymentRequired = this.isCurrentUserPaymentRequired();
    const currentUserDescription = isCurrentUserPaymentRequired ? (
      <div className="c-group-settlement__description u-info-block__description">
        이를 위해, 다음과 같이 현금을 전달해주세요.
      </div>
    ) : (
      <div className="c-group-settlement__description u-info-block__description">
        다른 사람들이 정산을 마칠 떄까지 기다려 주세요.
      </div>
    );
    const currentUserItem = isCurrentUserPaymentRequired ? (
      <ul className="c-group-settlement__items u-info-block__items">
        {this.renderCurrentUserInfo()}
      </ul>
    ) : null;

    return (
      <div className="c-group-settlement u-info-block">
        <div className="c-group-settlement__description u-info-block__description">
          다음과 같은 현금 전달을 통해 거래를 모두 정산할 수 있습니다.
        </div>
        <ul className="c-group-settlement__items u-info-block__items">
          {this.renderGroupInfo()}
        </ul>
        {currentUserDescription}
        {currentUserItem}
        <div className="c-group-settlement__buttons u-button-row u-button-row--tight">
          <a
            className={classnames(
              'c-group-settlement__button',
              'u-button',
              'u-button--left-align'
            )}
            onClick={() => this.props.onClose()}
          >
            숨기기
          </a>
        </div>
      </div>
    );
  }
}
