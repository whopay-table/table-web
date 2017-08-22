import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import GroupUserForm from './GroupUserForm';
import GroupHeader from './GroupHeader';

export default class GroupUserUpdate extends Component {
  static defaultProps = {
    currentUser: {},
    group: {
      users: []
    }
  };

  render() {
    const {
      currentUser,
      updateUser,
      getUserIdByEmail,
      group,
      groupname,
      params,
      paramErrors,
      alert,
      setParams,
      logout
    } = this.props;

    return (
      <div className="c-group-user-update u-group-header-container">
        <GroupHeader
          currentUser={currentUser}
          group={group}
          groupname={groupname}
          logout={logout}
          activeMenuItem={'user-update'}
        />
        <div className="u-container">
          <div className="c-group-user-update__body">
            <div className="u-page-title">
              개인정보 수정
            </div>
            <div className="u-input-group">
              <div className="u-label">
                그룹 탈퇴
              </div>
              <div className="u-button-row">
                <Link
                  to={`/${groupname}/me/destroy`}
                  className="u-button u-button--left-align u-button--is-danger"
                >
                  그룹 탈퇴
                </Link>
              </div>
            </div>
            <GroupUserForm
              isUpdate={true}
              onSubmit={updateUser}
              getUserIdByEmail={getUserIdByEmail}
              params={params}
              paramErrors={paramErrors}
              alert={alert}
              setParams={setParams}
            />
          </div>
        </div>
      </div>
    );
  }
}
