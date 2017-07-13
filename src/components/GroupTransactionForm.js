import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class GroupTransactionForm extends Component {
  static propTypes = {

  };

  handleInputChange = e => {
    this.props.setParams(Object.assign({}, this.props.params, {[e.target.name]: e.target.value}));
  };

  handleAddFromUser(userId) {
    const { params } = this.props;
    const fromUserIds = JSON.parse(params[`transaction['from_user_ids']`]);
    if (!fromUserIds.includes(userId)) {
      this.props.setParams(Object.assign({}, params, {
        'transaction[from_user_ids]': JSON.stringify(fromUserIds.concat([userId]))
      }));
    }
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

  getUserNameById(userId) {
    const {
      group
    } = this.props;
    const filteredUsers = group.users.filter(user => user.id === userId);
    if (filteredUsers.length > 0) {
      return filteredUsers[0].name;
    } else {
      return '';
    }
  }

  render() {
    const {
      alert,
      group,
      params
    } = this.props;

    const userSelectorButtons = group.users.map(user => (
      <a
        key={user.id}
        className="u-input-selector__button"
        onClick={() => this.handleSelectToUser(user.id)}
      >
        {user.name}
      </a>
    ));

    const alertBlock = alert ? (
      <div className="alert alert-danger" role="alert">
        {alert}
      </div>
    ) : null;

    return (
      <form
        className="c-group-transaction-create__form"
        ref={e => this.form = e}
        onSubmit={e => this.handleSubmit(e)}
      >
        <div className="u-input-group">
          <label className="u-label">
            보낼 금액
          </label>
          <input
            className="u-input"
            type="number"
            name="transaction[amount]"
            onChange={this.handleInputChange}
            value={params[`transaction[amount]`]}
          />
        </div>
        <div className="u-input-group">
          <label className="u-label">
            받는 사람
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
