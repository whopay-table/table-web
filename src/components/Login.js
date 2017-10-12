import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import Header from 'src/components/Header';
import LoginForm from 'src/components/LoginForm';
import ContentGroup from 'src/components/common/ContentGroup';

export default class Login extends Component {
  static propTypes = {

  };

  render() {
    const {
      groupname,
      groupSession,
      login,
      isWaitingLogin,
    } = this.props;

    return (
      <div className="c-login u-header-container">
        <Header />
        <div className="u-container">
          <div className="c-login__body">
            <ContentGroup>
              <LoginForm
                groupname={groupname}
                groupSession={groupSession}
                login={login}
                isWaitingLogin={isWaitingLogin}
              />
            </ContentGroup>
            <ContentGroup>
              <div className="c-login__small-link">
                <Link
                  to={`/${groupname}/users/reset_password`}
                >
                  비밀번호를 잊어버리셨나요?
                </Link>
              </div>
            </ContentGroup>
          </div>
        </div>
      </div>
    );
  }
}
