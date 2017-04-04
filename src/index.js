import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './imports';
import App from './containers/App';
import store from './store';

render(
  <Router>
    <Provider store={store}>
      <App store={store} />
    </Provider>
  </Router>,
  document.getElementById('root')
);
