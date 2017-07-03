import React, { Component, PropTypes } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import GroupHeader from './GroupHeader';

export default class Group extends Component {
  static propTypes = {

  };

  render() {
    const {
      group,
      logout
    } = this.props;

    return (
      <div className="c-group">
        <GroupHeader
          group={group}
          logout={logout}
        />
        <Switch>

        </Switch>
        {JSON.stringify(group)}
      </div>
    );
  }
}
