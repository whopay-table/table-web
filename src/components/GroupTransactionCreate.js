import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import GroupHeader from './GroupHeader';
import Transaction from './Transaction';
import UserBalance from './UserBalance';
import UserBalanceBar from './UserBalanceBar';

const MAX_TRANSACTION_COUNT = 20;

export default class GroupTransactionCreate extends Component {
  static defaultProps = {
    currentUser: {},
    group: {
      users: []
    }
  };

  render() {
    const {
      currentUser,
      group,
      groupname,
      logout
    } = this.props;

    const userSelectorButtons = group.users.map(user => (
      <a
        key={user.id}
        className="u-input-selector__button"
      >
        {user.name}
      </a>
    ));

    return (
      <div className="c-group-transaction-create u-group-header-container">
        <GroupHeader
          group={group}
          groupname={groupname}
          logout={logout}
        />
        <div className="u-container">
          <div className="c-group-transaction-create__body">
            <div className="u-page-title">
              송금
            </div>
            <form className="c-group-transaction-create__form">
              <div className="u-input-group">
                <label className="u-label">
                  보낼 금액
                </label>
                <input className="u-input" type="number" />
              </div>
              <div className="u-input-group">
                <label className="u-label">
                  받는 사람
                </label>
                <input className="u-input" type="text" />
                <div className="u-input-selector">
                  {userSelectorButtons}
                </div>
                <small className="u-input-info">
                  버튼을 눌러 사람을 추가하세요.
                </small>
              </div>
              <div className="u-input-group">
                <label className="u-label">
                  설명
                </label>
                <input className="u-input" type="text" />
                <small className="u-input-info">
                  생략할 수 있습니다.
                </small>
              </div>
              <div className="u-button-row">
                <a href="/group.html" className="u-button u-button--is-cancel">
                  취소
                </a>
                <a href="/group.html" className="u-button">
                  확인
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
