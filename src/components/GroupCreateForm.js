import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class GroupForm extends Component {
  static propTypes = {

  };

  handleGroupnameBlur(e) {
    if (this.props.params['group[groupname]']) {
      this.props.getGroupIndex(this.props.params['group[groupname]']);
    }
  }

  handleInputChange(e) {
    this.props.setParams(Object.assign({}, this.props.params, {[e.target.name]: e.target.value}));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createGroup();
  }

  render() {
    const { alert, paramErrors } = this.props;

    const formBase = [
      {
        label: '그룹 ID',
        inputType: 'text',
        name: 'group[groupname]',
        placeholder: '',
        onBlur: e => this.handleGroupnameBlur(e)
      },
      {
        label: '그룹 이름',
        inputType: 'text',
        name: 'group[title]',
        placeholder: ''
      },
      {
        label: 'Email 주소',
        inputType: 'email',
        name: 'user[email]',
        placeholder: ''
      },
      {
        label: 'ID',
        inputType: 'text',
        name: 'user[username]',
        placeholder: ''
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
        <span className="help-block">
          {paramErrors[item.name]}
        </span>
      ) : null;
      return (
        <div
          key={item.name}
          className={classnames(
            'form-group',
            { 'has-error': paramErrors[item.name] }
          )}
        >
          <label htmlFor={`group-create-${item.name}`}>
            {item.label}
          </label>
          <input
            type={item.inputType}
            className="form-control"
            id={`group-create-${item.name}`}
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
        className="c-group-form"
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