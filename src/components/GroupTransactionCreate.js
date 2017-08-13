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
      alert,
      currentUser,
      isFromCurrentUser,
      group,
      groupname,
      params,
      paramErrors,
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
          activeMenuItem={isFromCurrentUser ? 'transactions-create' : 'transaction-request-create'}
        />
        <div className="u-container">
          <div className="c-group-transaction-create__body u-page-body">
            <div className="u-page-title">
              {title}
            </div>
            <GroupTransactionForm
              alert={alert}
              params={params}
              paramErrors={paramErrors}
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
