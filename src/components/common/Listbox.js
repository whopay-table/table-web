import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class Listbox extends Component {
  static defaultProps = {
    className: '',
    value: [],
  };

  renderValue() {
    const { value } = this.props;
    return value.map(({ id, label }) => (
      <div
        key={id}
        className="c-listbox__item"
      >
        {label}
      </div>
    ));
  }

  render() {
    const {
      className,
      value,
    } = this.props;

    return (
      <div
        className={classnames(
          'c-listbox',
          className
        )}
      >
        {this.renderValue()}
      </div>
    );
  }
}
