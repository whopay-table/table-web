import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="c-header">
        <Link to="/">
          <img
            src="/image/titled-logo-wide.png"
            className="c-header__logo"
          />
        </Link>
      </div>
    );
  }
}
