import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import Alert from 'src/components/common/Alert';
import Bar from 'src/components/common/Bar';
import BarItem from 'src/components/common/BarItem';
import Button from 'src/components/common/Button';
import ContentGroup from 'src/components/common/ContentGroup';
import Label from 'src/components/common/Label';
import Textbox from 'src/components/common/Textbox';

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
    const {
      groupname,
      groupSession,
      isWaitingLogin,
    } = this.props;
    const {
      params
    } = this.state;
    const isLoginFailed = groupSession === false;

    const formBase = [
      {
        label: 'Email',
        inputType: 'email',
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
        <ContentGroup
          key={item.name}
          size="small"
        >
          <Label>
            {item.label}
          </Label>
          <Textbox
            type={item.inputType}
            name={item.name}
            placeholder={item.placeholder}
            onChange={e => this.handleInputChange(e)}
            onBlur={item.onBlur}
            value={params[item.name]}
          />
        </ContentGroup>
      );
    });

    const alertBlock = isLoginFailed ? (
      <ContentGroup>
        <Alert role="danger">
          로그인에 실패했습니다. Email과 비밀번호를 확인하고 다시 시도해주세요.
        </Alert>
      </ContentGroup>
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
        <Bar>
          <BarItem align="left">
            <Button
              isBusy={isWaitingLogin}
              type="submit"
            >
              로그인
            </Button>
          </BarItem>
        </Bar>
      </form>
    );
  }
}
