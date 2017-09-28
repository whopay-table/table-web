import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Container from 'src/components/common/Container';
import GroupHeader from 'src/components/GroupHeader';
import GroupTransactionForm from 'src/components/GroupTransactionForm';
import Title from 'src/components/common/Title';

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
      <Container
        className="c-group-transaction-create"
        type="wrapper"
        isGroupHeadered={true}
      >
        <GroupHeader
          currentUser={currentUser}
          group={group}
          groupname={groupname}
          logout={logout}
          activeMenuItem={isFromCurrentUser ? 'transactions-create' : 'transaction-request-create'}
        />
        <Container>
          <Title>
            {title}
          </Title>
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
        </Container>
      </Container>
    );
  }
}
