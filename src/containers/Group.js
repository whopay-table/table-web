import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getGroupIndex } from '../actions';

class Group extends Component {
  static propTypes = {

  };

  componentWillMount() {
    getGroupIndex(this.props.match.params.groupname);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.groupname !== this.props.match.params.groupname) {
      getGroupIndex(nextProps.match.params.groupname);
    }
  }

  render() {
    return (
      <div>Group ID for {this.props.match.params.groupname} is {this.props.groupIndex ? this.props.groupIndex.id : 'unknown'}</div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const groupIndex = state.entities.groupIndexes[ownProps.match.params.groupname];
  return {
    groupIndex
  };
};

export default connect(mapStateToProps, {})(Group);
