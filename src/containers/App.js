import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom'
import GroupCreateContainer from './GroupCreateContainer';
import Home from '../components/Home';
import GroupIndexContainer from './GroupIndexContainer';

const App = ({ store }) => (
  <div className="c-app">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/create" component={GroupCreateContainer} />
      <Route path="/:groupname" component={GroupIndexContainer} />
    </Switch>
  </div>
);

export default connect()(App);
