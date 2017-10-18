import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { destroyUser } from '../actions';
import GroupUserDestroy from '../components/GroupUserDestroy';

class GroupUserDestroyContainer extends Component {
  state = {
    password: '',
    alert: null,
  };

  setPassword = password => {
    this.setState({ password });
  }

  destroyUser = () => {
    const { password } = this.state;
    const {
      currentUser,
      groupIndex,
      groupname,
      refreshGroup,
      refreshUserTransactions,
    } = this.props;

    this.setState({ alert: null }, () => {
      this.props.destroyUser(Object.assign({}, {
        password,
        groupId: groupIndex,
        userId: currentUser.id,
      })).then(v => {
        if (v.response) {
          ga('send', 'event', 'user', 'destroy', groupname, currentUser.id);
          this.setState({ redirectToHome: true });
        } else if (v.error) {
          const firstError = v.error.errors[0];
          if (firstError.code === 'password_fail') {
            ga('send', 'event', 'web-error', 'user-destroy-pw-fail', groupname, currentUser.id);
            this.setState({ alert: '비밀번호가 틀렸습니다. 다시 한번 확인해 주세요.' });
          } else if (firstError.code === 'model_error' && firstError.key === 'id') {
            ga('send', 'event', 'web-error', 'user-destroy-user-fail', groupname, currentUser.id);
            this.setState({ alert: '잔액이 0이 아니거나, 승인 대기 중인 거래가 남아있어 그룹을 탈퇴할 수 없습니다.' });
          } else {
            ga('send', 'event', 'web-error', 'user-destroy', groupname, currentUser.id);
            this.setState({ alert: '그룹 탈퇴에 실패했습니다. 잠시 후 다시 시도해주세요. 문제가 계속되면 관리자에게 문의해주세요.' });
          }
        }
      });
    });
  };

  render() {
    const {
      currentUser,
      group,
      groupname,
      isWaitingDestroyUser,
      logout,
    } = this.props;
    const {
      password,
      alert,
      redirectToHome
    } = this.state;

    if (redirectToHome) {
      return <Redirect push to={`/${groupname}/`} />;
    }

    return (
      <GroupUserDestroy
        currentUser={currentUser}
        group={group}
        groupname={groupname}
        isWaitingDestroyUser={isWaitingDestroyUser}
        destroyUser={this.destroyUser}
        logout={logout}
        password={password}
        alert={alert}
        setPassword={this.setPassword}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const groupIndex = state.entities.groupIndexes[ownProps.groupname];
  const isWaitingDestroyUser = state.isWaiting.destroyUser;

  return {
    groupIndex,
    isWaitingDestroyUser,
  };
};

export default connect(mapStateToProps, {
  destroyUser,
})(GroupUserDestroyContainer);
