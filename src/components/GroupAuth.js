import React, { Component, PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import GroupUserCreateContainer from '../containers/GroupUserCreateContainer';
import Login from './Login';

export default class GroupAuth extends Component {
  render() {
    const {
      groupname,
      groupSession,
      login
    } = this.props;

    return (
      <div className="c-group-auth">
        <Switch>
          <Route
            path="/:groupname/users/create"
            component={GroupUserCreateContainer}
          />
          <Route>
            <Login
              groupname={groupname}
              groupSession={groupSession}
              login={login}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}
