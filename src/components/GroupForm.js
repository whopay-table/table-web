import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import Config from '../config';

const DOMAIN = Config.WEB_DOMAIN;

export default class GroupForm extends Component {
  handleGroupnameBlur(e) {
    if (this.props.params['group[groupname]']) {
      this.props.getGroupIndex(this.props.params['group[groupname]']);
    }
  }

  handleInputChange(e) {
    this.props.setParams(Object.assign({}, this.props.params, {[e.target.name]: e.target.value}));
  }

  handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }
    this.props.onSubmit();
  }

  renderFormGroup(item) {
    const { alert, params, paramErrors } = this.props;

    const errorBlock = paramErrors[item.name] ? (
      <span className="u-help-block">
        {paramErrors[item.name]}
      </span>
    ) : null;
    const infoBlock = item.info ? (
      <small className="u-input-info">
        {item.info}
      </small>
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
          autoCapitalize={item.autoCapitalize || 'sentences'}
          value={params[item.name]}
        />
        {errorBlock}
        {infoBlock}
      </div>
    );
  }

  render() {
    const { alert, params, paramErrors } = this.props;

    const groupFormBase = [
      {
        label: '그룹 ID',
        inputType: 'text',
        name: 'group[groupname]',
        placeholder: '',
        autoCapitalize: 'none',
        onBlur: e => this.handleGroupnameBlur(e),
        info: `${params['group[groupname]']}.${DOMAIN} 로 나중에 접속하시게 됩니다.`,
      },
      {
        label: '그룹 이름',
        inputType: 'text',
        name: 'group[title]',
        placeholder: '',
        info: '그룹 페이지에 표시될 그룹 이름입니다.',
      },
    ];
    const userFormBase = [
      {
        label: 'Email 주소',
        inputType: 'email',
        name: 'user[email]',
        placeholder: '',
        info: '로그인에 사용할 개인 email 주소를 입력하세요.',
      },
      {
        label: '이름',
        inputType: 'text',
        name: 'user[name]',
        placeholder: '',
        info: '본인의 이름을 입력하세요.',
      },
      {
        label: '비밀번호',
        inputType: 'password',
        name: 'user[password]',
        placeholder: '',
        info: '로그인에 사용할 개인 비밀번호를 입력하세요.',
      },
      {
        label: '비밀번호 확인',
        inputType: 'password',
        name: 'user[password_confirmation]',
        placeholder: '',
        info: '로그인에 사용할 개인 비밀번호를 입력하세요.',
      },
    ];

    const groupFormGroups = groupFormBase.map(item => this.renderFormGroup(item));
    const userFormGroups = userFormBase.map(item => this.renderFormGroup(item));

    const alertBlock = alert ? (
      <div className="u-alert">
        {alert}
      </div>
    ) : null;

    return (
      <form
        className="c-group-form"
        onSubmit={e => this.handleSubmit(e)}
      >
        <div className="u-form-subtitle">
          그룹 정보
        </div>
        {groupFormGroups}
        <div className="u-form-subtitle">
          내 정보
        </div>
        {userFormGroups}
        {alertBlock}
        <input
          type="submit"
          className="u-no-display"
        />
        <div className="u-button-row">
          <Link
            className="u-button u-button--is-cancel"
            to="/"
          >
            취소
          </Link>
          <a
            className="u-button"
            onClick={e => this.handleSubmit(e)}
          >
            확인
          </a>
        </div>
      </form>
    );
  }
}
