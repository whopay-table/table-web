import React, { Component, PropTypes } from 'react';
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
