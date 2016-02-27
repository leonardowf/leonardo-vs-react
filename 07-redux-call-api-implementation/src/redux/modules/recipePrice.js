import { CALL_API, GET, POST, PUT, DELETE } from '../middlewares/callApi'
import { CREATE_RECIPE_SIZES_SUCCESS, DELETE_RECIPE_SIZES_SUCCESS } from './recipeSize'
import { CREATE_RECIPE_CATEGORY_SUCCESS, DELETE_RECIPE_CATEGORY_SUCCESS } from './recipeCategory'

export const FETCH_RECIPE_PRICES_REQUEST = 'FETCH_RECIPE_PRICES_REQUEST'
export const FETCH_RECIPE_PRICES_SUCCESS = 'FETCH_RECIPE_PRICES_SUCCESS'
export const FETCH_RECIPE_PRICES_ERROR = 'FETCH_RECIPE_PRICES_ERROR'

export const UPDATE_RECIPE_PRICE_REQUEST = 'UPDATE_RECIPE_PRICE_REQUEST'
export const UPDATE_RECIPE_PRICE_SUCCESS = 'UPDATE_RECIPE_PRICE_SUCCESS'
export const UPDATE_RECIPE_PRICE_ERROR = 'UPDATE_RECIPE_PRICE_ERROR'

export const RESET_DIRTY = 'RESET_DIRTY'

export const fetchRecipePrices = () => {
  return {
    [CALL_API]: {
      types: [FETCH_RECIPE_PRICES_REQUEST, FETCH_RECIPE_PRICES_SUCCESS, FETCH_RECIPE_PRICES_ERROR],
      endpoint: 'recipe_prices/',
      method: GET,
      authenticate: true,
      storeResource: true
    }
  }
}

export const updateRecipePrice = (recipePrice) => {
  return {
    [CALL_API]: {
      types: [UPDATE_RECIPE_PRICE_REQUEST, UPDATE_RECIPE_PRICE_SUCCESS, UPDATE_RECIPE_PRICE_ERROR],
      endpoint: `recipe_prices/${recipePrice.id}`,
      method: PUT,
      authenticate: true,
      storeResource: true,
      payload: {
        recipePrice: recipePrice
      }
    }
  }
}

export const resetDirty = () => {
  return {
    type: RESET_DIRTY
  }
}

const setRecipeSizeAsDirty = (state, action) => ({
  ...state, dirty: true
})

const fetchRecipePricesSuccess = (state, action) => ({
  ...state,
  all: action.payload.recipePrices
})

const resetDirtyHandler = (state, action) => ({
  ...state, dirty: false
})

const ACTION_HANDLERS = {
  [CREATE_RECIPE_CATEGORY_SUCCESS]: setRecipeSizeAsDirty,
  [CREATE_RECIPE_SIZES_SUCCESS]: setRecipeSizeAsDirty,
  [FETCH_RECIPE_PRICES_SUCCESS]: fetchRecipePricesSuccess,
  [RESET_DIRTY]: resetDirtyHandler,
  [DELETE_RECIPE_SIZES_SUCCESS]: setRecipeSizeAsDirty,
  [DELETE_RECIPE_CATEGORY_SUCCESS]: setRecipeSizeAsDirty
}

const RECIPE_PRICE_INITIAL_STATE = {dirty: false, all: [], loading: false, error: null}

const reducer = (state = RECIPE_PRICE_INITIAL_STATE, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

export default reducer

export const actions = {
  fetchRecipePrices,
  resetDirty,
  updateRecipePrice
}
