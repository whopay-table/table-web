import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class ContentGroup extends Component {
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
      <div
        className={classnames(
          'c-content-group',
          className,
          `c-content-group--size-${size}`
        )}
      >
        {children}
      </div>
    );
  }
}
