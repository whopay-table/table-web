import React, { Component, PropTypes } from 'react';
import GroupForm from 'src/components/GroupForm';
import Header from 'src/components/Header';
import Container from 'src/components/common/Container';
import ContentGroup from 'src/components/common/ContentGroup';
import Title from 'src/components/common/Title';

export default class GroupCreate extends Component {
  static propTypes = {

  };

  render() {
    const {
      createGroup,
      getGroupIndex,
      params,
      paramErrors,
      alert,
      setParams
    } = this.props;

    return (
      <Container
        className="c-group-create"
        type="wrapper"
        isHeadered={true}
      >
        <Header />
        <Container>
          <ContentGroup>
            <Title>
              새 그룹 만들기
            </Title>
          </ContentGroup>
          <ContentGroup>
            <GroupForm
              onSubmit={createGroup}
              getGroupIndex={getGroupIndex}
              params={params}
              paramErrors={paramErrors}
              alert={alert}
              setParams={setParams}
            />
          </ContentGroup>
        </Container>
      </Container>
    );
  }
}
