import React, { Component, PropTypes } from 'react';
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
          logout={logout}
        />
        {JSON.stringify(group)}
      </div>
    );
  }
}
