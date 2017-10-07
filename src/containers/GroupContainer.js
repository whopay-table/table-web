import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  acceptTransaction,
  getCurrentUser,
  getGroupIndex,
  getGroup,
  getTransactions,
  getUserTransactions,
  login,
  logout,
  rejectTransaction
} from 'src/actions';
import Group from 'src/components/Group';
import GroupAuth from 'src/components/GroupAuth';
import NotFound from 'src/components/NotFound';

const REQUEST_TRANSACTION_COUNT = 10;

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
    this.props.getCurrentUser({ groupId: groupId }).then(v => {
      if (v.response) {
        this.props.getUserTransactions({
          groupId: groupId,
          userId: v.response.id,
          offset: 0,
          count: REQUEST_TRANSACTION_COUNT,
        });
      } else if (v.error) {
        // TODO: handle unknown groupname.
      }
    });
    this.props.getTransactions({
      groupId: groupId,
      offset: 0,
      count: REQUEST_TRANSACTION_COUNT,
    });
  }

  getGroup(groupname) {
    this.props.getGroupIndex(groupname).then(v => {
      if (v.response) {
        this.getGroupWithId(v.response.id);
      }
    })
  }

  refreshGroup = callback => {
    const { groupIndex } = this.props;
    this.props.getGroup(groupIndex).then(v => {
      callback && callback();
    });
  };

  refreshUserTransactions = callback => {
    this.props.getUserTransactions({
      groupId: this.props.groupIndex,
      userId: this.props.currentUser.id,
      offset: 0,
      count: REQUEST_TRANSACTION_COUNT,
    }).then(v => {
      callback && callback();
    });
  };

  refreshPage = callback => {
    this.refreshGroup(() => {
      this.refreshUserTransactions(() => {
        callback && callback();
      });
    });
  };

  getMoreTransactions = () => {
    this.props.getTransactions({
      groupId: this.props.groupIndex,
      offset: this.props.transactions.length,
      count: REQUEST_TRANSACTION_COUNT,
    });
  };

  acceptTransaction = transactionId => {
    const groupId = this.props.groupIndex;
    this.props.acceptTransaction({
      groupId,
      transactionId,
    }).then(v => {
      this.refreshUserTransactions();
    });
  };

  rejectTransaction = transactionId => {
    const groupId = this.props.groupIndex;
    this.props.rejectTransaction({
      groupId,
      transactionId,
    }).then(v => {
      this.refreshGroup();
      this.refreshUserTransactions();
    });
  };

  login = (email, password) => {
    const { groupIndex } = this.props;
    this.props.login({
      groupId: groupIndex,
      email,
      password
    }).then(v => {
      if (v.response) {
        this.getGroupWithId(groupIndex);
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
      userTransactions,
      groupIndex,
      groupSession
    } = this.props;

    const isLoaded = groupIndex;
    const isNotFound = groupIndex === null;
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
            userTransactions={userTransactions}
            getMoreTransactions={this.getMoreTransactions}
            refreshGroup={this.refreshGroup}
            refreshUserTransactions={this.refreshUserTransactions}
            refreshPage={this.refreshPage}
            acceptTransaction={this.acceptTransaction}
            rejectTransaction={this.rejectTransaction}
            logout={this.logout}
          />
        ) : <div />;
      } else {
        return (
          <GroupAuth
            groupId={groupIndex}
            groupname={match.params.groupname}
            groupSession={groupSession}
            login={this.login}
          />
        );
      }
    } else if (isNotFound) {
      return (
        <NotFound />
      )
    } else {
      // TODO: show spinner here.
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
  const userTransactions = groupIndex ? state.entities.groupUserTransactionLists[groupIndex] : null;

  return {
    groupIndex,
    groupSession,
    group,
    currentUser,
    transactions,
    userTransactions,
  };
};

export default connect(mapStateToProps, {
  getGroupIndex,
  getGroup,
  getCurrentUser,
  getTransactions,
  getUserTransactions,
  acceptTransaction,
  rejectTransaction,
  login,
  logout,
})(GroupContainer);
