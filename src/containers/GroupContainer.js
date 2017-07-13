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
    this.props.logout({
      groupId: this.props.groupIndex
    });
  };

  render() {
    const {
      currentUser,
      match,
      location,
      group,
      transactions,
      groupIndex,
      groupSession
    } = this.props;

    const isLoaded = groupIndex;
    const isLoggedIn = !(groupIndex && !groupSession);

    if (isLoaded) {
      if (isLoggedIn) {
        return group ? (
          <Group
            currentUser={currentUser}
            location={location}
            match={match}
            group={group}
            groupname={match.params.groupname}
            transactions={transactions}
            logout={this.logout}
          />
        ) : <div />;
      } else {
        return (
          <Login
            groupname={match.params.groupname}
            groupSession={groupSession}
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
