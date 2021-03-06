import ls from 'local-storage'
import { SIGNUP_SUCCESS, LOGIN_SUCCESS, LOGOUT } from '../modules/login'

export default (store) => (next) => (action) => {
  let hash = {}

  if (action.type === SIGNUP_SUCCESS) {
    hash = action.payload.user
  }

  if (action.type === LOGIN_SUCCESS) {
    hash = action.payload
  }

  const {authenticationToken, email, id, firstStore} = hash

  if (action.type === SIGNUP_SUCCESS || action.type === LOGIN_SUCCESS) {
    const toPersist = {
      token: authenticationToken,
      email,
      id
    }

    ls('login', toPersist)
    ls('store', firstStore)
  }

  if (action.type === LOGOUT) {
    ls('login', null)
    ls('store', null)
  }

  return next(action)
}
