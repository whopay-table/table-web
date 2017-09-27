import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class Bar extends Component {
  static defaultProps = {
    className: '',
  };

  render() {
    const {
      children,
      className,
    } = this.props;
    return (
      <div
        className={classnames(
          'c-bar',
          className
        )}
      >
        {children}
      </div>
    );
  }
}
