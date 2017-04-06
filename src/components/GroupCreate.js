
import React, { Component, PropTypes } from 'react';
import GroupCreateForm from './GroupCreateForm';
import Header from './Header';

export default class GroupCreate extends Component {
  static propTypes = {

  };

  render() {
    const {
      createGroup,
      getGroupIndex,
      isGroupnameAvailable,
      isGroupnameTaken,
      params,
      setParams
    } = this.props;

    return (
      <div className="c-group-create">
        GroupCreate
        <Header />
        <GroupCreateForm
          createGroup={createGroup}
          getGroupIndex={getGroupIndex}
          isGroupnameAvailable={isGroupnameAvailable}
          isGroupnameTaken={isGroupnameTaken}
          params={params}
          setParams={setParams}
        />
      </div>
    );
  }
}
