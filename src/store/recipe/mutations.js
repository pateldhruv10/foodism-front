import { LocalStorage, Notify } from 'quasar'

export function setFevRecipes(state, data) {
  state.fev_recipes = data
  LocalStorage.set('bookmarkedRecipes', data)
}
export function setDetailedRecipes(state, data) {
  state.detailedRecipes = data
  // alert('??')
  // LocalStorage.set('editRecipeData', data)
}
export function setMyRecipes(state, data) {
  state.recipes = data
}

export function pushToRecipeBookmark(state, data) {
  state.bookmarkRecipes = data
  state.fev_recipes.push(data)
  LocalStorage.set('bookmarkedRecipes', state.fev_recipes)
}
export function removeRecipebookmark(state, item_id) {
  const recipes = _.cloneDeep(state.fev_recipes)

  for (var i = 0; i < recipes.length; i++) {
    if (recipes[i].id == item_id) {
      recipes.splice(i, 1)
    }
  }
  LocalStorage.set('bookmarkedRecipes', recipes)
  state.fev_recipes = recipes
}
export function addRecipeDraft(state, data) {
  if (state.recipeDraft.length > 20) {
    Notify.create({
      message: 'Draft Limit Exceeded !',
      type: 'negative',
      position: 'center',
    })
  } else {
    state.recipeDf = data
    state.recipeDraft.push(data)
    var newData = state.recipeDraft
    LocalStorage.set('recipeDraft', newData)
    Notify.create({
      timeout: 500,
      message: 'Saved to Draft',
      type: 'positive',
    })
  }
}
export function removeRecipeDraft(state, item_id) {
  const draft = _.cloneDeep(state.recipeDraft)

  for (var i in draft) {
    if (draft[i].id == item_id) {
      draft.splice(i, 1)
      break
    }
  }
  const df = draft
  state.recipeDraft = df
  LocalStorage.set('recipeDraft', df)
  Notify.create({
    message: 'Draft Successfully  Removed !',
    timeout: 500,
    type: 'positive',
  })
}
export function editRecipeDraft(state, payload) {
  state.editRecipe = payload
  const editDraft = _.cloneDeep(state.recipeDraft)
  for (var i in editDraft) {
    if (editDraft[i].id == payload.id) {
      editDraft[i] = payload
      break
    }
  }
  const de = editDraft
  state.recipeDraft = de
  LocalStorage.set('recipeDraft', de)
}
export function setMyRecipe(state, data) {
  state.myrecipes = data
  // var d = state.myrecipes.forEach((item) => {
  //   state.recipe.push(item)
  // })
}
export function recipeRefresh(state, data) {
  state.myrecipes = data
}
export function setSearchDietCategory(state, payload) {
  return (state.filterRecipe.diet_category = payload)
}
export function setSearchCuisine(state, payload) {
  return (state.filterRecipe.cuisine = payload)
}
export function setSearchCookingTime(state, payload) {
  return (state.filterRecipe.cooking_time = payload)
}
export function setSearchSort(state, payload) {
  return (state.filterRecipe.sort = payload)
}
export function setSearchIngredientsUsed(state, payload) {
  return (state.filterRecipe.ingredients_used = payload)
}
export function setSearchDishType(state, payload) {
  return (state.filterRecipe.dish_type = payload)
}
export function setSearchStep(state, payload) {
  return (state.filterRecipe.steps = payload)
}
export function setReaction(state, data) {
  console.log('-----> ' + (data.reaction))
  //  state.detailedRecipes.recipeReaction.reaction = data.reaction
  if (state.recipes.length !== 0) {
    for (var i = 0; i < state.recipes.length; i++) {
      if (state.recipes[i].id == data.recipe_id) {
        return (state.recipes[i].reaction = data.reaction)
      }
    }
  }
   else if (state.detailedRecipes !== null) {
    if (state.detailedRecipes.id == data.recipe_id) {
      // console.log(state.detailedRecipes.recipeReaction?.reaction)
      // console.log(data.reaction)
      if (state.detailedRecipes.recipeReaction !== null) {
        return (state.detailedRecipes.recipeReaction.reaction = data.reaction)
      } else {
        const recipeReaction = {
          reaction: data.reaction,
        }
        return (state.detailedRecipes.recipeReaction = recipeReaction)
      }
    }
  }
}

export function setReactionCount(state, data) {
  if (state.recipes.length !== 0) {
    for (var i = 0; i < state.recipes.length; i++) {
      if (state.recipes[i].id == data.recipe_id) {
        if (data.value) {
          return (state.recipes[i].reactionCount =
            state.recipes[i].reactionCount - 1)
        } else {
          return (state.recipes[i].reactionCount =
            state.recipes[i].reactionCount + 1)
        }
      }
    }
  } else if (state.detailedRecipes !== null) {
    if (state.detailedRecipes.id == data.recipe_id) {
      if (data.value) {
        return (state.detailedRecipes.count.reactionCount =
          state.detailedRecipes.count.reactionCount - 1)
      } else {
        return (state.detailedRecipes.count.reactionCount =
          state.detailedRecipes.count.reactionCount + 1)
      }
    }
  }
}

export function setImadeItCount(state, data) {
  return (state.detailedRecipes.count.iMadeItCount =
    state.detailedRecipes.count.iMadeItCount + 1)
}

export function setTab(state, data) {
  return (state.tab = data)
}

export function blockUser(state, user_id) {
  state.recipes.forEach((items, index, object) => {
    if (items.user_id == user_id) {
      object.splice(index, 1)
    }
  })
}
