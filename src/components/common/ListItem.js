import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class ListItem extends Component {
  static defaultProps = {
    className: '',
    title: null,
  };

  renderTitle() {
    const {
      title,
    } = this.props;

    return title ? (
      <div className="c-list-item__title">
        {title}
      </div>
    ) : null;
  }

  render() {
    const {
      children,
      className,
    } = this.props;

    return (
      <div
        className={classnames(
          'c-list-item',
          className
        )}
      >
        {this.renderTitle()}
        <div className="c-list-item__content">
          {children}
        </div>
      </div>
    );
  }
}
