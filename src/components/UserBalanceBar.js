import classnames from 'classnames';
import NumberFormat from 'react-number-format';
import React, { Component, PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

export default class UserBalanceBar extends Component {
  static defaultProps = {
    user: {},
    users: {}
  };

  getBarContentWidth() {
    const {
      user,
      users
    } = this.props;
    const maxAmount = Math.max(...users.map(u => Math.abs(u.balance)));
    const width = maxAmount === 0 ? 0 : (Math.abs(user.balance) * 100) / maxAmount;
    return `${width}%`;
  }

  render() {
    const {
      user
    } = this.props;

    return (
      <div className="c-user-balance-bar">
        <div className="c-user-balance-bar__info">
          {user.name}
          <span
            className={classnames(
              'c-user-balance-bar__amount',
              { 'c-user-balance-bar__amount--is-negative': user.balance < 0 }
            )}
          >
            <NumberFormat
              value={user.balance}
              suffix="원"
              displayType="text"
              thousandSeparator={true}
            />
          </span>
        </div>
        <div className="c-user-balance-bar__bar-container">
          <div
            className={classnames(
              'c-user-balance-bar__bar-content',
              { 'c-user-balance-bar__bar-content--is-negative': user.balance < 0 }
            )}
            style={{width: this.getBarContentWidth()}}
          />
        </div>
      </div>
    );
  }
}
