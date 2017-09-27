import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

export default class Button extends Component {
  static defaultProps = {
    className: '',
    role: 'default',
    type: 'link',
  };

  renderAnchor(classNames) {
    const {
      children,
      role,
      href,
      onClick,
    } = this.props;

    return (
      <a
        className={classnames(...classNames)}
        href={href}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  renderLink(classNames) {
    const {
      children,
      role,
      to,
      onClick,
    } = this.props;

    return (
      <Link
        className={classnames(...classNames)}
        to={to}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  renderSubmit(classNames) {
    const {
      children,
      role,
      onClick,
    } = this.props;

    return (
      <input
        type="submit"
        className={classnames(...classNames)}
        onClick={onClick}
        value={children}
      />
    );
  }

  render() {
    const {
      className,
      href,
      onClick,
      role,
      to,
    } = this.props;

    const classNames = [
      'c-button',
      className,
      'u-colored-background',
      `u-colored-background--role-${role}`,
    ];

    if (href) {
      return this.renderAnchor(classNames);
    } else if (to) {
      return this.renderLink(classNames);
    } else if (onClick) {
      return this.renderAnchor(classNames);
    } else {
      return this.renderSubmit(classNames);
    }
  }
}
