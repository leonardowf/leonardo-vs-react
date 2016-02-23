import { LOGIN_SUCCESS, SIGNUP_SUCCESS } from './login'

const INITIAL_STATE = {current: null, all: []}

const reducer = (state = INITIAL_STATE, action) => {
  let credentials = null;

  if (action.type === LOGIN_SUCCESS) {
    credentials = action.payload
  }

  if (action.type === SIGNUP_SUCCESS) {
    credentials = action.payload.user
  }

  if (credentials) {
    console.log(credentials)

    return {
      ...state,
      current: credentials.firstStore
    }
  }

  return state
}

export default reducer
