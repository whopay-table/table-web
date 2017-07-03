import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

const LOGIN_PARAMS = {
  email: '',
  password: ''
};

export default class LoginForm extends Component {
  static propTypes = {

  };

  state = {
    params: LOGIN_PARAMS
  };

  handleInputChange(e) {
    this.setState({ params: Object.assign({}, this.state.params, {[e.target.name]: e.target.value}) })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state.params;
    this.props.login(email, password);
  }

  render() {
    const { groupname, groupSession } = this.props;
    const isLoginFailed = groupSession === false;

    const formBase = [
      {
        label: 'Email',
        inputType: 'text',
        name: 'email',
        placeholder: '',
      },
      {
        label: '비밀번호',
        inputType: 'password',
        name: 'password',
        placeholder: ''
      }
    ];

    const formGroups = formBase.map(item => {
      return (
        <div
          key={item.name}
          className={classnames(
            'u-input-group'
          )}
        >
          <label
            className="u-label"
            htmlFor={`group-create-${item.name}`}
          >
            {item.label}
          </label>
          <input
            type={item.inputType}
            className="u-input"
            id={`group-create-${item.name}`}
            name={item.name}
            placeholder={item.placeholder}
            onChange={e => this.handleInputChange(e)}
            onBlur={item.onBlur}
          />
        </div>
      );
    });

    const alertBlock = isLoginFailed ? (
      <div className="alert alert-danger" role="alert">
        로그인에 실패했습니다. Email과 비밀번호를 확인하고 다시 시도해주세요.
      </div>
    ) : null;

    return (
      <form
        className="c-group-form"
        onSubmit={e => this.handleSubmit(e)}
      >
        <div className="c-login__form-title">
          <span className="c-login__group-title">
            {groupname}
          </span>
          그룹에 로그인 합니다.
        </div>
        {formGroups}
        {alertBlock}
        <div className="u-button-row">
          <a
            className="u-button"
            onClick={e => this.handleSubmit(e)}
          >
            로그인
          </a>
        </div>
      </form>
    );
  }
}
