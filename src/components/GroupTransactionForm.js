import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class GroupTransactionForm extends Component {
  static propTypes = {

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
      <div className="u-input-group">
        <label className="u-label">
          내게 송금받는 사람
        </label>
        <input
          className="u-input"
          type="text"
          value={this.getUserNameById(params[`transaction[to_user_id]`])}
          disabled
        />
        <div className="u-input-selector">
          {userSelectorButtons}
        </div>
        <small className="u-input-info">
          버튼을 눌러 사람을 선택하세요.
        </small>
      </div>
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
      <div className="u-input-group">
        <label className="u-label">
          내게 송금할 사람
        </label>
        <input
          className="u-input"
          type="text"
          value={fromUserNamesString}
          disabled
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
        <small className="u-input-info">
          버튼을 눌러 사람을 선택하세요.
        </small>
      </div>
    );
  }

  renderAmountTypeSelector() {
    const { params } = this.props;
    return (
      <div className="u-input-group">
        <label className="u-label">
          금액 입력 방법
        </label>
        <div className="u-button-row">
          <a
            className={classnames(
              'u-button',
              'u-button--left-align',
              { 'u-button--is-active': params.totalAmount !== null }
            )}
            onClick={() => this.handleTotalAmountClick(true)}
          >
            전체 금액 입력해서 1/N 하기
          </a>
          <a
            className={classnames(
              'u-button',
              'u-button--left-align',
              { 'u-button--is-active': params.totalAmount === null }
            )}
            onClick={() => this.handleTotalAmountClick(false)}
          >
            한 사람당 받을 금액 입력하기
          </a>
        </div>
      </div>
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
      <span className="u-help-block">
        {paramErrors['transaction[amount]']}
      </span>
    ) : null;

    const inputItem = params.totalAmount !== null ? (
      <input
        className="u-input"
        type="number"
        onChange={this.handleTotalAmountChange}
        value={params.totalAmount}
      />
    ) : (
      <input
        className="u-input"
        type="number"
        name="transaction[amount]"
        onChange={this.handleInputChange}
        value={params[`transaction[amount]`]}
      />
    );

    const amount = params[`transaction[amount]`] === '' ? 0 : params[`transaction[amount]`];
    const amountInfo = params.totalAmount !== null ? (
      <small className="u-input-info">
        {`한 사람당 내가 받을 금액은 ${amount} 입니다.`}
      </small>
    ) : null;

    return (
      <div className="u-input-group">
        <label className="u-label">
          {this.renderAmountLabel()}
        </label>
        {inputItem}
        {amountInfo}
        {amountErrorBlock}
      </div>
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
      <div className="u-alert">
        {alert}
      </div>
    ) : null;

    const userSelector = isFromCurrentUser ? this.renderToUserSelector() : this.renderFromUserSelector();
    const amountTypeSelector = isFromCurrentUser ? null : this.renderAmountTypeSelector();

    return (
      <form
        className="c-group-transaction-create__form"
        ref={e => this.form = e}
        onSubmit={e => this.handleSubmit(e)}
      >
        {userSelector}
        {amountTypeSelector}
        {this.renderAmountInput()}
        <div className="u-input-group">
          <label className="u-label">
            설명
          </label>
          <input
            className="u-input"
            type="text"
            name="transaction[description]"
            value={params[`transaction[description]`]}
            onChange={this.handleInputChange}
          />
          <small className="u-input-info">
            생략할 수 있습니다.
          </small>
        </div>
        {alertBlock}
        <div className="u-button-row">
          <a
            className="u-button u-button--is-cancel"
            onClick={() => this.cancel()}
          >
            취소
          </a>
          <a
            className="u-button"
            onClick={() => this.handleSubmit()}
          >
            확인
          </a>
        </div>
      </form>
    );
  }
}
