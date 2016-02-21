import axios from 'axios'
import { camelizeKeys, decamelizeKeys } from 'humps'

const API_ROOT = 'http://localhost:4000/v1/'

export const POST = 'post'
export const GET = 'get'
export const PUT = 'put'
export const DELETE = 'delete'

export const CALL_API = Symbol('Call API')

const getAuthToken = (store) => {
  const appState = store.getState()
  return appState.login.token
}

const getUserEmail = (store) => {
  const appState = store.getState()
  return appState.login.email
}

const callApi = (store, url, method, data, authenticate = true) => {
  let headers = {
    'Accepts': 'application/json',
    'Content-Type': 'application/json'
  }

  const authToken = getAuthToken(store)
  const userEmail = getUserEmail(store)

  if (authenticate && authToken && userEmail) {
    headers = {
      ...headers,
      'Authorization': `Token token="${authToken}", email="${userEmail}"`
    }
  }

  return axios({
    method,
    url,
    baseURL: API_ROOT,
    data: decamelizeKeys(data),
    headers
  })
  .then(function (response) {
    return camelizeKeys(response.data)
  })
  .catch(function (response) {
    return Promise.reject(response)
  })
}

export default (store) => (next) => (action) => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { types, method, payload, authenticate } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }

  function actionWith (data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(store, endpoint, method, payload, authenticate).then(
    (data) => next(actionWith({
      payload: data,
      type: successType
    })),
    (response) => next(actionWith({
      type: failureType,
      payload: response,
      error: true
    }))
  )
}
