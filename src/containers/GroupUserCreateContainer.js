import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import QueryString from 'query-string';
import { createUser, getUserIdByEmail } from '../actions';
import GroupUserCreate from '../components/GroupUserCreate';

const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const ALPHABET_REGEX = /[a-zA-Z]/i;
const DIGIT_REGEX = /[0-9]/i;

const CREATE_USER_PARAMS = {
  'user[email]': '',
  'user[name]': '',
  'user[password]': '',
  'user[password_confirmation]': '',
  'user[account_info]': ''
};

const hasLengthBetween = (v, min, max) => ((min <= v.length) && (max >= v.length));

class GroupUserCreateContainer extends Component {
  state = {
    params: Object.assign({}, CREATE_USER_PARAMS),
    paramErrors: Object.assign({}, CREATE_USER_PARAMS),
    alert: null,
    redirectToHome: false
  };

  setParams = params => {
    this.setState({ params }, () => {
      this.validateParams();
    });
  };

  getSignupKey() {
    const getParams = QueryString.parse(location.search);
    const signupkey = getParams.signupkey;
    return signupkey;
  }

  createUser = () => {
    const {
      params,
      paramErrors
    } = this.state;
    const {
      groupIndex
    } = this.props;
    const isError = Object.keys(paramErrors).map(key => paramErrors[key]).join('') !== '';

    if (!this.isEmailTaken() && !isError) {
      this.setState({ alert: null }, () => {
        this.props.createUser(Object.assign({}, params, {
          groupId: this.props.groupIndex,
          groupSignupKey: this.getSignupKey()
        })).then(v => {
          if (v.response) {
            this.setState({ redirectToHome: true });
          } else if (v.error) {
            this.setState({ alert: '가입에 실패했습니다. 작성한 내용을 다시 한번 확인해 주세요.' });
          }
        });
      });
    } else {
      this.setState({ alert: '가입에 실패했습니다. 작성된 내용을 다시 확인해 주세요.' });
    }
  };

  validateParams() {
    const { params } = this.state;
    const paramErrors = {};
    if (params['user[email]']) {
      if (!EMAIL_REGEX.test(params['user[email]'])) {
        paramErrors['user[email]'] = '올바른 email 주소를 입력해 주세요.';
      }
    }
    if (params['user[name]']) {
      if (!hasLengthBetween(params['user[name]'], 1, 128)) {
        paramErrors['user[name]'] = '이름은 1-128 글자로 입력할 수 있습니다.';
      }
    }
    if (params['user[password]']) {
      if (!hasLengthBetween(params['user[password]'], 8, 20)) {
        paramErrors['user[password]'] = '비밀번호는 8-20 글자로 이루어져야 합니다.';
      } else if (!ALPHABET_REGEX.test(params['user[password]']) || !DIGIT_REGEX.test(params['user[password]'])) {
        paramErrors['user[password]'] = '비밀번호에는 적어도 한 개의 알파벳 문자와 숫자가 포함되어야 합니다.';
      }
    }
    if (params['user[password]'] && params['user[password_confirmation]']) {
      if (params['user[password]'] !== params['user[password_confirmation]']) {
        paramErrors['user[password_confirmation]'] = '비밀번호가 일치하지 않습니다.';
      }
    }
    if (params['user[account_info]']) {
      if (!hasLengthBetween(params['user[account_info]'], 1, 128)) {
        paramErrors['user[account_info]'] = '계좌정보는 1-128 글자로 입력할 수 있습니다.';
      }
    }
    this.setState({ paramErrors: Object.assign({}, CREATE_USER_PARAMS, paramErrors) });
  }

  getUserIdByEmail = email => {
    const { groupIndex } = this.props;
    this.props.getUserIdByEmail({
      groupId: groupIndex,
      email,
      groupSignupKey: this.getSignupKey()
    });
  };

  getUserIdByEmailFromState() {
    return this.props.groupUserIdsByEmails[this.state.params['user[email]']];
  }

  isEmailTaken() {
    return this.getUserIdByEmailFromState() !== undefined && this.getUserIdByEmailFromState() !== null;
  }

  getParamErrors() {
    const { params, paramErrors } = this.state;
    return Object.assign({}, paramErrors, this.isEmailTaken() ? {
      'user[email]': `이미 사용중인 이메일 주소입니다. (${params['user[email]']})`
    } : {});
  }

  render() {
    const {
      match,
      location
    } = this.props;
    const {
      params,
      alert,
      redirectToHome
    } = this.state;
    const groupname = match.params.groupname;

    if (redirectToHome) {
      return <Redirect push to={`/${groupname}/`} />;
    }

    return (
      <GroupUserCreate
        groupname={groupname}
        createUser={this.createUser}
        getUserIdByEmail={this.getUserIdByEmail}
        params={params}
        paramErrors={this.getParamErrors()}
        alert={alert}
        setParams={this.setParams}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const groupIndex = state.entities.groupIndexes[ownProps.match.params.groupname];
  const groupUserIdsByEmails = state.entities.groupUserIdsByEmails;

  return {
    groupIndex,
    groupUserIdsByEmails,
  };
};

export default connect(mapStateToProps, {
  createUser,
  getUserIdByEmail,
})(GroupUserCreateContainer);
