import callApi, { CALL_API, GET, POST } from '../middlewares/callApi'

export const FETCH_RECIPE_SIZES_REQUEST = 'FETCH_RECIPE_SIZES_REQUEST'
export const FETCH_RECIPE_SIZES_SUCCESS = 'FETCH_RECIPE_SIZES_SUCCESS'
export const FETCH_RECIPE_SIZES_ERROR = 'FETCH_RECIPE_SIZES_ERROR'

export const CREATE_RECIPE_SIZES_REQUEST = 'CREATE_RECIPE_SIZES_REQUEST'
export const CREATE_RECIPE_SIZES_SUCCESS = 'CREATE_RECIPE_SIZES_SUCCESS'
export const CREATE_RECIPE_SIZES_ERROR = 'CREATE_RECIPE_SIZES_ERROR'

// ACTIONS
const fetchRecipeSizes = () => {
  return {
    [CALL_API]: {
      types: [FETCH_RECIPE_SIZES_REQUEST, FETCH_RECIPE_SIZES_SUCCESS, FETCH_RECIPE_SIZES_ERROR],
      endpoint: 'recipe_sizes/',
      method: GET,
      null,
      authenticate: true,
      storeResource: true
    }
  }
}

const createRecipeSize = (name) => {
  const payload = {
    recipeSize: {
      name
    }
  }

  return {
    [CALL_API]: {
      types: [CREATE_RECIPE_SIZES_REQUEST, CREATE_RECIPE_SIZES_SUCCESS, CREATE_RECIPE_SIZES_ERROR],
      endpoint: 'recipe_sizes/',
      method: POST,
      payload,
      authenticate: true,
      storeResource: true
    }
  }
}

// ACTION HANDLERS
const fetchRecipeSizesHandler = (state, action) => {
  return {
    ...state,
    loading: true
  }
}

const fetchRecipeSizesErrorHandler = (state, action) => {
  return {
    ...state,
    loading: false
  }
}

const fetchRecipeSizesSuccessHandler = (state, action) => {
  const fetched = action.payload.recipeSizes

  return {
    ...state,
    all: fetched,
    loading: false
  }
}

const createRecipeSizesSuccessHandler = (state, action) => {
  const created = action.payload.recipeSize

  return {
    ...state,
    all: [...state.all, created]
  }
}

const ACTION_HANDLERS = {
  [FETCH_RECIPE_SIZES_REQUEST]: fetchRecipeSizesHandler,
  [FETCH_RECIPE_SIZES_ERROR]: fetchRecipeSizesErrorHandler,
  [FETCH_RECIPE_SIZES_SUCCESS]: fetchRecipeSizesSuccessHandler,
  [CREATE_RECIPE_SIZES_SUCCESS]: createRecipeSizesSuccessHandler
}

// REDUCER
const RECIPE_SIZES_INITIAL_STATE = {all: [], loading: false, error: null}

const reducer = (state = RECIPE_SIZES_INITIAL_STATE, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

export const actions = {
  fetchRecipeSizes,
  createRecipeSize
}

export default reducer
