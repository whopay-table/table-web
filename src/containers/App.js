import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import GroupContainer from './GroupContainer';
import GroupCreateContainer from './GroupCreateContainer';
import Home from '../components/Home';

const App = ({ store }) => {
  return (
    <div className="c-app">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/create" component={GroupCreateContainer} />
        <Route path="/:groupname" component={GroupContainer} />
      </Switch>
    </div>
  );
};

export default connect()(App);
