import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

export default class GroupResetPassword extends Component {
  static defaultProps = {

  };

  handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }

    const { resetUserPassword } = this.props;
    resetUserPassword();
  }

  render() {
    const {
      groupname,
      email,
      alert,
      setEmail,
      isSucceed
    } = this.props;

    const alertBlock = alert ? (
      <div className="alert alert-danger" role="alert">
        {alert}
      </div>
    ) : null;

    const succeedBlock = isSucceed ? (
      <div className="alert alert-success" role="alert">
        입력하신 이메일 주소로 새로운 비밀번호가 전송 되었습니다.
        확인 후 새로운 비밀번호를 사용해 로그인 해주세요.
      </div>
    ) : null;

    const buttons = isSucceed ? (
      <div className="u-button-row">
        <Link
          className="u-button u-button--is-cancel"
          to={`/${groupname}`}
        >
          확인
        </Link>
      </div>
    ) : (
      <div className="u-button-row">
        <Link
          className="u-button u-button--is-cancel"
          to={`/${groupname}`}
        >
          취소
        </Link>
        <a
          className="u-button"
          onClick={() => this.handleSubmit()}
        >
          확인
        </a>
      </div>
    );

    return (
      <div className="c-group-user-destroy u-group-header-container">
        <Header />
        <div className="u-container">
          <div className="c-group-user-destroy__body">
            <div className="u-page-title">
              {groupname} 그룹의 사용자 비밀번호를 재설정합니다.
            </div>
            <small className="u-input-info">
              아래에 이메일 주소를 입력하고 비밀번호를 재설정하게 되면,
              해당 사용자에게 임의의 새로운 비밀번호가 부여되고
              이메일로 새 비밀번호가 전송됩니다.
            </small>
            <form
              className="c-group-user-destroy-form"
              onSubmit={e => this.handleSubmit(e)}
            >
              <div className="u-input-group">
                <label className="u-label">
                  이메일
                </label>
                <input
                  type="text"
                  className="u-input"
                  onChange={e => this.props.setEmail(e.target.value)}
                  value={email}
                />
                <small className="u-input-info">
                  비밀번호를 재설정할 사용자 계정에 등록된 이메일 주소를 입력하세요.
                </small>
              </div>
              {alertBlock}
              {succeedBlock}
              {buttons}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
