import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Bar from 'src/components/common/Bar';
import BarItem from 'src/components/common/BarItem';
import Button from 'src/components/common/Button';
import Container from 'src/components/common/Container';
import ContentGroup from 'src/components/common/ContentGroup';
import GroupHeader from 'src/components/GroupHeader';
import Spinner from 'src/components/common/Spinner';
import Title from 'src/components/common/Title';
import List from 'src/components/common/List';
import ListItem from 'src/components/common/ListItem';


export default class GroupUsers extends Component {
  renderUsers() {
    const {
      group,
    } = this.props;

    return group ? group.users.map(user => (
      <ListItem
        key={user.email}
        title={user.name}
      >
        {user.email}
      </ListItem>
    )) : <Spinner />;
  }

  render() {
    const {
      currentUser,
      group,
      groupname,
      logout,
    } = this.props;

    return currentUser ? (
      <Container
        className="c-group-users"
        type="wrapper"
        isGroupHeadered={true}
      >
        <GroupHeader
          currentUser={currentUser}
          group={group}
          groupname={groupname}
          logout={logout}
          activeMenuItem="users"
        />
        <Container>
          <ContentGroup>
            <Title>
              유저 관리
            </Title>
          </ContentGroup>
          <ContentGroup>
            <List>
              {this.renderUsers()}
            </List>
          </ContentGroup>
        </Container>
      </Container>
    ) : <Spinner />;
  }
}
