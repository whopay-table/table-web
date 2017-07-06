import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getCurrentUser, getGroupIndex, getGroup, getTransactions, login, logout } from '../actions';
import Login from '../components/Login';
import Group from '../components/Group';

const REQUEST_TRANSACTION_COUNT = 30;

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

  getGroupWithId(groupId) {
    this.props.getGroup(groupId);
    this.props.getCurrentUser({ groupId: groupId });
    this.props.getTransactions({
      groupId: groupId,
      offset: 0,
      count: REQUEST_TRANSACTION_COUNT
    });
  }

  getGroup(groupname) {
    this.props.getGroupIndex(groupname).then(v => {
      if (v.response) {
        this.getGroupWithId(v.response.id);
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
        this.getGroupWithId(v.response.id);
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
            currentUser={this.props.currentUser}
            group={this.props.group}
            groupname={this.props.match.params.groupname}
            transactions={this.props.transactions}
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
  const transactions = groupIndex ? state.entities.groupTransactionLists[groupIndex] : null;

  return {
    groupIndex,
    groupSession,
    group,
    currentUser,
    transactions
  };
};

export default connect(mapStateToProps, {
  getGroupIndex,
  getGroup,
  getCurrentUser,
  getTransactions,
  login,
  logout
})(GroupContainer);
