import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class Title extends Component {
  static defaultProps = {
    className: '',
    size: 'default',
  };

  render() {
    const {
      children,
      className,
      size,
    } = this.props;
    return (
      <span
        className={classnames(
          'c-title',
          className,
          `c-title--size-${size}`,
        )}
      >
        {children}
      </span>
    );
  }
}
