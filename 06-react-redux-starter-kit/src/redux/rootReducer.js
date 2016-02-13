import { combineReducers } from 'redux'
import { routeReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  counter,
  router,
  form: formReducer
})
