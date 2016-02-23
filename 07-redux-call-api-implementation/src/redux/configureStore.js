import { applyMiddleware, compose, createStore } from 'redux'
import { syncHistory } from 'react-router-redux'
import thunk from 'redux-thunk'
import ls from 'local-storage'

import callApi from './middlewares/callApi'
import credentialPersisterMiddleware from './middlewares/credentialPersisterMiddleware'
import rootReducer from './rootReducer'

import { LOGIN_INITIAL_STATE } from './modules/login'
import { STORE_INITIAL_STATE } from './modules/store'

export default function configureStore ({ initialState = {}, history }) {
  // Sync with router via history instance (main.js)
  const routerMiddleware = syncHistory(history)

  let persistedLogin = ls('login')
  persistedLogin = {...LOGIN_INITIAL_STATE, ...persistedLogin}
  if (persistedLogin !== null) {
    initialState = {
      ...initialState,
      login: {...persistedLogin}
    }
  }

  let persistedStore = ls('store')
  console.log('persisted store')
  console.log(persistedStore)
  persistedStore = {...STORE_INITIAL_STATE, current: persistedStore}
  if (persistedStore !== null) {
    initialState = {
      ...initialState,
      store: {...persistedStore}
    }

    console.log(initialState)
  }

  // Compose final middleware and use devtools in debug environment
  let middleware = applyMiddleware(thunk, routerMiddleware, callApi, credentialPersisterMiddleware)
  if (__DEBUG__) {
    const devTools = window.devToolsExtension
      ? window.devToolsExtension()
      : require('containers/DevTools').default.instrument()
    middleware = compose(middleware, devTools)
  }

  // Create final store and subscribe router in debug env ie. for devtools
  const store = middleware(createStore)(rootReducer, initialState)
  if (__DEBUG__) routerMiddleware.listenForReplays(store, ({ router }) => router.location)

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default

      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
