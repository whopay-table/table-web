import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createGroup, getGroupIndex } from '../actions';
import GroupCreate from '../components/GroupCreate';

class GroupCreateContainer extends Component {
  static propTypes = {

  };

  state = {
    params: {
      'group[groupname]': '',
      'group[title]': '',
      'user[email]': '',
      'user[username]': '',
      'user[name]': '',
      'user[password]': '',
      'user[password_confirmation]': '',
    },
    errors: {
      'group[groupname]': '',
      'group[title]': '',
      'user[email]': '',
      'user[username]': '',
      'user[name]': '',
      'user[password]': '',
      'user[password_confirmation]': '',
    }
  };

  setParams = params => {
    this.setState({ params }, () => {
      this.verifyParams();
    });
  };

  verifyParams() {
    // TODO: verify params.
  }

  getGroupIdByGroupname() {
    return this.props.groupIndexes[this.state.params['group[groupname]']];
  }

  isGroupnameAvailable() {
    return this.getGroupIdByGroupname() === null;
  }

  isGroupnameTaken() {
    return this.getGroupIdByGroupname() !== undefined && this.getGroupIdByGroupname() !== null;
  }

  render() {
    const { createCroup, getGroupIndex } = this.props;

    return (
      <GroupCreate
        createGroup={createGroup}
        getGroupIndex={getGroupIndex}
        isGroupnameAvailable={this.isGroupnameAvailable()}
        isGroupnameTaken={this.isGroupnameTaken()}
        params={this.state.params}
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
