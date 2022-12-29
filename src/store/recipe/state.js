import { LocalStorage } from "quasar";

export default function () {
  return {
    fev_recipes: LocalStorage.getItem('bookmarkedRecipes') || [],
    bookmarkRecipes: [],
    recipeDf: [],
    recipeDraft: LocalStorage.getItem('recipeDraft') ?? [],
    editRecipe: [],
    myrecipes: [],
    recipe: [],
    detailedRecipes: [],
    recipes: [],
    detailedRecipes: [],
    filterRecipe: {
      diet_category: false,
      cuisine: false,
      cooking_time: false,
      sort: 'c2u',
      ingredients_used: false,
      dish_type: false,
      steps: false,
    },
    reaction: [],
    tab: '',

  }
}
