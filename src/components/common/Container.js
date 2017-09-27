import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class Container extends Component {
  static defaultProps = {
    className: '',
    type: 'default',
    isGroupHeadered: false,
    isHeadered: false,
  };

  render() {
    const {
      children,
      className,
      isGroupHeadered,
      isHeadered,
      type,
    } = this.props;
    return (
      <div
        className={classnames(
          'c-container',
          className,
          `c-container--type-${type}`,
          { 'c-container--is-group-headered': isGroupHeadered },
          { 'c-container--is-headered': isHeadered }
        )}
      >
        {children}
      </div>
    );
  }
}
