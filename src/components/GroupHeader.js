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
          <img
            src="/image/titled-logo-wide.png"
            className="c-group-header__logo"
          />
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
          <a
            className="c-group-header__menu-item c-group-header__menu-item--is-active"
          >
            대시보드
          </a>
          <a
            className="c-group-header__menu-item"
          >
            거래 내역
          </a>
          <a
            className="c-group-header__menu-item"
          >
            송금
          </a>
          <a
            className="c-group-header__menu-item"
          >
            송금 요청
          </a>
        </div>
      </div>
    );
  }
}
