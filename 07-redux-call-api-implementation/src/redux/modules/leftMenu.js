import Enum from 'es6-enum'
import { UPDATE_LOCATION } from 'react-router-redux'
import _ from 'lodash'

const [HOME, SIZES, RECIPES, SALES] = ['HOME', 'SIZES', 'RECIPES', 'SALES']
export const MENU = {
  [HOME]: {value: HOME, router: '/home'},
  [SIZES]: {value: SIZES, router: '/sizes'},
  [RECIPES]: {value: RECIPES, router: '/recipes'},
  [SALES]: {value: SALES, router: '/sales'}
}
const MENU_CHANGE = 'MENU_CHANGE'

// ACTIONS
export const changeToMenu = (menuValue) => ({
  type: MENU_CHANGE,
  payload: menuValue
})

// ACTION HANDLERS

// HELPERS
const menuValueForRouter = (router) => {
  var match = _.filter(MENU, (menuValue) => (menuValue.router === router))
  return match
}

// REDUCER

const INITIAL_STATE = {current: MENU.HOME.value}
const reducer = (state = INITIAL_STATE, action) => {
  if (action.type === UPDATE_LOCATION) {
    const match = menuValueForRouter(action.payload.pathname)
    if (match && match.length > 0) {
      return {
        ...state,
        current: match[0].value
      }
    }
  }

  return state
}

export default reducer
