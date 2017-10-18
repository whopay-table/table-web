import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import Alert from 'src/components/common/Alert';
import Bar from 'src/components/common/Bar';
import BarItem from 'src/components/common/BarItem';
import Button from 'src/components/common/Button';
import Config from 'src/config';
import ContentGroup from 'src/components/common/ContentGroup';
import Label from 'src/components/common/Label';
import Title from 'src/components/common/Title';
import Text from 'src/components/common/Text';
import Textbox from 'src/components/common/Textbox';

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
      <ContentGroup size="small">
        <Text
          tag="div"
          size="small"
          role="danger"
        >
          {paramErrors[item.name]}
        </Text>
      </ContentGroup>
    ) : null;
    const infoBlock = item.info ? (
      <ContentGroup size="small">
        <Text
          tag="div"
          size="small"
        >
          {item.info}
        </Text>
      </ContentGroup>
    ) : null;
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
          autoCapitalize={item.autoCapitalize}
          value={params[item.name]}
        />
        {errorBlock}
        {infoBlock}
      </ContentGroup>
    );
  }

  render() {
    const {
      alert,
      alertRole,
      isWaitingSubmit,
      params,
      paramErrors,
    } = this.props;

    const groupFormBase = [
      {
        label: '그룹 ID',
        inputType: 'text',
        name: 'group[groupname]',
        placeholder: '',
        onBlur: e => this.handleGroupnameBlur(e),
        info: `${params['group[groupname]']}.${DOMAIN} 로 나중에 접속하시게 됩니다.`,
      },
      {
        label: '그룹 이름',
        inputType: 'text',
        name: 'group[title]',
        placeholder: '',
        autoCapitalize: true,
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
        autoCapitalize: true,
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
      <ContentGroup>
        <Alert
          role={alertRole || 'default'}
        >
          {alert}
        </Alert>
      </ContentGroup>
    ) : null;

    return (
      <form
        className="c-group-form"
        onSubmit={e => this.handleSubmit(e)}
      >
        <ContentGroup>
          <Title size="small">
            그룹 정보
          </Title>
        </ContentGroup>
        <ContentGroup>
          {groupFormGroups}
        </ContentGroup>
        <ContentGroup>
          <Title size="small">
            내 정보
          </Title>
        </ContentGroup>
        <ContentGroup>
          {userFormGroups}
        </ContentGroup>
        <ContentGroup>
          <Bar>
            <BarItem align="left">
              <Button
                isBusy={isWaitingSubmit}
                type="submit"
              >
                확인
              </Button>
            </BarItem>
            <BarItem align="left">
              <Button
                to="/"
                role="warning"
              >
                취소
              </Button>
            </BarItem>
          </Bar>
        </ContentGroup>
        {alertBlock}
      </form>
    );
  }
}
