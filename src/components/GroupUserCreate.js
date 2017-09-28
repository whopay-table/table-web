import React, { Component, PropTypes } from 'react';
import Container from 'src/components/common/Container';
import Header from 'src/components/Header';
import GroupUserForm from 'src/components/GroupUserForm';
import Title from 'src/components/common/Title';

export default class GroupUserCreate extends Component {
  render() {
    const {
      createUser,
      getUserIdByEmail,
      groupname,
      params,
      paramErrors,
      alert,
      setParams,
    } = this.props;

    return (
      <Container
        className="c-group-user-create"
        type="wrapper"
        isHeadered={true}
      >
        <Header />
        <Container>
          <Title>
            {groupname} 그룹에 가입합니다.
          </Title>
          <GroupUserForm
            onSubmit={createUser}
            getUserIdByEmail={getUserIdByEmail}
            params={params}
            paramErrors={paramErrors}
            alert={alert}
            setParams={setParams}
          />
        </Container>
      </Container>
    );
  }
}
