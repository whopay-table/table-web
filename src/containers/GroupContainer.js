import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getGroupIndex, getGroup, login, logout } from '../actions';
import Login from '../components/Login';

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
      }
    });
  };

  logout = () => {
    this.props.login({
      groupId: this.props.groupIndex
    });
  };

  render() {
    const isNotLoggedIn = this.props.groupIndex && !this.props.groupSession;
    if (isNotLoggedIn) {
      return (
        <Login
          groupname={this.props.match.params.groupname}
          groupSession={this.props.groupSession}
          login={this.login}
        />
      );
    } else {
      return (
        <div>
          GroupIndex {this.props.groupIndex} Group {JSON.stringify(this.props.group)}
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const groupIndex = state.entities.groupIndexes[ownProps.match.params.groupname];
  const groupSession = groupIndex ? state.entities.groupSessions[groupIndex] : null;
  const group = groupIndex ? state.entities.groups[groupIndex] : null;
  return {
    groupIndex,
    groupSession,
    group
  };
};

export default connect(mapStateToProps, {
  getGroupIndex,
  getGroup,
  login,
  logout
})(GroupContainer);
