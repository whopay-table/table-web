import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class Label extends Component {
  static defaultProps = {
    className: '',
    isRequired: false,
  };

  render() {
    const {
      children,
      className,
      isRequired,
    } = this.props;

    const requiredIcon = isRequired ? (
      <div
        className="c-label__required-icon"
      >
        *
      </div>
    ) : null;

    return (
      <label
        className={classnames(
          'c-label',
          className
        )}
      >
        {children}
        {requiredIcon}
      </label>
    );
  }
}
