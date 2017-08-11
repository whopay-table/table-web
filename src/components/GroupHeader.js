import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

export default class GroupHeader extends Component {
  static propTypes = {

  };

  render() {
    const { group, groupname } = this.props;
    return (
      <div className="c-group-header">
        <Link to={`/${groupname}`}>
          <div className="c-group-header__logo-block">
            <img
              src="/image/colored-logo.png"
              className="c-group-header__logo"
            />
            <div className="c-group-header__group-title">
              {group.title}
            </div>
          </div>
        </Link>


        <div className="c-group-header__right-menu">
          <a
            onClick={() => this.props.logout()}
            className="c-group-header__menu-item"
          >
            로그아웃
          </a>
        </div>
        <div className="c-group-header__menu">
          <Link
            to={`/${groupname}`}
            className="c-group-header__menu-item c-group-header__menu-item--is-active"
          >
            홈
          </Link>
          <Link
            to={`/${groupname}/transactions`}
            className="c-group-header__menu-item"
          >
            거래 내역
          </Link>
          <Link
            to={`/${groupname}/transactions/create`}
            className="c-group-header__menu-item"
          >
            송금
          </Link>
          <Link
            to={`/${groupname}/transactions/create_request`}
            className="c-group-header__menu-item"
          >
            송금 요청
          </Link>
          <Link
            to={`/${groupname}/invite`}
            className="c-group-header__menu-item"
          >
            그룹 초대
          </Link>
        </div>
      </div>
    );
  }
}
