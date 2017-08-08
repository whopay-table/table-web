import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

export default class Transaction extends Component {
  renderStatus() {
    const { transaction } = this.props;
    const {
      isAccepted,
      isRejected,
    } = transaction;
    const isRequested = !isAccepted && !isRejected;
    if (isRequested) {
      return (
        <div className="c-transaction__status">
          요청됨
        </div>
      );
    } else if (isRejected) {
      return (
        <div
          className={classnames(
            'c-transaction__status',
            'c-transaction__status--is-rejected'
          )}
        >
          거절됨
        </div>
      );
    } else {
      return null;
    }
  }

  renderButtons() {
    const {
      currentUser,
      transaction
    } = this.props;
    const {
      id,
      fromUser,
      isAccepted,
      isRejected,
    } = transaction;
    const isRequested = !isAccepted && !isRejected;
    const isFromCurrentUser = currentUser.id === fromUser.id;

    return isRequested && isFromCurrentUser ? (
      <div className="c-transaction__buttons">
        <a
          className="c-transaction__button"
          onClick={() => this.props.acceptTransaction(id)}
        >
          수락
        </a>
        <a
          className={classnames(
            'c-transaction__button',
            'c-transaction__button--is-cancel'
          )}
          onClick={() => this.props.rejectTransaction(id)}
        >
          거절
        </a>
      </div>
    ) : null;
  }

  render() {
    const {
      currentUser,
      transaction
    } = this.props;
    const {
      amount,
      description,
      fromUser,
      toUser,
      createdAt,
      isAccepted,
      isRejected,
    } = transaction;

    return (
      <div className="c-transaction">
        <div className="c-transaction__info-box">
          <div className="c-transaction__description">
            {description}
          </div>
          <div
            className={classnames(
              'c-transaction__amount',
              { 'c-transaction__amount--is-rejected': isRejected }
            )}
          >
            {`${amount}원`}
          </div>
          <div className="c-transaction__name">
            {`${fromUser.name} ➔ ${toUser.name}`}
          </div>
          {this.renderStatus()}
          <div className="c-transaction__created-at">
            {/* {createdAt} */}
          </div>
        </div>
        {this.renderButtons()}
      </div>
    );
  }
}
