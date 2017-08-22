import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import LoginForm from './LoginForm';

export default class Login extends Component {
  static propTypes = {

  };

  render() {
    const {
      groupname,
      groupSession,
      login
    } = this.props;

    return (
      <div className="c-login u-header-container">
        <Header />
        <div className="u-container">
          <div className="c-login__body">
            <LoginForm
              groupname={groupname}
              groupSession={groupSession}
              login={login}
            />
            <div className="c-login__small-link">
              <Link
                to={`/${groupname}/users/reset_password`}
              >
                비밀번호를 잊어버리셨나요?
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
