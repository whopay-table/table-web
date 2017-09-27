import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class Alert extends Component {
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
          'c-alert',
          className
        )}
      >
        <div
          className={classnames(
            'c-alert__body',
            'u-colored-text',
            `u-colored-text--role-${role}`
          )}
        >
          {children}
        </div>
      </div>
    );
  }
}
