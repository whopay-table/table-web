import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom';

export default class NotFound extends Component {
  static propTypes = {};
  static defaultProps = {};

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div className="c-not-found">
        <div className="u-container">
          This is not the place you're looking for.
        </div>
      </div>
    )
  }
}
