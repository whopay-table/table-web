import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import reducer from '../reducers';

export default createStore(
  reducer,
  applyMiddleware(thunk, api)
);
