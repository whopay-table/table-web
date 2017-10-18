import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import Alert from 'src/components/common/Alert';
import Bar from 'src/components/common/Bar';
import BarItem from 'src/components/common/BarItem';
import Button from 'src/components/common/Button';
import Config from 'src/config';
import ContentGroup from 'src/components/common/ContentGroup';
import Label from 'src/components/common/Label';
import Listbox from 'src/components/common/Listbox';
import Title from 'src/components/common/Title';
import Text from 'src/components/common/Text';
import Textbox from 'src/components/common/Textbox';

export default class GroupTransactionForm extends Component {
  static defaultProps = {
    onCancel: () => {},
    onSubmit: () => {},
  };

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

  handleAddFromUsers(userIds) {
    const { params } = this.props;
    const fromUserIds = JSON.parse(params[`transaction[from_user_ids]`]);
    const newUserIds = userIds.filter(uid => !fromUserIds.includes(uid));
    if (newUserIds.length > 0) {
      this.props.setParams(Object.assign({}, params, {
        'transaction[from_user_ids]': JSON.stringify(fromUserIds.concat(newUserIds))
      }, params.totalAmount !== null ? {
        'transaction[amount]': (
          params.totalAmount === '' ?
          '' : parseInt(parseInt(params.totalAmount) / (fromUserIds.length + 2))
        )
      } : {}));
    }
  }

  handleAddFromUser(userId) {
    this.handleAddFromUsers([userId]);
  }

  handleAddAllFromUser() {
    const {
      currentUser,
      group,
    } = this.props;
    this.handleAddFromUsers(group.users.map(user => user.id).filter(uid => uid !== currentUser.id));
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
      <BarItem
        align="left"
        key={user.id}
      >
        <Button
          onClick={() => this.handleSelectToUser(user.id)}
          fixedWidth={true}
        >
          {user.name}
        </Button>
      </BarItem>
    ));

    const toUserValue = params[`transaction[to_user_id]`] ? [{
      id: params[`transaction[to_user_id]`],
      label: this.getUserNameById(params[`transaction[to_user_id]`]),
    }] : [];

    return (
      <ContentGroup size="small">
        <Label>
          내게 송금받는 사람
        </Label>
        <Listbox
          value={toUserValue}
        />
        <Bar>
          {userSelectorButtons}
        </Bar>
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
      <BarItem
        align="left"
        key={user.id}
      >
        <Button
          onClick={() => this.handleAddFromUser(user.id)}
          fixedWidth={true}
        >
          {user.name}
        </Button>
      </BarItem>
    ));

    const fromUserIds = JSON.parse(params[`transaction[from_user_ids]`]);
    const fromUserValue = fromUserIds.map(uid => ({
      id: uid,
      label: this.getUserNameById(uid),
    }));

    return (
      <ContentGroup size="small">
        <Label>
          내게 송금할 사람
        </Label>
        <Listbox
          value={fromUserValue}
        />
        <Bar>
          {userSelectorButtons}
          <BarItem align="left">
            <Button
              onClick={() => this.handleAddAllFromUser()}
              fixedWidth={true}
              role="info"
            >
              모두 선택
            </Button>
          </BarItem>
          <BarItem align="left">
            <Button
              onClick={() => this.handleClearFromUser()}
              fixedWidth={true}
              role="warning"
            >
              리셋
            </Button>
          </BarItem>
        </Bar>
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
              한 사람당 받을 금액 입력하기
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
      alertRole,
      group,
      onCancel,
      params,
      paramErrors,
      isFromCurrentUser,
      isWaitingSubmit,
    } = this.props;

    const alertBlock = alert ? (
      <ContentGroup>
        <Alert
          role={alertRole || 'default'}
        >
          {alert}
        </Alert>
      </ContentGroup>
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
        <ContentGroup>
          <Bar>
            <BarItem align="left">
              <Button
                type="submit"
                isBusy={isWaitingSubmit}
              >
                확인
              </Button>
            </BarItem>
            <BarItem align="left">
              <Button
                onClick={() => onCancel()}
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
