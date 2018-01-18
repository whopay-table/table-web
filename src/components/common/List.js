import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class List extends Component {
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
          'c-list',
          className
        )}
      >
        {children}
      </div>
    );
  }
}
