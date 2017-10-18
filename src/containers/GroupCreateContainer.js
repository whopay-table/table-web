import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import QueryString from 'query-string';
import { createGroup, getGroupIndex } from '../actions';
import GroupCreate from '../components/GroupCreate';
import Config from '../config';

const HOSTNAME = window.location.hostname;
const DOMAIN = Config.WEB_DOMAIN;
const PORT = window.location.port ? `:${window.location.port}` : '';
const IS_PROD_DOMAIN = HOSTNAME.endsWith(DOMAIN);

const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const GROUPNAME_REGEX = /^[a-z0-9\-_]+$/i;
const ALPHABET_REGEX = /[a-zA-Z]/i;
const DIGIT_REGEX = /[0-9]/i;

const CREATE_GROUP_PARAMS = {
  'group[groupname]': '',
  'group[title]': '',
  'user[email]': '',
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
    alert: null,
    redirectGroupname: null
  };

  componentDidMount() {
    const { location, getGroupIndex } = this.props;
    const { params } = this.state;
    const getParams = QueryString.parse(location.search);
    const groupname = getParams.groupname;

    if (groupname) {
      getGroupIndex(groupname);
      this.setParams(Object.assign({}, params, {
        'group[groupname]': groupname,
      }));
    }
  }

  setParams = params => {
    this.setState({ params }, () => {
      this.validateParams();
    });
  };

  createGroup = () => {
    const { params, paramErrors } = this.state;
    const isValid = this.validateParams(true);

    if (!this.isGroupnameTaken() && isValid) {
      this.setState({ alert: null }, () => {
        this.props.createGroup(this.state.params).then(v => {
          if (v.response) {
            ga('send', 'event', 'group', 'create', v.response.groupname);
            this.setState({ redirectGroupname: v.response.groupname });
          } else if (v.error) {
            ga('send', 'event', 'web-error', 'group-create', v.params['group[groupname]']);
            this.setState({ alert: '그룹을 생성하지 못 했습니다. 작성된 내용을 다시 확인해 주세요.' });
            this.props.getGroupIndex(v.params['group[groupname]']);
          }
        });
      });
    } else {
      this.setState({ alert: '그룹을 생성하지 못 했습니다. 작성된 내용을 다시 확인해 주세요.' });
    }
  };

  validateParams(includeEmptyParams) {
    const { params } = this.state;
    const paramErrors = {};
    if (includeEmptyParams || params['group[groupname]']) {
      if (!GROUPNAME_REGEX.test(params['group[groupname]'])) {
        paramErrors['group[groupname]'] = '그룹 ID에는 소문자 알파벳, 숫자, 또는 "-", "_"만 사용할 수 있습니다.';
      } else if (!hasLengthBetween(params['group[groupname]'], 3, 20)) {
        paramErrors['group[groupname]'] = '그룹 ID는 3-20 글자로 이루어져야 합니다.';
      }
    }
    if (includeEmptyParams || params['group[title]']) {
      if (!hasLengthBetween(params['group[title]'], 1, 20)) {
        paramErrors['group[title]'] = '그룹 이름 1-20 글자로 이루어져야 합니다.';
      }
    }
    if (includeEmptyParams || params['user[email]']) {
      if (!EMAIL_REGEX.test(params['user[email]'])) {
        paramErrors['user[email]'] = '올바른 email 주소를 입력해 주세요.';
      }
    }
    if (includeEmptyParams || params['user[name]']) {
      if (!hasLengthBetween(params['user[name]'], 1, 128)) {
        paramErrors['user[name]'] = '이름은 1-128 글자로 입력할 수 있습니다.';
      }
    }
    if (includeEmptyParams || params['user[password]']) {
      if (!hasLengthBetween(params['user[password]'], 8, 20)) {
        paramErrors['user[password]'] = '비밀번호는 8-20 글자로 이루어져야 합니다.';
      } else if (!ALPHABET_REGEX.test(params['user[password]']) || !DIGIT_REGEX.test(params['user[password]'])) {
        paramErrors['user[password]'] = '비밀번호에는 적어도 한 개의 알파벳 문자와 숫자가 포함되어야 합니다.';
      }
    }
    if (includeEmptyParams || (params['user[password]'] && params['user[password_confirmation]'])) {
      if (params['user[password]'] !== params['user[password_confirmation]']) {
        paramErrors['user[password_confirmation]'] = '비밀번호가 일치하지 않습니다.';
      }
    }
    this.setState({ paramErrors: Object.assign({}, CREATE_GROUP_PARAMS, paramErrors) });
    return Object.keys(paramErrors).length === 0;
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
    const {
      getGroupIndex,
      isWaitingCreateGroup,
    } = this.props;
    const { redirectGroupname, params, alert } = this.state;

    if (redirectGroupname) {
      if (IS_PROD_DOMAIN) {
        window.location.assign(`//${redirectGroupname}.${DOMAIN}${PORT}/${redirectGroupname}`);
      } else {
        return <Redirect push to={`/${redirectGroupname}`}/>;
      }
    }

    return (
      <GroupCreate
        createGroup={this.createGroup}
        isWaitingCreateGroup={isWaitingCreateGroup}
        getGroupIndex={getGroupIndex}
        params={params}
        paramErrors={this.getParamErrors()}
        alert={alert}
        setParams={this.setParams}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const groupIndexes = state.entities.groupIndexes;
  const isWaitingCreateGroup = state.isWaiting.createGroup;
  return {
    groupIndexes,
    isWaitingCreateGroup,
  };
};

export default connect(mapStateToProps, {
  createGroup,
  getGroupIndex,
})(GroupCreateContainer);
