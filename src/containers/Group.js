import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getGroupIndex } from '../actions';

class Group extends Component {
  static propTypes = {

  };

  componentWillMount() {
    this.props.getGroupIndex(this.props.match.params.groupname);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.groupname !== this.props.match.params.groupname) {
      this.props.getGroupIndex(nextProps.match.params.groupname);
    }
  }

  render() {
    let gid = 'unknown';
    if (this.props.groupIndex === null) {
      gid = 'none';
    } else if (this.props.groupIndex) {
      gid = this.props.groupIndex;
    }
    return (
      <div>Group ID for {this.props.match.params.groupname} is {gid}</div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const groupIndex = state.entities.groupIndexes[ownProps.match.params.groupname];
  return {
    groupIndex
  };
};

export default connect(mapStateToProps, {
  getGroupIndex
})(Group);
