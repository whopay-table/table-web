import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import GroupHeader from './GroupHeader';
import GroupTransactionForm from './GroupTransactionForm';

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
      isFromCurrentUser,
      group,
      groupname,
      params,
      createTransaction,
      setParams,
      logout
    } = this.props;

    const title = isFromCurrentUser ? '송금' : '송금 요청';

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
              {title}
            </div>
            <GroupTransactionForm
              params={params}
              currentUser={currentUser}
              isFromCurrentUser={isFromCurrentUser}
              group={group}
              setParams={setParams}
              onSubmit={createTransaction}
            />
          </div>
        </div>
      </div>
    );
  }
}
