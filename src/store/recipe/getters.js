import { getWithExpiry } from '../../utils/storage'
import { sortArray } from '../../utils/array'

export function getRecipeData(state) {
  return state.recipeDraft
}

export function myrecipes(state) {
  return state.myrecipes
}

export function getDetailedRecipes(state) {
  return state.detailedRecipes
}

export function get_fev_recipes(state) {
  return state.fev_recipes
}

export function recipes(state) {
  return state.recipes
}

export function getSearchDietCategory(state) {
  return state.filterRecipe.diet_category
}

export function getSearchCuisineType(state) {
  return state.filterRecipe.cuisine
}

export function getSearchCookingTime(state) {
  return state.filterRecipe.cooking_time
}

export function getSearchSort(state) {
  return state.filterRecipe.sort
}

export function getSearchIngredientsUsed(state) {
  return state.filterRecipe.ingredients_used
}

export function getSearchDishType(state) {
  return state.filterRecipe.dish_type
}

export function getSearchSteps(state) {
  return state.filterRecipe.steps
}

export function getReaction(state) {
  return state.reaction
}

export function getTab(state) {
  return state.tab
}
