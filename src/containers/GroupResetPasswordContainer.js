import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { resetUserPassword } from '../actions';
import GroupResetPassword from '../components/GroupResetPassword';

class GroupResetPasswordContainer extends Component {
  state = {
    email: '',
    alert: null,
    isSucceed: false,
  };

  setEmail = email => {
    this.setState({ email });
  }

  resetUserPassword = () => {
    const { email } = this.state;
    const {
      groupIndex,
    } = this.props;

    this.setState({ alert: null }, () => {
      this.props.resetUserPassword(Object.assign({}, {
        email,
        groupId: groupIndex,
      })).then(v => {
        if (v.response) {
          this.setState({ isSucceed: true });
        } else if (v.error) {
          const firstError = v.error.errors[0];
          if (firstError.code === 'model_error' && firstError.key === 'user') {
            this.setState({ alert: '해당 email로 가입된 사용자가 없습니다. 확인 후 다시 시도해주세요.' });
          } else {
            this.setState({ alert: '비밀번호 재설정에 실패했습니다. 잠시 후 다시 시도해주세요. 문제가 계속되면 관리자에게 문의해주세요.' });
          }
        }
      });
    });
  };

  render() {
    const {
      groupname,
    } = this.props;
    const {
      email,
      alert,
      isSucceed
    } = this.state;

    return (
      <GroupResetPassword
        groupname={groupname}
        email={email}
        alert={alert}
        isSucceed={isSucceed}
        setEmail={this.setEmail}
        resetUserPassword={this.resetUserPassword}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const groupIndex = state.entities.groupIndexes[ownProps.groupname];

  return {
    groupIndex,
  };
};

export default connect(mapStateToProps, {
  resetUserPassword,
})(GroupResetPasswordContainer);
