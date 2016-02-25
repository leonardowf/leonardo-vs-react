import { CREATE_RECIPE_SIZES_SUCCESS } from './recipeSize'
import { CREATE_RECIPE_CATEGORY_SUCCESS } from './recipeCategory'

const CATEGORY_SIZE_INITIAL_STATE = {dirty: false}
const reducer = (state = CATEGORY_SIZE_INITIAL_STATE, action) => {
  if (action.type === CREATE_RECIPE_CATEGORY_SUCCESS || action.type === CREATE_RECIPE_SIZES_SUCCESS) {
    return {
      ...state, dirty: true
    }
  }

  return state
}

export default reducer
