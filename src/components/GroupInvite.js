import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

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

  getSignupLink() {
    const { group } = this.props;
    return `${window.location.origin}/${group.groupname}/users/create?signupkey=${group.signupKey}`;
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
              그룹 초대하기
            </Title>
          </ContentGroup>
          <ContentGroup>
            <Label>
              초대하고 싶은 사람에게 아래 그룹 가입 링크를 공유하세요.
            </Label>
            <Textbox
              type="text"
              value={this.getSignupLink()}
              readOnly={true}
            />
          </ContentGroup>
        </Container>
      </Container>
    );
  }
}
