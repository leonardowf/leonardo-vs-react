import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import _ from 'lodash';

import App from './components/app';
import reducers from './reducers';

const finalCreateStore = _.compose(
  applyMiddleware(ReduxPromise),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
)(createStore);

ReactDOM.render(
  <Provider store={finalCreateStore(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));
