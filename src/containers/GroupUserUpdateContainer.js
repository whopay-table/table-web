import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import QueryString from 'query-string';
import { updateUser, logout } from '../actions';
import GroupUserUpdate from '../components/GroupUserUpdate';

const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const ALPHABET_REGEX = /[a-zA-Z]/i;
const DIGIT_REGEX = /[0-9]/i;

const UPDATE_USER_PARAMS = {
  'password': '',
  'user[email]': '',
  'user[name]': '',
  'user[password]': '',
  'user[password_confirmation]': '',
  'user[account_info]': ''
};

const hasLengthBetween = (v, min, max) => ((min <= v.length) && (max >= v.length));

class GroupUserUpdateContainer extends Component {
  state = {
    params: Object.assign({}, UPDATE_USER_PARAMS),
    paramErrors: Object.assign({}, UPDATE_USER_PARAMS),
    alert: null,
    redirectToHome: false
  };

  componentDidMount() {
    const { currentUser } = this.props;
    if (currentUser) {
      this.setParamsByUser(currentUser);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentUser } = this.props;
    if (currentUser && (prevProps.currentUser !== currentUser)) {
      this.setParamsByUser(currentUser);
    }
  }

  setParamsByUser = user => {
    this.setState({ params: {
      'password': '',
      'user[email]': user.email,
      'user[name]': user.name,
      'user[password]': '',
      'user[password_confirmation]': '',
      'user[account_info]': user.accountInfo || '',
    }});
  };

  setParams = params => {
    this.setState({ params }, () => {
      this.validateParams();
    });
  };

  updateUser = () => {
    const {
      params,
      paramErrors
    } = this.state;
    const {
      currentUser,
      groupIndex,
      groupname,
      refreshGroup,
      refreshUserTransactions,
    } = this.props;
    const isError = Object.keys(paramErrors).map(key => paramErrors[key]).join('') !== '';

    if (!isError) {
      const validParams = {};
      for (const paramKey of Object.keys(params)) {
        const value = params[paramKey];
        if (value !== '') {
          validParams[paramKey] = value;
        }
      }
      this.setState({ alert: null }, () => {
        this.props.updateUser(Object.assign({}, validParams, {
          groupId: groupIndex,
          userId: currentUser.id,
        })).then(v => {
          if (v.response) {
            ga('send', 'event', 'user', 'update', groupname, currentUser.id);
            this.setState({ redirectToHome: true });
            refreshGroup();
            refreshUserTransactions();
          } else if (v.error) {
            const firstError = v.error.errors[0];
            if (firstError.code === 'password_fail') {
              ga('send', 'event', 'web-error', 'user-update-pw-fail', groupname, currentUser.id);
              this.setState({ alert: '현재 비밀번호가 틀렸습니다. 다시 한번 확인해 주세요.' });
            } else if (firstError.code === 'invalid_param' && firstError.key === 'email') {
              ga('send', 'event', 'web-error', 'user-update-email-fail', groupname, currentUser.id);
              this.setState({ alert: '사용할 수 없는 이메일입니다. 다른 이메일 주소를 입력하세요.' });
            } else {
              ga('send', 'event', 'web-error', 'user-update', groupname, currentUser.id);
              this.setState({ alert: '내 정보 수정에 실패했습니다. 작성한 내용을 다시 한번 확인해 주세요.' });
            }
          }
        });
      });
    } else {
      this.setState({ alert: '내 정보 수정에 실패했습니다. 작성된 내용을 다시 확인해 주세요.' });
    }
  };

  validateParams() {
    const { params } = this.state;
    const paramErrors = {};
    if (params['password'] === '') {
      paramErrors['password'] = '비밀번호를 입력해주세요.';
    }
    if (params['user[email]'] !== '') {
      if (!EMAIL_REGEX.test(params['user[email]'])) {
        paramErrors['user[email]'] = '올바른 email 주소를 입력해 주세요.';
      }
    }
    if (params['user[name]'] !== '') {
      if (!hasLengthBetween(params['user[name]'], 1, 128)) {
        paramErrors['user[name]'] = '이름은 1-128 글자로 입력할 수 있습니다.';
      }
    }
    if (params['user[password]'] !== '') {
      if (!hasLengthBetween(params['user[password]'], 8, 20)) {
        paramErrors['user[password]'] = '비밀번호는 8-20 글자로 이루어져야 합니다.';
      } else if (!ALPHABET_REGEX.test(params['user[password]']) || !DIGIT_REGEX.test(params['user[password]'])) {
        paramErrors['user[password]'] = '비밀번호에는 적어도 한 개의 알파벳 문자와 숫자가 포함되어야 합니다.';
      }
    }
    if (params['user[password]'] !== '' || params['user[password_confirmation]'] !== '') {
      if (params['user[password]'] !== params['user[password_confirmation]']) {
        paramErrors['user[password_confirmation]'] = '비밀번호가 일치하지 않습니다.';
      }
    }
    if (params['user[account_info]'] !== '') {
      if (!hasLengthBetween(params['user[account_info]'], 1, 128)) {
        paramErrors['user[account_info]'] = '계좌정보는 1-128 글자로 입력할 수 있습니다.';
      }
    }
    this.setState({ paramErrors: Object.assign({}, UPDATE_USER_PARAMS, paramErrors) });
  }

  logout = () => {
    this.props.logout({
      groupId: this.props.groupIndex
    });
  };

  getParamErrors() {
    const { params, paramErrors } = this.state;
    return Object.assign({}, paramErrors);
  }

  render() {
    const {
      currentUser,
      isWaitingUpdateUser,
      group,
      groupname,
    } = this.props;
    const {
      params,
      alert,
      redirectToHome
    } = this.state;

    if (redirectToHome) {
      return <Redirect push to={`/${groupname}/`} />;
    }

    return (
      <GroupUserUpdate
        currentUser={currentUser}
        group={group}
        groupname={groupname}
        isWaitingUpdateUser={isWaitingUpdateUser}
        updateUser={this.updateUser}
        logout={this.logout}
        params={params}
        paramErrors={this.getParamErrors()}
        alert={alert}
        setParams={this.setParams}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const groupIndex = state.entities.groupIndexes[ownProps.groupname];
  const isWaitingUpdateUser = state.isWaiting.updateUser;

  return {
    groupIndex,
    isWaitingUpdateUser,
  };
};

export default connect(mapStateToProps, {
  updateUser,
  logout,
})(GroupUserUpdateContainer);
