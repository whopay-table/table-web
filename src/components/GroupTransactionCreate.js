import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import Container from 'src/components/common/Container';
import ContentGroup from 'src/components/common/ContentGroup';
import GroupHeader from 'src/components/GroupHeader';
import GroupTransactionForm from 'src/components/GroupTransactionForm';
import Text from 'src/components/common/Text';
import Title from 'src/components/common/Title';

export default class GroupTransactionCreate extends Component {
  static defaultProps = {
    currentUser: {},
    group: {
      users: []
    }
  };

  state = {
    redirectToHome: false,
  };

  handleCancel = () => {
    this.setState({ redirectToHome: true });
  };

  render() {
    const {
      alert,
      alertRole,
      currentUser,
      isFromCurrentUser,
      isWaitingCreateTransaction,
      group,
      groupname,
      params,
      paramErrors,
      createTransaction,
      setParams,
      logout
    } = this.props;
    const {
      redirectToHome,
    } = this.state;

    const title = isFromCurrentUser ? '보내기' : '받기';
    const description = isFromCurrentUser ? '돈을 보냅니다.' : '돈을 받습니다.';

    const redirector = redirectToHome ? <Redirect push to={`/${groupname}/`} /> : null;

    return (
      <Container
        className="c-group-transaction-create"
        type="wrapper"
        isGroupHeadered={true}
      >
        {redirector}
        <GroupHeader
          currentUser={currentUser}
          group={group}
          groupname={groupname}
          logout={logout}
          activeMenuItem={isFromCurrentUser ? 'transaction-create' : 'transaction-request-create'}
        />
        <Container>
          <ContentGroup>
            <Title>
              {title}
            </Title>
            <Text size="small">
              {description}
            </Text>
          </ContentGroup>
          <ContentGroup>
            <GroupTransactionForm
              alert={alert}
              alertRole={alertRole}
              params={params}
              paramErrors={paramErrors}
              currentUser={currentUser}
              isFromCurrentUser={isFromCurrentUser}
              isWaitingSubmit={isWaitingCreateTransaction}
              group={group}
              setParams={setParams}
              onSubmit={createTransaction}
              onCancel={() => this.handleCancel()}
            />
          </ContentGroup>
        </Container>
      </Container>
    );
  }
}
