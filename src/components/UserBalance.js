import classnames from 'classnames';
import NumberFormat from 'react-number-format';
import React, { Component, PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

export default class UserBalance extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="c-user-balance">
        <div className="c-user-balance__name">
          {user.name}
        </div>
        <div className="c-user-balance__balance">
          잔액이
          <span
            className={classnames(
              'c-user-balance__balance-amount',
              'u-amount',
              { 'u-amount--is-negative': user.balance < 0 }
            )}
          >
            <NumberFormat
              value={user.balance}
              suffix="원"
              displayType="text"
              thousandSeparator={true}
            />
          </span>
          있습니다.
        </div>
      </div>
    );
  }
}
