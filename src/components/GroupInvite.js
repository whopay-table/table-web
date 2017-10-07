import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Alert from 'src/components/common/Alert';
import Button from 'src/components/common/Button';
import Container from 'src/components/common/Container';
import ContentGroup from 'src/components/common/ContentGroup';
import GroupHeader from 'src/components/GroupHeader';
import Label from 'src/components/common/Label';
import Title from 'src/components/common/Title';
import Textbox from 'src/components/common/Textbox';

export default class GroupInvite extends Component {
  static defaultProps = {
    currentUser: {},
    group: {
      users: []
    }
  };

  state = {
    visibleMessage: null,
  };

  getSignupLink() {
    const { group } = this.props;
    return `${window.location.origin}/${group.groupname}/users/create?signupkey=${group.signupKey}`;
  }

  copySignupLink = () => {
    this.signupLinkTextbox.select();

    try {
      if (document.execCommand('copy')) {
        this.setState({ visibleMessage: 'done' });
      } else {
        this.setState({ visibleMessage: 'failed' });
      }
    } catch (err) {
      this.setState({ visibleMessage: 'failed' });
    }
  };

  renderMessage() {
    const { visibleMessage } = this.state;
    let role = 'default';
    let messageBody = null;
    if (visibleMessage === 'done') {
      role = 'success';
      messageBody = '링크가 클립보드에 복사되었습니다.';
    } else if (visibleMessage === 'failed') {
      role = 'danger';
      messageBody = '사용하시는 브라우저가 클립보드 접근을 허용하지 않습니다.';
    }
    return visibleMessage ? (
      <ContentGroup>
        <Alert
          role={role}
        >
          {messageBody}
        </Alert>
      </ContentGroup>
    ) : null;
  }

  render() {
    const {
      currentUser,
      group,
      groupname,
      logout
    } = this.props;

    return (
      <Container
        className="c-group-invide"
        type="wrapper"
        isGroupHeadered={true}
      >
        <GroupHeader
          currentUser={currentUser}
          group={group}
          groupname={groupname}
          logout={logout}
          activeMenuItem="invite"
        />
        <Container>
          <ContentGroup>
            <Title>
              친구 초대하기
            </Title>
          </ContentGroup>
          <ContentGroup>
            <Label>
              초대하고 싶은 사람에게 아래 그룹 가입 링크를 공유하세요.
            </Label>
            <Textbox
              ref={e => this.signupLinkTextbox = e}
              type="text"
              value={this.getSignupLink()}
            />
          </ContentGroup>
          {this.renderMessage()}
          <ContentGroup>
            <Button
              onClick={() => this.copySignupLink()}
            >
              링크 복사하기
            </Button>
          </ContentGroup>
        </Container>
      </Container>
    );
  }
}
