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
          className,
          'u-colored-background',
          `u-colored-background--role-${role}`
        )}
      >
        <div
          className={classnames(
            'c-alert__body'
          )}
        >
          {children}
        </div>
      </div>
    );
  }
}
