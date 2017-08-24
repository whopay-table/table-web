import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

export default class Footer extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="c-footer">
        <div className="c-footer__info">
          WHOPAY<br />
          Copyright © 2017 Whopay Team. All rights reserved.
        </div>
        <div className="c-footer__links">
          <Link
            className="c-footer__link"
            to="/"
          >
            이용약관
          </Link>
        </div>
      </div>
    );
  }
}
