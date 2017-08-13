import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="c-header">
        <Link to="/">
          <div className="c-group-header__logo-block">
            <img
              src="/image/colored-logo.png"
              className="c-header__logo"
            />
            <div className="c-header__title">
              <span className="c-header__app-title">
                WHOPAY
              </span>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
