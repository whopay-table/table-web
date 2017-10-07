import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class Text extends Component {
  static defaultProps = {
    className: '',
    role: 'default',
    size: 'default',
    tag: 'span',
  };

  render() {
    const {
      children,
      className,
      role,
      size,
      tag,
    } = this.props;

    const classNames = classnames(
      'c-text',
      className,
      `c-text--size-${size}`,
      'u-colored-text',
      `u-colored-text--role-${role}`
    );
    if (tag === 'span') {
      return (
        <span
          className={classNames}
        >
          {children}
        </span>
      );
    } else if (tag === 'div') {
      return (
        <div
          className={classNames}
        >
          {children}
        </div>
      );
    } else {
      const Tag = tag;
      return (
        <Tag
          className={classNames}
        >
          {children}
        </Tag>
      );
    }

  }
}
