import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class Badge extends Component {
  static defaultProps = {
    className: '',
    role: 'default',
  };

  render() {
    const {
      children,
      className,
      role,
    } = this.props;
    return (
      <div
        className={classnames(
          'c-badge',
          className,
          'u-colored-background',
          `u-colored-background--role-${role}`
        )}
      >
        {children}
      </div>
    );
  }
}
