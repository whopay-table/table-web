import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class GroupForm extends Component {
  static propTypes = {

  };

  handleGroupnameBlur(e) {
    this.props.getGroupIndex(this.props.params['group[groupname]']);
  }

  handleInputChange(e) {
    this.props.setParams(Object.assign({}, this.props.params, {[e.target.name]: e.target.value}));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createGroup(this.props.params);
    // TODO: Redirect user to somewhere.
  }

  render() {
    console.log(this.props.isGroupnameTaken, this.props.isGroupnameAvailable);
    return (
      <form
        className="c-group-form"
        onSubmit={e => this.handleSubmit(e)}
      >
        <div className="form-group">
          <label htmlFor="group-create-groupname">
            그룹 ID
          </label>
          <input
            type="text"
            className="form-control"
            id="group-create-groupname"
            name="group[groupname]"
            placeholder=""
            onChange={e => this.handleInputChange(e)}
            onBlur={e => this.handleGroupnameBlur(e)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="group-create-group-title">
            그룹 이름
          </label>
          <input
            type="text"
            className="form-control"
            id="group-create-group-title"
            name="group[title]"
            placeholder=""
            onChange={e => this.handleInputChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="group-create-user-email">
            Email 주소
          </label>
          <input
            type="email"
            className="form-control"
            id="group-create-user-email"
            name="user[email]"
            placeholder=""
            onChange={e => this.handleInputChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="group-create-user-username">
            ID
          </label>
          <input
            type="text"
            className="form-control"
            id="group-create-user-username"
            name="user[username]"
            placeholder=""
            onChange={e => this.handleInputChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="group-create-user-name">
            이름
          </label>
          <input
            type="text"
            className="form-control"
            id="group-create-user-name"
            name="user[name]"
            placeholder=""
            onChange={e => this.handleInputChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="group-create-user-password">
            비밀번호
          </label>
          <input
            type="password"
            className="form-control"
            id="group-create-user-password"
            name="user[password]"
            placeholder=""
            onChange={e => this.handleInputChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="group-create-user-password-confirmation">
            비밀번호 확인
          </label>
          <input
            type="password"
            className="form-control"
            id="group-create-user-password-confirmation"
            name="user[password_confirmation]"
            placeholder=""
            onChange={e => this.handleInputChange(e)}
            required
          />
        </div>
        <input
          type="submit"
          className="btn btn-default"
          value="확인"
        />
      </form>
    );
  }
}
