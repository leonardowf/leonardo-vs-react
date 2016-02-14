import humps from 'humps'

export const LOGIN = 'LOGIN'
export const SIGNUP = 'SIGNUP'

import axios from 'axios'

export const login = (userProps) => {
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  axios.defaults.headers.post['Accepts'] = 'application/json'

  var userLogin = {
    user: userProps
  }

  var request = axios.post('http://localhost:4000/v1/sessions.json', userLogin)

  return {
    type: LOGIN,
    payload: request
  }
}

export const signup = (userProps) => {
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  axios.defaults.headers.post['Accepts'] = 'application/json'

  userProps.passwordConfirmation = userProps.password

  var userSignup = {
    user: userProps
  }

  var request = axios.post('http://localhost:4000/v1/users.json', humps.decamelizeKeys(userSignup))

  return {
    type: SIGNUP,
    payload: request
  }
}

export const actions = {
  login,
  signup
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
  console.log('loginActionHandler')
  return state
}

const ACTION_HANDLERS = {
  [LOGIN]: loginActionHandler,
  [SIGNUP]: signupActionHandler
}

// Reducer

const INITIAL_STATE = {token: null, user_id: null, user_email: null}

const loginReducer = (state = INITIAL_STATE, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

export default loginReducer
