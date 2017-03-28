import React, { PropTypes } from 'react';
import { connect, Provider } from 'react-redux';

const App = ({ store }) => (
  <Provider store={store}>
    <div>
      Hello world
      {/*<Header addTodo={actions.addTodo} />
      <MainSection todos={todos} actions={actions} />*/}
    </div>
  </Provider>
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
