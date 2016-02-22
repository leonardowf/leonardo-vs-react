import { CALL_API, POST } from '../middlewares/callApi'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

export const LOGOUT = 'LOGOUT'

export const RESET_LOGIN_ERRORS = 'RESET_LOGIN_ERRORS'
export const RESET_SIGNUP_ERRORS = 'RESET_SIGNUP_ERRORS'

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

export const resetLoginErrors = () => ({
  type: RESET_LOGIN_ERRORS
})

export const resetSignupErrors = () => ({
  type: RESET_SIGNUP_ERRORS
})

export const actions = {
  login,
  signup,
  logout,
  resetLoginErrors,
  resetSignupErrors
}

// action handlers
const signupActionHandler = (state, action) => {
  if (action.type === SIGNUP_REQUEST) {
    return {
      ...state,
      signupErrors: []
    }
  }

  if (action.type === SIGNUP_SUCCESS) {
    const {email, authenticationToken, id} = action.payload.user
    console.log(action)
    return {
      ...state,
      email,
      id,
      token: authenticationToken
    }
  }

  if (action.error) {
    return {
      ...state,
      signupErrors: action.payload.data
    }
  } else {
  }

  return state
}

const loginActionHandler = (state, action) => {
  const {email, authenticationToken, id} = action.payload

  return {
    ...state,
    email,
    id,
    token: authenticationToken
  }
}

const loginFailureActionHandler = (state, action) => {
  if (action.error) {
    return {
      ...state,
      loginErrors: action.payload.data
    }
  }
  return state
}

const loadingHandler = (actionHandler, loading) => (state, action) => {
  return actionHandler({...state, loading}, action)
}

const loginRequestActionHandler = (state, action) => {
  return {...state, loginErrors: []}
}

const logoutHandler = (state, action) => {
  return {
    ...state,
    ...LOGIN_INITIAL_STATE
  }
}

const resetLoginErrorsHandler = (state, action) => {
  return {
    ...state, loginErrors: []
  }
}

const resetSignupErrorsHandler = (state, action) => {
  return {
    ...state, signupErrors: []
  }
}

const ACTION_HANDLERS = {
  [LOGIN_REQUEST]: loadingHandler(loginRequestActionHandler, true),
  [LOGIN_SUCCESS]: loadingHandler(loginActionHandler, false),
  [LOGIN_FAILURE]: loadingHandler(loginFailureActionHandler, false),
  [SIGNUP_FAILURE]: loadingHandler(signupActionHandler, false),
  [SIGNUP_REQUEST]: loadingHandler(signupActionHandler, true),
  [SIGNUP_SUCCESS]: loadingHandler(signupActionHandler, false),
  [LOGOUT]: logoutHandler,
  [RESET_LOGIN_ERRORS]: resetLoginErrorsHandler,
  [RESET_SIGNUP_ERRORS]: resetSignupErrorsHandler
}

// Reducer
export const LOGIN_INITIAL_STATE = {
  token: null,
  email: null,
  id: null,
  loading: false,
  loginErrors: [],
  signupErrors: []
}

const loginReducer = (state = LOGIN_INITIAL_STATE, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

export default loginReducer
