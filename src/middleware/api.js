import { camelizeKeys } from 'humps'
import queryString from 'query-string';
import * as Server from '../../configs/server';

const API_URL = Server.url;
const API_REQUEST_KEY = 'API_REQUEST';

const requestApi = (method, endpoint, params, token) => {
  let fullUrl = endpoint.includes(API_URL) ? endpoint : API_URL + endpoint;
  let body = undefined;

  const encodeParams = params => {
    const filteredParams = {};
    for (const key of Object.keys(params || {})) {
      if (!key.startsWith('_')) {
        filteredParams[key] = params[key];
      }
    }
    return queryString.stringify(filteredParams);
  };

  const encodedParams = encodeParams(params);
  if (typeof method === 'undefined' || method === 'GET') {
    const separator = fullUrl.includes('?') ? '&' : '?';
    fullUrl = `${fullUrl}${separator}${encodedParams}`;
  } else {
    body = encodedParams;
  }

  const init = {
    method: method || 'GET',
    headers: Object.assign({
      'Content-Type': 'application/x-www-form-urlencoded'
    }, token ? {
      'Authorization': `Token ${token}`
    } : {}),
    body: body
  };

  return fetch(fullUrl, init).then(response => {
    return response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      } else {
        return camelizeKeys(json);
      }
    });
  }, error => {
    console.error('Failed to request to API', error);
  });
};

export default store => next => action => {
  const request = action.API_REQUEST;

  if (typeof request === 'undefined') {
    return next(action);
  }
  let { endpoint } = request;
  const { type, method, params, token } = request;
  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (typeof type !== 'object') {
    throw new Error('Expected action type to be an object.');
  }
  if (!['request', 'success', 'failure'].every(prop => typeof type[prop] === 'string')) {
    throw new Error('Expected action type to be an object with request, success, and failure string properties.');
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[API_REQUEST_KEY];
    return finalAction;
  };
  next(actionWith({ type: type.request, params }));

  return requestApi(method, endpoint, params, token).then(response => next(actionWith({
    response,
    params,
    type: type.success
  })), error => next(actionWith({
    error,
    params,
    type: type.failure
  })));
}
