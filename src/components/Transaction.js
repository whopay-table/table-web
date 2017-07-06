import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

export default class Transaction extends Component {
  render() {
    const { transaction } = this.props;
    return (
      <div className="c-transaction">
        <div className="c-transaction__description">
          {transaction.description}
        </div>
        <div className="c-transaction__amount">
          {`${transaction.amount}원`}
        </div>
        <div className="c-transaction__name">
          {`${transaction.fromUser.name} ➔ ${transaction.toUser.name}`}
        </div>
        <div className="c-transaction__created-at">
          {transaction.createdAt}
        </div>
      </div>
    );
  }
}
