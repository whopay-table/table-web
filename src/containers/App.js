import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom'
import Home from '../components/Home';
import Group from '../containers/Group';

const App = ({ store }) => (
  <div className="c-app">
    <Route exact path="/" component={Home}/>
    <Route path="/:groupname" component={Group}/>
  </div>
);

App.propTypes = {
  // todos: PropTypes.array.isRequired,
  // actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  // todos: state.todos
});

export default connect(
  mapStateToProps
)(App);
