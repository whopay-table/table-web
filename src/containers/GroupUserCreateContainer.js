import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createUser, logout } from '../actions';
import GroupUserCreate from '../components/GroupUserCreate';

const CREATE_USER_PARAMS = {
  'user[email]': '',
  'user[username]': '',
  'user[name]': '',
  'user[password]': '',
  'user[password_confirmation]': '',
  'user[account_info]': ''
};

class GroupUserCreateContainer extends Component {
  static propTypes = {

  };

  state = {
    params: Object.assign({}, CREATE_USER_PARAMS),
    paramErrors: Object.assign({}, CREATE_USER_PARAMS),
    alert: null,
    redirectToHome: false
  };

  setParams = params => {
    this.setState({ params });
  };

  createUser = () => {
    const {
      params,
      paramErrors
    } = this.state;
    const {
      groupIndex
    } = this.props;

    this.props.createUser(Object.assign({}, params, {
      groupId: this.props.groupIndex,
      groupSignupKey: this.props.location.query.signupkey
    })).then(v => {
      if (v.response) {
        this.setState({ redirectToHome: true });
      } else if (v.error) {
        this.setState({ alert: '가입에 실패했습니다. 작성한 내용을 다시 한번 확인해 주세요.' });
      }
    });
  };

  logout = () => {
    this.props.logout({
      groupId: this.props.groupIndex
    });
  };

  render() {
    const {
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
      <GroupUserCreate
        params={params}
        alert={alert}
        groupname={groupname}
        createUser={this.createUser}
        setParams={this.setParams}
        logout={this.logout}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const groupIndex = state.entities.groupIndexes[ownProps.groupname];
  const groupSession = groupIndex ? state.entities.groupSessions[groupIndex] : null;
  const currentUser = groupIndex ? state.entities.groupCurrentUsers[groupIndex] : null;

  return {
    groupIndex,
    groupSession,
    currentUser
  };
};

export default connect(mapStateToProps, {
  createUser,
  logout
})(GroupTransactionCreateContainer);
