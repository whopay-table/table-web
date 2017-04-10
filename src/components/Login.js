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
      <div className="c-login">
        Login
        <Header />
        <LoginForm
          groupname={groupname}
          groupSession={groupSession}
          login={login}
        />
      </div>
    );
  }
}
