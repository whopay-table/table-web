import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

export default class GroupHeader extends Component {
  static propTypes = {

  };

  render() {
    const {
      currentUser,
      group,
      groupname,
      activeMenuItem,
    } = this.props;
    return (
      <div className="c-group-header">
        <Link to={`/${groupname}`}>
          <div className="c-group-header__logo-block">
            <img
              src="/image/colored-logo.png"
              className="c-group-header__logo"
            />
            <div className="c-group-header__title">
              <span className="c-group-header__app-title">
                WHOPAY ×
              </span>
              <span className="c-group-header__group-title">
                {group.title}
              </span>
            </div>
          </div>
        </Link>


        <div className="c-group-header__right-menu">
          <Link
            to={`/${groupname}/me/update`}
            className={classnames(
              'c-group-header__menu-item'
            )}
          >
            {currentUser.name}님
          </Link>
          <a
            onClick={() => this.props.logout()}
            className={classnames(
              'c-group-header__menu-item'
            )}
          >
            로그아웃
          </a>
        </div>
        <div className="c-group-header__menu">
          <Link
            to={`/${groupname}`}
            className={classnames(
              'c-group-header__menu-item',
              { 'c-group-header__menu-item--is-active': activeMenuItem === 'home' }
            )}
          >
            홈
          </Link>
          <Link
            to={`/${groupname}/transactions`}
            className={classnames(
              'c-group-header__menu-item',
              { 'c-group-header__menu-item--is-active': activeMenuItem === 'transactions' }
            )}
          >
            거래 내역
          </Link>
          <Link
            to={`/${groupname}/transactions/create`}
            className={classnames(
              'c-group-header__menu-item',
              { 'c-group-header__menu-item--is-active': activeMenuItem === 'transaction-create' }
            )}
          >
            송금
          </Link>
          <Link
            to={`/${groupname}/transactions/create_request`}
            className={classnames(
              'c-group-header__menu-item',
              { 'c-group-header__menu-item--is-active': activeMenuItem === 'transaction-request-create' }
            )}
          >
            송금 요청
          </Link>
          <Link
            to={`/${groupname}/invite`}
            className={classnames(
              'c-group-header__menu-item',
              { 'c-group-header__menu-item--is-active': activeMenuItem === 'invite' }
            )}
          >
            그룹 초대
          </Link>
        </div>
      </div>
    );
  }
}
