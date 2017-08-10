import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class GroupUserForm extends Component {
  handleEmailBlur(e) {
    if (this.props.params['user[email]']) {
      this.props.getUserIdByEmail(this.props.params['user[email]']);
    }
  }

  handleUsernameBlur(e) {
    if (this.props.params['user[username]']) {
      this.props.getUserIdByUsername(this.props.params['user[username]']);
    }
  }

  handleInputChange(e) {
    this.props.setParams(Object.assign({}, this.props.params, {[e.target.name]: e.target.value}));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit();
  }

  render() {
    const { alert, paramErrors } = this.props;

    const formBase = [
      {
        label: 'Email 주소',
        inputType: 'email',
        name: 'user[email]',
        placeholder: '',
        onBlur: e => this.handleEmailBlur(e)
      },
      {
        label: 'ID',
        inputType: 'text',
        name: 'user[username]',
        placeholder: '',
        onBlur: e => this.handleUsernameBlur(e)
      },
      {
        label: '이름',
        inputType: 'text',
        name: 'user[name]',
        placeholder: ''
      },
      {
        label: '비밀번호',
        inputType: 'password',
        name: 'user[password]',
        placeholder: ''
      },
      {
        label: '비밀번호 확인',
        inputType: 'password',
        name: 'user[password_confirmation]',
        placeholder: ''
      },
    ];

    const formGroups = formBase.map(item => {
      const errorBlock = paramErrors[item.name] ? (
        <span className="u-help-block">
          {paramErrors[item.name]}
        </span>
      ) : null;
      return (
        <div
          key={item.name}
          className={classnames(
            'u-input-group',
            { 'has-error': paramErrors[item.name] }
          )}
        >
          <label htmlFor={`group-user-create-${item.name}`}>
            {item.label}
          </label>
          <input
            type={item.inputType}
            className="u-input"
            id={`group-user-create-${item.name}`}
            name={item.name}
            placeholder={item.placeholder}
            onChange={e => this.handleInputChange(e)}
            onBlur={item.onBlur}
          />
          {errorBlock}
        </div>
      );
    });

    const alertBlock = alert ? (
      <div className="alert alert-danger" role="alert">
        {alert}
      </div>
    ) : null;

    return (
      <form
        className="c-group-user-form"
        onSubmit={e => this.handleSubmit(e)}
      >
        {formGroups}
        {alertBlock}
        <input
          type="submit"
          className="btn btn-default"
          value="확인"
        />
      </form>
    );
  }
}
