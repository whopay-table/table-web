import React, { Component, PropTypes } from 'react';
import GroupForm from './GroupForm';
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
        <Header />
        <GroupForm
          onSubmit={createGroup}
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
