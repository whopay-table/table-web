import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

export default class GroupWithdraw extends Component {
  static defaultProps = {
    currentUser: {},
    group: {
      users: [],
    },
    onClose: () => {},
  };

  getUserAmounts() {
    const {
      currentUser,
      group,
    } = this.props;

    let balance = currentUser.balance;
    const users = group.users.map(user => Object.assign({}, user));
    users.sort((a, b) => (a.balance - b.balance)).filter(user => user.id !== currentUser.id);

    const userAmounts = [];
    while (balance > 0) {
      const user = users.shift();
      if (user.balance >= 0) {
        break;
      }

      const amount = Math.min(-user.balance, balance);
      userAmounts.push({ user, amount });
      balance -= amount;
    }
    return userAmounts;
  }

  renderInfo() {
    const userAmounts = this.getUserAmounts();
    return userAmounts.map(({ user, amount }) => (
      <li
        key={user.id}
        className="c-group-withdraw__item u-info-block__item"
      >
        {`${user.name} 에게 ${amount} 를 현금으로 받고, 대신 WHOPAY에서 같은 액수를 송금해줍니다.`}
      </li>
    ));
  }

  render() {
    const { group, currentUser } = this.props;
    return (
      <div className="c-group-withdraw u-info-block">
        <div className="c-group-withdraw__description u-info-block__description">
          다음과 같은 방법으로 WHOPAY 계좌 잔액을 현금으로 돌려받을 수 있습니다.
        </div>
        <ul className="c-group-withdraw__items u-info-block__items">
          {this.renderInfo()}
        </ul>
        <div className="c-group-withdraw__buttons u-button-row u-button-row--tight">
          <a
            className={classnames(
              'c-group-withdraw__button',
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
