import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import GroupHeader from './GroupHeader';

export default class GroupHome extends Component {
  static propTypes = {

  };

  static defaultProps = {
    currentUser: {},
    group: {}
  };

  render() {
    const {
      currentUser,
      group,
      groupname,
      logout
    } = this.props;

    console.log(currentUser);
    return (
      <div className="c-group-home u-group-header-container">
        <GroupHeader
          group={group}
          groupname={groupname}
          logout={logout}
        />
        <div className="u-container">
          <div className="c-group-home__user-balance">
            <div className="c-user-balance">
              <div className="c-user-balance__name">
                {currentUser.name}
              </div>
              <div className="c-user-balance__balance">
                잔액이
                <span
                  className={classnames(
                    'c-user-balance__balance-amount',
                    'u-amount',
                    { 'u-amount--is-negative': currentUser.balance < 0 }
                  )}
                >
                  {`${currentUser.balance}원`}
                </span>
                있습니다.
              </div>
            </div>
          </div>
          <div className="u-float-container">
            <div className="c-group-home__group-balance">
              <div className="c-group-home__section-title">
                그룹 잔액 현황
              </div>
              <div className="c-user-balance-bar">
                <div className="c-user-balance-bar__info">
                  최영희 <span className="c-user-balance-bar__amount">32,000원</span>
                </div>
                <div className="c-user-balance-bar__bar-container">
                  <div className="c-user-balance-bar__bar-content" style={{width: '100%'}}></div>
                </div>
              </div>
              <div className="c-user-balance-bar">
                <div className="c-user-balance-bar__info">
                  김철수 <span className="c-user-balance-bar__amount">12,480원</span>
                </div>
                <div className="c-user-balance-bar__bar-container">
                  <div className="c-user-balance-bar__bar-content" style={{width: '39%'}}></div>
                </div>
              </div>
              <div className="c-user-balance-bar">
                <div className="c-user-balance-bar__info">
                  이영희 <span className="c-user-balance-bar__amount">-3,800원</span>
                </div>
                <div className="c-user-balance-bar__bar-container">
                  <div className="c-user-balance-bar__bar-content c-user-balance-bar__bar-content--is-negative" style={{width: '11.8%'}}></div>
                </div>
              </div>
              <div className="c-user-balance-bar">
                <div className="c-user-balance-bar__info">
                  박철수 <span className="c-user-balance-bar__amount">-19,280원</span>
                </div>
                <div className="c-user-balance-bar__bar-container">
                  <div className="c-user-balance-bar__bar-content c-user-balance-bar__bar-content--is-negative" style={{width: '60.2%'}}></div>
                </div>
              </div>
              <div className="c-user-balance-bar">
                <div className="c-user-balance-bar__info">
                  박영희 <span className="c-user-balance-bar__amount">-21,400원</span>
                </div>
                <div className="c-user-balance-bar__bar-container">
                  <div className="c-user-balance-bar__bar-content c-user-balance-bar__bar-content--is-negative" style={{width: '66.8%'}}></div>
                </div>
              </div>
            </div>
            <div className="c-group-home__transactions">
              <div className="c-group-home__section-title">
                최근 거래 내역
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
