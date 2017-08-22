import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import GroupHeader from './GroupHeader';

export default class GroupUserDestroy extends Component {
  static defaultProps = {
    currentUser: {},
    group: {
      users: []
    }
  };

  handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }

    const { destroyUser } = this.props;
    destroyUser();
  }

  render() {
    const {
      currentUser,
      destroyUser,
      group,
      groupname,
      password,
      alert,
      setPassword,
      logout
    } = this.props;

    const alertBlock = alert ? (
      <div className="alert alert-danger" role="alert">
        {alert}
      </div>
    ) : null;

    return (
      <div className="c-group-user-destroy u-group-header-container">
        <GroupHeader
          currentUser={currentUser}
          group={group}
          groupname={groupname}
          logout={logout}
          activeMenuItem={'user-destroy'}
        />
        <div className="u-container">
          <div className="c-group-user-destroy__body">
            <div className="u-page-title">
              그룹 탈퇴
            </div>
            <small className="u-input-info">
              주의: 그룹을 탈퇴하면 거래 기록을 제외한 모든 내 정보가 사라지며,
              현재 내 이메일 주소는 이 그룹에서 다시는 사용할 수 없게 되고,
              이는 복구할 수 없습니다.
            </small>
            <form
              className="c-group-user-destroy-form"
              onSubmit={e => this.handleSubmit(e)}
            >
              <div className="u-input-group">
                <label className="u-label">
                  비밀번호
                </label>
                <input
                  type="password"
                  className="u-input"
                  onChange={e => this.props.setPassword(e.target.value)}
                  value={password}
                />
                <small className="u-input-info">
                  그룹 탈퇴를 위해 로그인에 사용되는 비밀번호를 입력하세요.
                </small>
              </div>
              <div className="u-button-row">
                <a
                  className="u-button u-button--is-danger"
                  onClick={() => this.handleSubmit()}
                >
                  탈퇴
                </a>
              </div>
              {alertBlock}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
