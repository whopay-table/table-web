import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom';
import Header from './Header';

export default class Home extends Component {
  static propTypes = {};
  static defaultProps = {};

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div className="c-home u-header-container">
        <Header />
        <div className="u-container">
          <div className="c-home__body">
            <div className="c-home__title">
              계좌이체 대신 WHOPAY!
            </div>
            <div className="c-home__text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id leo non purus elementum dictum.
              Maecenas aliquet risus eget convallis gravida. Sed vitae enim ut arcu dictum congue eu non nunc.
            </div>
            <div className="c-home__button-container">
              <Link
                className="c-home__button"
                to="/create"
              >
                새 그룹 만들기
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
