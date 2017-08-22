import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class GroupUserForm extends Component {
  handleEmailBlur(e) {
    if (this.props.params['user[email]']) {
      this.props.getUserIdByEmail(this.props.params['user[email]']);
    }
  }

  handleInputChange(e) {
    this.props.setParams(Object.assign({}, this.props.params, {[e.target.name]: e.target.value}));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit();
  }

  getCreateFormBase() {
    return [
      {
        label: 'Email 주소',
        inputType: 'email',
        name: 'user[email]',
        placeholder: '',
        onBlur: e => this.handleEmailBlur(e),
      },
      {
        label: '이름',
        inputType: 'text',
        name: 'user[name]',
        placeholder: '',
      },
      {
        label: '비밀번호',
        inputType: 'password',
        name: 'user[password]',
        placeholder: '',
      },
      {
        label: '비밀번호 확인',
        inputType: 'password',
        name: 'user[password_confirmation]',
        placeholder: '',
      },
    ];
  }

  getUpdateFormBase() {
    return [
      {
        label: '현재 비밀번호',
        inputType: 'password',
        name: 'password',
        placeholder: '',
        info: '개인정보 수정을 위해 현재 로그인에 사용되는 비밀번호를 입력해주세요.',
      },
      {
        label: 'Email 주소',
        inputType: 'email',
        name: 'user[email]',
        placeholder: '',
        info: 'Email 주소를 수정한 뒤에는 기존 email 주소로는 로그인하실 수 없으니 주의해주세요.',
      },
      {
        label: '이름',
        inputType: 'text',
        name: 'user[name]',
        placeholder: '',
      },
      {
        label: '새 비밀번호',
        inputType: 'password',
        name: 'user[password]',
        placeholder: '',
        info: '비밀번호 수정을 원하지 않으실 경우 비워두시면 됩니다.',
      },
      {
        label: '새 비밀번호 확인',
        inputType: 'password',
        name: 'user[password_confirmation]',
        placeholder: '',
        info: '비밀번호 수정을 원하지 않으실 경우 비워두시면 됩니다.',
      },
    ];
  }

  render() {
    const {
      alert,
      isUpdate,
      params,
      paramErrors,
    } = this.props;

    const formBase = isUpdate ? this.getUpdateFormBase() : this.getCreateFormBase();

    const formGroups = formBase.map(item => {
      const infoBlock = item.info ? (
        <small className="u-input-info">
          {item.info}
        </small>
      ) : null;
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
          <label
            className="u-label"
            htmlFor={`group-user-create-${item.name}`}
          >
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
            readOnly={item.readOnly}
            value={params[item.name]}
          />
          {errorBlock}
          {infoBlock}
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
