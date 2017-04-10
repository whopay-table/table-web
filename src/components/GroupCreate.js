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
      params,
      paramErrors,
      alert,
      setParams
    } = this.props;

    return (
      <div className="c-group-create">
        GroupCreate
        <Header />
        <GroupCreateForm
          createGroup={createGroup}
          getGroupIndex={getGroupIndex}
          params={params}
          paramErrors={paramErrors}
          alert={alert}
          setParams={setParams}
        />
      </div>
    );
  }
}
