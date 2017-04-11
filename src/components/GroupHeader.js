import React, { Component, PropTypes } from 'react';

export default class GroupHeader extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="c-group-header">
        <a
          onClick={() => this.props.logout()}
        >
          로그아웃
        </a>
      </div>
    );
  }
}
