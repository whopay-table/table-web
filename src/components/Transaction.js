import classnames from 'classnames';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import React, { Component, PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Bar from 'src/components/common/Bar';
import BarItem from 'src/components/common/BarItem';
import Button from 'src/components/common/Button';
import ContentGroup from 'src/components/common/ContentGroup';
import TimeAgo from 'src/components/TimeAgo';

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
          승인 대기
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
          취소됨
        </div>
      );
    } else {
      return null;
    }
  }

  renderButtons() {
    const {
      currentUser,
      transaction,
      isWaitingAcceptTransaction,
      isWaitingRejectTransaction,
    } = this.props;
    const {
      id,
      fromUser,
      toUser,
      isAccepted,
      isRejected,
      autoAcceptAt,
    } = transaction;
    const isRequested = !isAccepted && !isRejected;
    const isFromCurrentUser = currentUser.id === fromUser.id;
    const isToCurrentUser = currentUser.id === toUser.id;

    const autoAcceptInfo = autoAcceptAt ? (
      <span className="c-transaction__auto-accept-at">
        {moment(autoAcceptAt) > moment().startOf('day'); ? <TimeAgo date={autoAcceptAt} /> : '오늘 밤'} 자동승인
      </span>
    ) : null;

    if (isRequested) {
      if (isFromCurrentUser) {
        return (
          <ContentGroup>
            <Bar>
              <BarItem align="left">
                <Button
                  size="small"
                  isBusy={isWaitingAcceptTransaction[id]}
                  onClick={() => this.props.acceptTransaction(id)}
                >
                  승인
                </Button>
              </BarItem>
              <BarItem align="left">
                <Button
                  role="danger"
                  size="small"
                  isBusy={isWaitingRejectTransaction[id]}
                  onClick={() => this.props.rejectTransaction(id)}
                >
                  거절
                </Button>
              </BarItem>
              <BarItem align="right">
                {autoAcceptInfo}
              </BarItem>
            </Bar>
          </ContentGroup>
        );
      } else if (isToCurrentUser) {
        return (
          <ContentGroup>
            <Bar>
              <BarItem align="left">
                <Button
                  role="danger"
                  size="small"
                  isBusy={isWaitingRejectTransaction[id]}
                  onClick={() => this.props.rejectTransaction(id)}
                >
                  취소
                </Button>
              </BarItem>
              <BarItem align="right">
                {autoAcceptInfo}
              </BarItem>
            </Bar>
          </ContentGroup>
        );
      }
    }
    return null;
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

    const fromUserName = (
      <span
        className={classnames(
          { 'u-bold': currentUser.id === fromUser.id }
        )}
      >
        {fromUser.name}
      </span>
    );
    const toUserName = (
      <span
        className={classnames(
          { 'u-bold': currentUser.id === toUser.id }
        )}
      >
        {toUser.name}
      </span>
    );

    return (
      <div className="c-transaction">
        <ContentGroup size="small">
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
              <NumberFormat
                value={amount}
                suffix="원"
                displayType="text"
                thousandSeparator={true}
              />
            </div>
            <div className="c-transaction__name">
              {fromUserName}
              &nbsp;➔&nbsp;
              {toUserName}
            </div>
            <div className="c-transaction__created-at">
              <TimeAgo date={createdAt} />
            </div>
            {this.renderStatus()}
          </div>
        </ContentGroup>
        {this.renderButtons()}
      </div>
    );
  }
}
