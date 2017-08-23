import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom';
import Header from './Header';

export default class NotFound extends Component {
  static propTypes = {};
  static defaultProps = {};

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div className="c-not-found u-header-container">
        <Header />
        <div className="u-container">
          <div className="c-not-found__body">
            <i className="fa fa-exclamation-triangle" />
            &nbsp;
            알 수 없는 주소<br />
            <br />
            여기엔 보여드릴 정보가 없습니다.<br />
            <br />
            <Link
              to="/"
              className="u-button u-button--left-align"
            >
              메인화면으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
