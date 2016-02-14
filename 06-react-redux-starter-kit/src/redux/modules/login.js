import humps from 'humps'

const LOGIN = 'LOGIN'
const SIGNUP = 'SIGNUP'

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

// Reducer

const INITIAL_STATE = {token: null, user_id: null, user_email: null}

const loginReducer = (state = INITIAL_STATE, action) => {
  console.log('no reducer: ')
  console.log(action)
  return state
}

export default loginReducer
