import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './imports';
import App from './containers/App';
import store from './store';

const RouteDeliverer = ({ match, location, history }) => {
  return (
    <Provider store={store}>
      <App location={location} store={store} />
    </Provider>
  );
};

render(
  <Router>
    <Route path="/" component={RouteDeliverer} />
  </Router>,
  document.getElementById('root')
);
