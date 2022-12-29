
import notification from "src/boot/notification";
import api from "../../apis/index";



const FETCH_MY_RECIPES = '/recipe'
const FETCH_FEV_RECIPE = '/bookmarks'
// Add bookmark to server and locatstorage

export function bookmarkRecipe({ commit }, RecipeDetail) {
  return new Promise((resolve, reject) => {
    // Pushed in localhost before sendting to server
    const data = {
      id: RecipeDetail.id,
      image: RecipeDetail.image,
      name: RecipeDetail.name,
      slug: RecipeDetail.slug
    }
    commit('pushToRecipeBookmark', data)
    api.put(`recipe/${data.id}/add-bookmark`, {
      'recipe_id': RecipeDetail.id,
    }).then(res => {
      if (res.success) {
        resolve(res);
      } else {
        notification.error(res.message);
        commit('removeRecipebookmark', data.id)
      }
      resolve(res)
    }).catch(err => {
      commit('removeRecipebookmark', data.id)
      reject(err)
    });
  });
}

export function removeRecipeBookmark({ commit }, recipe_id) {
  return new Promise((resolve, reject) => {
    //Remove from Localhost before server
    commit('removeRecipebookmark', recipe_id)
    api.delete(`recipe/${recipe_id}/remove-bookmark`, {
      'recipe_id': recipe_id,
    }).then(res => {
      if (res.success) {
        commit('removeRecipebookmark', recipe_id); // remove from store
        resolve(res);
      } else {
        notification.error(res.message);
      }
      resolve(res)
    }).catch(err => {
      reject(err)
    });
  });
}

export async function fetchMyRecipe({ commit, getters }, data) {
  try {
    const res = await api.getWithParam(FETCH_MY_RECIPES, data);
    if (res.success) {
      const recipes = getters.myrecipes;
      const ev = recipes.concat(...res.data);
      commit('setMyRecipe', ev);
      return res
    }
  } catch (err) {
    return err
  }
}

export async function fetchMyRecipes({ commit, getters }, data) {
  try {
    const res = await api.getWithParam(FETCH_MY_RECIPES, data);
    if (res.success) {
      // const recipe = getters.recipe;
      const recipes = getters.recipes;
      const ev = recipes.concat(...res.data);
      commit('setMyRecipes', ev);

      return res
    }
  } catch (err) {
    return err
  }
}


export async function detailedRecipe({ commit }, data) {
  try {
    const res = await api.getWithParam(`recipe/${data}`);
    if (res.success) {
      // const recipe = getters.recipe;
      const ev = res.data;
      commit('setDetailedRecipes', ev);
      commit('setMyRecipes', []);
      // LocalStorage.set('editRecipeData', ev)
      return res
    }
  } catch (err) {
    return err
  }
}

export function removeMyRecipe({ commit, getters }, id) {
  const recipe = _.cloneDeep(getters.myrecipes);

  for (var i in recipe) {
    if (recipe[i].id == id) {
      recipe.splice(i, 1);
      break;
    }
  }
  recipe.forEach((items , index , object) => {
    if(items.id == id){
      object.splice(index,1)
    }
  });

  const ev = recipe;
  commit('recipeRefresh', ev);
}

export function fetchFevRecipe(context, data) {
  return new Promise((resolve, reject) => {
    api.getWithParam(FETCH_FEV_RECIPE, {
    }).then(res => {
      if (res.success) {
        context.commit('setFevRecipes', res.data.Recipes)
        resolve(res)
      }
    }).catch(err => {
      reject(err)
    });
  });
}



export async function resetRecipes({ commit }) {
  await commit('recipe/setMyRecipes', [], { root: true })
  await commit('recipe/setMyRecipe', [], { root: true })

  await commit('master/saveSearch', null, { root: true })

  // Reset all events filter to default
  await commit('setSearchDietCategory', false)
  await commit('setSearchCuisine', false)
  await commit('setSearchCookingTime', false)
  await commit('setSearchSort', false)
  await commit('setSearchIngredientsUsed', false)
  await commit('setSearchDishType', false)
  await commit('setSearchStep', false)
}

export function recipeReaction({ commit }, data) {
  return new Promise((resolve, reject) => {
    api.put('recipe/reaction', data).then(res => {
      if (res.success) {
        resolve(res);
      } else {
        notification.error(res.message);
      }
      resolve(res)
    }).catch(err => {
      reject(err)
    });
  });
}
