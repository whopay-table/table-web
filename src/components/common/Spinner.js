import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class Spinner extends Component {
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
          'c-spinner',
          className
        )}
      >
        <i className="fa fa-circle-o-notch fa-spin" />
      </div>
    );
  }
}
