import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getCurrentUser, getGroupIndex, getGroup, login, logout } from '../actions';
import Login from '../components/Login';
import Group from '../components/Group';

class GroupContainer extends Component {
  static propTypes = {

  };

  componentWillMount() {
    this.getGroup(this.props.match.params.groupname);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.groupname !== nextProps.match.params.groupname) {
      this.getGroup(nextProps.match.params.groupname);
    }
  }

  getGroup(groupname) {
    this.props.getGroupIndex(groupname).then(v => {
      if (v.response) {
        this.props.getGroup(v.response.id);
        this.props.getCurrentUser({ groupId: v.response.id });
      } else if (v.error) {
        // TODO: handle unknown groupname.
      }
    })
  }

  login = (email, password) => {
    this.props.login({
      groupId: this.props.groupIndex,
      email,
      password
    }).then(v => {
      if (v.response) {
        this.props.getGroup(this.props.groupIndex);
        this.props.getCurrentUser({ groupId: v.response.id });
      }
    });
  };

  logout = () => {
    this.props.login({
      groupId: this.props.groupIndex
    });
  };

  render() {
    const isLoaded = this.props.groupIndex;
    const isLoggedIn = !(this.props.groupIndex && !this.props.groupSession);
    if (isLoaded) {
      if (isLoggedIn) {
        return this.props.group ? (
          <Group
            group={this.props.group}
            groupname={this.props.match.params.groupname}
            currentUser={this.props.currentUser}
            logout={this.logout}
          />
        ) : <div />;
      } else {
        return (
          <Login
            groupname={this.props.match.params.groupname}
            groupSession={this.props.groupSession}
            login={this.login}
          />
        );
      }
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const groupIndex = state.entities.groupIndexes[ownProps.match.params.groupname];
  const groupSession = groupIndex ? state.entities.groupSessions[groupIndex] : null;
  const group = groupIndex ? state.entities.groups[groupIndex] : null;
  const currentUser = groupIndex ? state.entities.groupCurrentUsers[groupIndex] : null;

  return {
    groupIndex,
    groupSession,
    group,
    currentUser
  };
};

export default connect(mapStateToProps, {
  getGroupIndex,
  getGroup,
  getCurrentUser,
  login,
  logout
})(GroupContainer);
