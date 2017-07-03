import React, { Component, PropTypes } from 'react';
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
        <LoginForm
          groupname={groupname}
          groupSession={groupSession}
          login={login}
        />
        <div className="u-container">
          <div className="c-login__body">

          </div>
        </div>
      </div>
    );
  }
}
