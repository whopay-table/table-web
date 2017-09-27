import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class Text extends Component {
  static defaultProps = {
    className: '',
    role: 'default',
    size: 'default',
  };

  render() {
    const {
      children,
      className,
      role,
      size,
    } = this.props;
    return (
      <span
        className={classnames(
          'c-text',
          className,
          `c-text--size-${size}`,
          'u-colored-text',
          `u-colored-text--role-${role}`
        )}
      >
        {children}
      </span>
    );
  }
}
