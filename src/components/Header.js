import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import * as Server from '../../configs/server';

const HOSTNAME = window.location.hostname;
const DOMAIN = Server.domain;
const IS_PROD_DOMAIN = HOSTNAME.endsWith(DOMAIN);

export default class Header extends Component {
  static propTypes = {

  };

  render() {
    const logoBody = (
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
    );

    const logo = IS_PROD_DOMAIN ? (
      <a href={`//${DOMAIN}`}>
        {logoBody}
      </a>
    ) : (
      <Link to="/">
        {logoBody}
      </Link>
    );

    return (
      <div className="c-header">
        {logo}
      </div>
    );
  }
}
