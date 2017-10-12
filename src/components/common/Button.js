import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

export default class Button extends Component {
  static defaultProps = {
    className: '',
    fixedWidth: false,
    isActive: false,
    isBusy: false,
    role: 'default',
    size: 'default',
  };

  renderAnchor(classNames) {
    const {
      children,
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

  renderBusy(classNames) {
    const {
      children,
      href,
      onClick,
    } = this.props;

    return (
      <div
        className={classnames(...classNames)}
      >
        <i className="fa fa-circle-o-notch fa-spin" />
      </div>
    );
  }

  renderLink(classNames) {
    const {
      children,
      onClick,
      to,
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
      fixedWidth,
      href,
      isActive,
      isBusy,
      onClick,
      role,
      size,
      to,
      type,
    } = this.props;

    const classNames = [
      'c-button',
      `c-button--size-${size}`,
      { 'c-button--is-active' : isActive },
      { 'c-button--is-busy' : isBusy },
      { 'c-button--fixed-width' : fixedWidth },
      className,
      'u-colored-background',
      `u-colored-background--role-${role}`,
    ];

    if (isBusy) {
      return this.renderBusy(classNames);
    }

    if (type === 'link') {
      return this.renderLink(classNames);
    } else if (type === 'a') {
      return this.renderAnchor(classNames);
    } else if (type === 'submit') {
      return this.renderSubmit(classNames);
    }

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
