import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './imports';
import App from './containers/App';
import store from './store';

render(
  <Router>
    <App store={store} />
  </Router>,
  document.getElementById('root')
);
