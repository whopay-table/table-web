import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class BarItem extends Component {
  static defaultProps = {
    className: '',
    align: 'left',
  };

  render() {
    const {
      align,
      children,
      className,
    } = this.props;
    return (
      <div
        className={classnames(
          'c-bar-item',
          className,
          `c-bar-item--align-${align}`
        )}
      >
        {children}
      </div>
    );
  }
}
