import ls from 'local-storage'
import { SIGNUP_SUCCESS, LOGIN_SUCCESS, LOGOUT } from '../modules/login'

export default (store) => (next) => (action) => {
  if (action.type === SIGNUP_SUCCESS || action.type === LOGIN_SUCCESS) {
    const {authenticationToken, email, id} = action.payload
    const toPersist = {
      token: authenticationToken,
      email,
      id
    }

    ls('login', toPersist)
  }

  if (action.type === LOGOUT) {
    ls('login', null)
  }

  return next(action)
}
