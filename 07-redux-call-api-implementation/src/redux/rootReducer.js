import { combineReducers } from 'redux'
import { routeReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import login from './modules/login'
import store from './modules/store'
import leftMenu from './modules/leftMenu'
import recipeSize from './modules/recipeSize'
import recipeCategory from './modules/recipeCategory'
import categorySize from './modules/categorySize'

import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  counter,
  router,
  login,
  form: formReducer,
  leftMenu,
  store,
  recipeSize,
  recipeCategory,
  categorySize
})
