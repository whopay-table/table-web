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
import Spinner from 'src/components/common/Spinner';

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
    this.props.getCurrentUser({ groupId }).then(v => {
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
    ga('send', 'event', 'web', 'get-group', groupname);
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

  refreshCurrentUser = callback => {
    const { groupIndex } = this.props;
    this.props.getCurrentUser({ groupId: groupIndex }).then(v => {
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
    ga('send', 'event', 'web', 'refresh-group-page');
    this.refreshGroup(() => {
      this.refreshCurrentUser(() => {
        this.refreshUserTransactions(() => {
          callback && callback();
        });
      });
    });
  };

  getMoreTransactions = () => {
    ga('send', 'event', 'web', 'more-transactions');
    this.props.getTransactions({
      groupId: this.props.groupIndex,
      offset: this.props.transactions.length,
      count: REQUEST_TRANSACTION_COUNT,
    });
  };

  acceptTransaction = transactionId => {
    const { groupIndex, match } = this.props;
    ga('send', 'event', 'transaction', 'accept', match.params.groupname, transactionId);
    this.props.acceptTransaction({
      groupId: groupIndex,
      transactionId,
    }).then(v => {
      this.refreshUserTransactions();
    });
  };

  rejectTransaction = transactionId => {
    const { groupIndex, match } = this.props;
    ga('send', 'event', 'transaction', 'reject', match.params.groupname, transactionId);
    this.props.rejectTransaction({
      groupId: groupIndex,
      transactionId,
    }).then(v => {
      this.refreshGroup();
      this.refreshUserTransactions();
    });
  };

  login = (email, password) => {
    const { groupIndex, match } = this.props;
    ga('send', 'event', 'web', 'login', `${match.params.groupname}::${email}`);
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
    const { currentUser } = this.props;
    ga('send', 'event', 'web', 'logout', currentUser ? currentUser.email : undefined);
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
      groupSession,
      isWaitingLogin,
      isWaitingLogout,
      isWaitingAcceptTransaction,
      isWaitingRejectTransaction,
    } = this.props;

    const isLoaded = groupIndex && (groupSession !== undefined);
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
            isWaitingLogin={isWaitingLogin}
            isWaitingLogout={isWaitingLogout}
            isWaitingAcceptTransaction={isWaitingAcceptTransaction}
            isWaitingRejectTransaction={isWaitingRejectTransaction}
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
        ) : <Spinner />;
      } else {
        return (
          <GroupAuth
            groupId={groupIndex}
            groupname={match.params.groupname}
            groupSession={groupSession}
            login={this.login}
            isWaitingLogin={isWaitingLogin}
          />
        );
      }
    } else if (isNotFound) {
      return (
        <NotFound />
      )
    } else {
      return <Spinner />;
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
  const isWaitingLogin = state.isWaiting.login;
  const isWaitingLogout = state.isWaiting.logout;
  const isWaitingAcceptTransaction = state.isWaiting.acceptTransaction || {};
  const isWaitingRejectTransaction = state.isWaiting.rejectTransaction || {};

  return {
    groupIndex,
    groupSession,
    group,
    currentUser,
    transactions,
    userTransactions,
    isWaitingLogin,
    isWaitingLogout,
    isWaitingAcceptTransaction,
    isWaitingRejectTransaction,
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
