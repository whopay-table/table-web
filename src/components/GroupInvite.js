import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import GroupHeader from './GroupHeader';

export default class GroupInvite extends Component {
  static defaultProps = {
    currentUser: {},
    group: {
      users: []
    }
  };

  getSignupLink() {
    const { group } = this.props;
    return `${window.location.origin}/${group.groupname}/users/create?signupkey=${group.signupKey}`;
  }

  render() {
    const {
      currentUser,
      group,
      groupname,
      logout
    } = this.props;

    return (
      <div className="c-group-invite u-group-header-container">
        <GroupHeader
          group={group}
          groupname={groupname}
          logout={logout}
          activeMenuItem="invite"
        />
        <div className="u-container">
          <div className="c-group-invite__body">
            <div className="u-page-title">
              그룹 초대하기
            </div>
            <div
              className={classnames(
                'u-input-group'
              )}
            >
              <label htmlFor="group-invite-signup-link">
                초대하고 싶은 사람에게 아래 그룹 가입 링크를 공유하세요.
              </label>
              <input
                id="group-invite-signup-link"
                type="text"
                className="u-input"
                value={this.getSignupLink()}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
