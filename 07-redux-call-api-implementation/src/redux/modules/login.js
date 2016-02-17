import { CALL_API, POST } from '../middlewares/callApi'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

export const LOGOUT = 'LOGOUT'

export const login = (userProps) => {
  let payload = {
    user: userProps
  }

  return {
    [CALL_API]: {
      types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
      endpoint: 'sessions/',
      method: POST,
      payload,
      authenticate: false
    }
  }
}

export const signup = (userProps) => {
  userProps.passwordConfirmation = userProps.password

  let payload = {
    user: userProps
  }

  return {
    [CALL_API]: {
      types: [SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE],
      endpoint: 'users/',
      method: POST,
      payload,
      authenticate: false
    }
  }
}

export const logout = () => ({
  type: LOGOUT
})

export const actions = {
  login,
  signup,
  logout
}

// action handlers
const signupActionHandler = (state, action) => {
  console.log('signupActionHandler')

  if (action.error) {
    console.log('signup falhou bro')
  } else {
    console.log('signup deu super certo bro')
  }

  return state
}

const loginActionHandler = (state, action) => {
  console.log(action)

  const {email, authenticationToken, id} = action.payload

  return {
    ...state,
    email,
    id,
    token: authenticationToken
  }
}

const loginFailureActionHandler = (state, action) => {
  console.log('loginFailureActionHandler')
  console.log(action)
  return state
}

const INITIAL_STATE = {token: null, email: null, id: null}

const logoutHandler = (state, action) => {
  return {
    ...state,
    ...INITIAL_STATE
  }
}

const ACTION_HANDLERS = {
  [LOGIN_SUCCESS]: loginActionHandler,
  [LOGIN_FAILURE]: loginFailureActionHandler,
  [SIGNUP_SUCCESS]: signupActionHandler,
  [LOGOUT]: logoutHandler
}

// Reducer

const loginReducer = (state = INITIAL_STATE, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

export default loginReducer
