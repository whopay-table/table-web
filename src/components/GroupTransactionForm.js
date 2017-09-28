import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
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

export default class GroupTransactionForm extends Component {
  handleInputChange = e => {
    this.props.setParams(Object.assign({}, this.props.params, {[e.target.name]: e.target.value}));
  };

  handleTotalAmountClick = v => {
    if (v) {
      const amount = this.props.params['transaction[amount]'];
      this.props.setParams(Object.assign({}, this.props.params, {
        'totalAmount': amount === '' ? '' : amount,
        'transaction[amount]': amount === '' ? '' : this.calcAmount(parseInt(amount)) + '',
      }));
    } else {
      this.props.setParams(Object.assign({}, this.props.params, {
        'totalAmount': null,
        'transaction[amount]': this.props.params.totalAmount || '',
      }));
    }
  };

  handleTotalAmountChange = e => {
    const value = e.target.value;
    this.props.setParams(Object.assign({}, this.props.params, {
      'totalAmount': value,
      'transaction[amount]': value === '' ? '' : this.calcAmount(parseInt(value)) + '',
    }));
  }

  handleAddFromUser(userId) {
    const { params } = this.props;
    const fromUserIds = JSON.parse(params[`transaction[from_user_ids]`]);
    if (!fromUserIds.includes(userId)) {
      this.props.setParams(Object.assign({}, params, {
        'transaction[from_user_ids]': JSON.stringify(fromUserIds.concat([userId]))
      }, params.totalAmount !== null ? {
        'transaction[amount]': (params.totalAmount === '' ? '' :
          parseInt(parseInt(params.totalAmount) / (fromUserIds.length + 2)))
      } : {}));
    }
  }

  handleClearFromUser() {
    const { params } = this.props;
    this.props.setParams(Object.assign({}, params, {
      'transaction[from_user_ids]': '[]'
    }, params.totalAmount !== null ? {
      'transaction[amount]': params.totalAmount
    } : {}));
  }

  handleSelectToUser(userId) {
    const { params } = this.props;
    this.props.setParams(Object.assign({}, params, {
      'transaction[to_user_id]': userId
    }));
  }

  handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }
    this.props.onSubmit();
  }

  handleCancel() {
    this.props.onCancel();
  }

  calcAmount(totalAmount) {
    const userCount = JSON.parse(this.props.params['transaction[from_user_ids]']).length;
    return userCount === 0 ? totalAmount : parseInt(totalAmount / (userCount + 1));
  }

  getUserNameById(userId) {
    const {
      group,
    } = this.props;
    const filteredUsers = group.users.filter(user => user.id === userId);
    if (filteredUsers.length > 0) {
      return filteredUsers[0].name;
    } else {
      return '';
    }
  }

  renderToUserSelector() {
    const {
      currentUser,
      group,
      params,
    } = this.props;

    const userSelectorButtons = group.users.filter(user => user.id !== currentUser.id).map(user => (
      <a
        key={user.id}
        className="u-input-selector__button"
        onClick={() => this.handleSelectToUser(user.id)}
      >
        {user.name}
      </a>
    ));

    return (
      <ContentGroup size="small">
        <Label>
          내게 송금받는 사람
        </Label>
        <Textbox
          value={this.getUserNameById(params[`transaction[to_user_id]`])}
        />
        <div className="u-input-selector">
          {userSelectorButtons}
        </div>
        <Text size="small">
          버튼을 눌러 사람을 선택하세요.
        </Text>
      </ContentGroup>
    );
  }

  renderFromUserSelector() {
    const {
      currentUser,
      group,
      params,
    } = this.props;

    const userSelectorButtons = group.users.filter(user => user.id !== currentUser.id).map(user => (
      <a
        key={user.id}
        className="u-input-selector__button"
        onClick={() => this.handleAddFromUser(user.id)}
      >
        {user.name}
      </a>
    ));

    const fromUserIds = JSON.parse(params[`transaction[from_user_ids]`]);
    const fromUserNamesString = fromUserIds.map(uid => this.getUserNameById(uid)).join(', ');

    return (
      <ContentGroup size="small">
        <Label>
          내게 송금할 사람
        </Label>
        <Textbox
          value={fromUserNamesString}
        />
        <div className="u-input-selector">
          {userSelectorButtons}
          <a
            className="u-input-selector__button"
            onClick={() => this.handleClearFromUser()}
          >
            리셋
          </a>
        </div>
        <Text size="small">
          버튼을 눌러 사람을 선택하세요.
        </Text>
      </ContentGroup>
    );
  }

  renderAmountTypeSelector() {
    const { params } = this.props;
    return (
      <ContentGroup size="small">
        <Label>
          금액 입력 방법
        </Label>
        <Bar>
          <BarItem align="left">
            <Button
              isActive={params.totalAmount !== null}
              onClick={() => this.handleTotalAmountClick(true)}
            >
              전체 금액 입력해서 1/N 하기
            </Button>
          </BarItem>
          <BarItem align="left">
            <Button
              isActive={params.totalAmount === null}
              onClick={() => this.handleTotalAmountClick(false)}
            >
              전체 금액 입력해서 1/N 하기
            </Button>
          </BarItem>
        </Bar>
      </ContentGroup>
    );
  }

  renderAmountLabel() {
    const {
      params,
      isFromCurrentUser,
    } = this.props;

    if (isFromCurrentUser) {
      return '내가 보낼 금액';
    } else if (params.totalAmount !== null) {
      return '1/N 할 전체 금액';
    } else {
      return '한 사람당 내가 받을 금액';
    }
  }

  renderAmountInput() {
    const {
      params,
      paramErrors,
      isFromCurrentUser
    } = this.props;

    const amountErrorBlock = paramErrors['transaction[amount]'] ? (
      <Text
        size="small"
        role="danger"
      >
        {paramErrors['transaction[amount]']}
      </Text>
    ) : null;

    const inputItem = params.totalAmount !== null ? (
      <Textbox
        type="number"
        onChange={this.handleTotalAmountChange}
        value={params.totalAmount}
      />
    ) : (
      <Textbox
        type="number"
        name="transaction[amount]"
        onChange={this.handleInputChange}
        value={params[`transaction[amount]`]}
      />
    );

    const amount = params[`transaction[amount]`] === '' ? 0 : params[`transaction[amount]`];
    const amountInfo = !isFromCurrentUser && (params.totalAmount !== null) ? (
      <Text size="small">
        {`한 사람당 내가 받을 금액은 ${amount} 입니다.`}
      </Text>
    ) : null;

    return (
      <ContentGroup size="small">
        <Label>
          {this.renderAmountLabel()}
        </Label>
        {inputItem}
        {amountInfo}
        {amountErrorBlock}
      </ContentGroup>
    );
  }

  render() {
    const {
      alert,
      group,
      params,
      paramErrors,
      isFromCurrentUser
    } = this.props;

    const alertBlock = alert ? (
      <Alert
        role="danger"
      >
        {alert}
      </Alert>
    ) : null;

    const userSelector = isFromCurrentUser ? this.renderToUserSelector() : this.renderFromUserSelector();
    const amountTypeSelector = isFromCurrentUser ? null : this.renderAmountTypeSelector();

    return (
      <form
        className="c-group-transaction-form"
        ref={e => this.form = e}
        onSubmit={e => this.handleSubmit(e)}
      >
        {userSelector}
        {amountTypeSelector}
        {this.renderAmountInput()}
        <ContentGroup size="small">
          <Label>
            설명
          </Label>
          <Textbox
            type="text"
            name="transaction[description]"
            value={params[`transaction[description]`]}
            onChange={this.handleInputChange}
          />
          <Text size="small">
            생략할 수 있습니다.
          </Text>
        </ContentGroup>
        {alertBlock}
        <Bar>
          <BarItem align="left">
            <Button
              type="submit"
            >
              확인
            </Button>
          </BarItem>
          <BarItem align="left">
            <Button
              onClick={() => this.cancel()}
              role="warning"
            >
              취소
            </Button>
          </BarItem>
        </Bar>
      </form>
    );
  }
}
