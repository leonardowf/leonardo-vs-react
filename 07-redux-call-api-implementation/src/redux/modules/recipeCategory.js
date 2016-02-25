import callApi, { CALL_API, GET, POST, PUT, DELETE } from '../middlewares/callApi'

export const FETCH_RECIPE_CATEGORIES_REQUEST = 'FETCH_RECIPE_CATEGORIES_REQUEST'
export const FETCH_RECIPE_CATEGORIES_SUCCESS = 'FETCH_RECIPE_CATEGORIES_SUCCESS'
export const FETCH_RECIPE_CATEGORIES_ERROR = 'FETCH_RECIPE_CATEGORIES_ERROR'

export const CREATE_RECIPE_CATEGORY_REQUEST = 'CREATE_RECIPE_CATEGORY_REQUEST'
export const CREATE_RECIPE_CATEGORY_SUCCESS = 'CREATE_RECIPE_CATEGORY_SUCCESS'
export const CREATE_RECIPE_CATEGORY_ERROR = 'CREATE_RECIPE_CATEGORY_ERROR'

export const UPDATE_RECIPE_CATEGORY_REQUEST = 'UPDATE_RECIPE_CATEGORY_REQUEST'
export const UPDATE_RECIPE_CATEGORY_SUCCESS = 'UPDATE_RECIPE_CATEGORY_SUCCESS'
export const UPDATE_RECIPE_CATEGORY_ERROR = 'UPDATE_RECIPE_CATEGORY_ERROR'

export const DELETE_RECIPE_CATEGORY_REQUEST = 'DELETE_RECIPE_CATEGORY_REQUEST'
export const DELETE_RECIPE_CATEGORY_SUCCESS = 'DELETE_RECIPE_CATEGORY_SUCCESS'
export const DELETE_RECIPE_CATEGORY_ERROR = 'DELETE_RECIPE_CATEGORY_ERROR'

const fetchRecipeCategories = () => {
  return {
    [CALL_API]: {
      types: [FETCH_RECIPE_CATEGORIES_REQUEST, FETCH_RECIPE_CATEGORIES_SUCCESS, FETCH_RECIPE_CATEGORIES_ERROR],
      endpoint: 'recipe_categories/',
      method: GET,
      null,
      authenticate: true,
      storeResource: true
    }
  }
}

const deleteRecipeCategory = (recipeCategory) => {
  return {
    [CALL_API]: {
      types: [DELETE_RECIPE_CATEGORY_REQUEST, DELETE_RECIPE_CATEGORY_SUCCESS, DELETE_RECIPE_CATEGORY_ERROR],
      endpoint: `recipe_categories/${recipeCategory.id}`,
      method: DELETE,
      null,
      authenticate: true,
      storeResource: true
    }
  }
}

const createRecipeCategory = (name) => {
  const payload = {
    recipeCategory: {
      name
    }
  }

  return {
    [CALL_API]: {
      types: [
        CREATE_RECIPE_CATEGORY_REQUEST,
        CREATE_RECIPE_CATEGORY_SUCCESS,
        CREATE_RECIPE_CATEGORY_ERROR],
      endpoint: 'recipe_categories/',
      method: POST,
      payload,
      authenticate: true,
      storeResource: true
    }
  }
}

const updateRecipeCategory = (recipeCategory, name) => {
  const payload = {
    recipeCategory: {
      ...recipeCategory, name
    }
  }

  return {
    [CALL_API]: {
      types: [UPDATE_RECIPE_CATEGORY_REQUEST, UPDATE_RECIPE_CATEGORY_SUCCESS, UPDATE_RECIPE_CATEGORY_ERROR],
      endpoint: `recipe_categories/${recipeCategory.id}`,
      method: PUT,
      payload,
      authenticate: true,
      storeResource: true
    }
  }
}

// action handlers

const fetchRecipeCategoriesSuccess = (state, action) => {
  const fetched = action.payload.recipeCategories
  return {
    ...state,
    all: fetched,
    loading: false
  }
}

const deleteRecipeCategorySuccessHandler = (state, action) => {
  const deleted = action.payload.recipeCategory

  const allWithoutRemoved = state.all.filter((recipeCategory) => recipeCategory.id !== deleted.id)

  return {
    ...state,
    all: allWithoutRemoved
  }
}

const createRecipeCategorySuccess = (state, action) => {
  const created = action.payload.recipeCategory

  return {
    ...state,
    all: [...state.all, created]
  }
}

const ACTION_HANDLERS = {
  [FETCH_RECIPE_CATEGORIES_SUCCESS]: fetchRecipeCategoriesSuccess,
  [DELETE_RECIPE_CATEGORY_SUCCESS]: deleteRecipeCategorySuccessHandler,
  [CREATE_RECIPE_CATEGORY_SUCCESS]: createRecipeCategorySuccess
}

// REDUCER
const RECIPE_CATEGORIES_INITIAL_STATE = {all: [], loading: false, error: null}

const reducer = (state = RECIPE_CATEGORIES_INITIAL_STATE, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

export const actions = {
  fetchRecipeCategories,
  deleteRecipeCategory,
  createRecipeCategory,
  updateRecipeCategory
}

export default reducer
