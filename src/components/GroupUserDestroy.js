import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import Alert from 'src/components/common/Alert';
import Bar from 'src/components/common/Bar';
import BarItem from 'src/components/common/BarItem';
import Button from 'src/components/common/Button';
import Container from 'src/components/common/Container';
import ContentGroup from 'src/components/common/ContentGroup';
import GroupHeader from 'src/components/GroupHeader';
import Label from 'src/components/common/Label';
import Title from 'src/components/common/Title';
import Text from 'src/components/common/Text';
import Textbox from 'src/components/common/Textbox';

export default class GroupUserDestroy extends Component {
  static defaultProps = {
    currentUser: {},
    group: {
      users: []
    }
  };

  handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }

    const { destroyUser } = this.props;
    destroyUser();
  }

  render() {
    const {
      currentUser,
      destroyUser,
      group,
      groupname,
      password,
      alert,
      setPassword,
      logout
    } = this.props;

    const alertBlock = alert ? (
      <Alert
        role="danger"
      >
        {alert}
      </Alert>
    ) : null;

    return (
      <Container
        className="c-group-user-destroy"
        type="wrapper"
        isGroupHeadered={true}
      >
        <GroupHeader
          currentUser={currentUser}
          group={group}
          groupname={groupname}
          logout={logout}
          activeMenuItem={'user-destroy'}
        />
        <Container>
          <ContentGroup>
            <Title>
              그룹 탈퇴
            </Title>
            <Text size="small">
              주의: 그룹을 탈퇴하면 거래 기록을 제외한 모든 내 정보가 사라지며,
              현재 내 이메일 주소는 이 그룹에서 다시는 사용할 수 없게 되고,
              이는 복구할 수 없습니다.
            </Text>
          </ContentGroup>
          <ContentGroup>
            <form
              onSubmit={e => this.handleSubmit(e)}
            >
              <ContentGroup size="small">
                <Label>
                  비밀번호
                </Label>
                <Textbox
                  type="password"
                  onChange={e => this.props.setPassword(e.target.value)}
                  value={password}
                />
                <Text size="small">
                  그룹 탈퇴를 위해 로그인에 사용되는 비밀번호를 입력하세요.
                </Text>
              </ContentGroup>
              <Bar>
                <BarItem align="left">
                  <Button
                    role="danger"
                    onClick={() => this.handleSubmit()}
                  >
                    탈퇴
                  </Button>
                </BarItem>
              </Bar>
              {alertBlock}
            </form>
          </ContentGroup>
        </Container>
      </Container>
    );
  }
}
