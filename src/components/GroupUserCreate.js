import React, { Component, PropTypes } from 'react';
import GroupUserForm from './GroupUserForm';
import Header from './Header';

export default class GroupUserCreate extends Component {
  render() {
    const {
      createUser,
      getUserIdByEmail,
      getUserIdByUsername,
      groupname,
      params,
      paramErrors,
      alert,
      setParams
    } = this.props;

    return (
      <div className="c-group-user-create u-header-container">
        <Header />
        <div className="u-container">
          <div className="c-group-user-create__body">
            <div className="u-page-title">
              {groupname} 그룹에 가입합니다.
            </div>
            <GroupUserForm
              onSubmit={createUser}
              getUserIdByEmail={getUserIdByEmail}
              getUserIdByUsername={getUserIdByUsername}
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
