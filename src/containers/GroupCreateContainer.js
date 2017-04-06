import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createGroup, getGroupIndex } from '../actions';
import GroupCreate from '../components/GroupCreate';

const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const GROUPNAME_REGEX = /^[a-zA-Z0-9\-_]+$/i;
const USERNAME_REGEX = /^[a-zA-Z0-9\-_]+$/i;
const ALPHABET_REGEX = /[a-zA-Z]/i;
const DIGIT_REGEX = /[0-9]/i;

const CREATE_GROUP_PARAMS = {
  'group[groupname]': '',
  'group[title]': '',
  'user[email]': '',
  'user[username]': '',
  'user[name]': '',
  'user[password]': '',
  'user[password_confirmation]': '',
};

const hasLengthBetween = (v, min, max) => ((min <= v.length) && (max >= v.length));

class GroupCreateContainer extends Component {
  static propTypes = {

  };

  state = {
    params: Object.assign({}, CREATE_GROUP_PARAMS),
    paramErrors: Object.assign({}, CREATE_GROUP_PARAMS),
  };

  setParams = params => {
    this.setState({ params }, () => {
      this.validateParams();
    });
  };

  createGroup = () => {
    const { params, paramErrors } = this.state;
    const isError = Object.keys(paramErrors).map(key => paramErrors[key]).join('') !== '';
    
    if (!this.isGroupnameTaken() && !isError) {
      this.props.createGroup(this.state.params);
    }
  };

  validateParams() {
    const { params } = this.state;
    const paramErrors = {};
    if (params['group[groupname]']) {
      if (!GROUPNAME_REGEX.test(params['group[groupname]'])) {
        paramErrors['group[groupname]'] = '그룹 ID에는 알파벳, 숫자, 또는 "-", "_"만 사용할 수 있습니다.';
      } else if (!hasLengthBetween(params['group[groupname]'], 3, 20)) {
        paramErrors['group[groupname]'] = '그룹 ID는 3-20 글자로 이루어져야 합니다.';
      }
    }
    if (params['group[title]']) {
      if (!hasLengthBetween(params['group[title]'], 1, 20)) {
        paramErrors['group[title]'] = '그룹 이름 1-20 글자로 이루어져야 합니다.';
      }
    }
    if (params['user[email]']) {
      if (!EMAIL_REGEX.test(params['user[email]'])) {
        paramErrors['user[email]'] = '올바른 email 주소를 입력해 주세요.';
      }
    }
    if (params['user[username]']) {
      if (!USERNAME_REGEX.test(params['user[username]'])) {
        paramErrors['user[username]'] = 'ID에는 알파벳, 숫자, 또는 "-", "_"만 사용할 수 있습니다.';
      } else if (!hasLengthBetween(params['user[username]'], 3, 20)) {
        paramErrors['user[username]'] = 'ID는 3-20 글자로 이루어져야 합니다.';
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
    this.setState({ paramErrors: Object.assign({}, CREATE_GROUP_PARAMS, paramErrors) });
  }

  getGroupIdByGroupname() {
    return this.props.groupIndexes[this.state.params['group[groupname]']];
  }

  isGroupnameTaken() {
    return this.getGroupIdByGroupname() !== undefined && this.getGroupIdByGroupname() !== null;
  }

  getParamErrors() {
    const { params, paramErrors } = this.state;
    return Object.assign({}, paramErrors, this.isGroupnameTaken() ? {
      'group[groupname]': `이미 사용중인 그룹 ID입니다. (${params['group[groupname]']})`
    } : {});
  }

  render() {
    const { getGroupIndex } = this.props;
    const { params } = this.state;

    return (
      <GroupCreate
        createGroup={this.createGroup}
        getGroupIndex={getGroupIndex}
        params={params}
        paramErrors={this.getParamErrors()}
        setParams={this.setParams}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const groupIndexes = state.entities.groupIndexes;
  return {
    groupIndexes
  };
};

export default connect(mapStateToProps, {
  createGroup,
  getGroupIndex
})(GroupCreateContainer);
