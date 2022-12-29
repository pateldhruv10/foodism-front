import { setWithExpiry, getWithExpiry } from '../../utils/storage'

export function toggleDrawer(state) {
  state.drawer = !state.drawer
}

export function setCities(state, payload) {
  // setWithExpiry('cities', payload)
  // state.cities = getWithExpiry('cities')
  state.cities = payload
}

export function setEventCities(state, payload) {
  // setWithExpiry('eventcities', payload)
  // state.eventcities = getWithExpiry('eventcities')
  state.eventcities = payload
}

export function setLanguages(state, payload) {
  // setWithExpiry('languages', payload)
  // state.languages = getWithExpiry('languages')
  state.languages = payload
}

export function setCuisine(state, payload) {
  // setWithExpiry('cuisines', payload)
  // state.cuisines = getWithExpiry('cuisines')
  state.cuisines = payload
}

export function setFoodPreference(state, payload) {
  // setWithExpiry('foodPreferences', payload)
  // state.foodPreference = getWithExpiry('foodPreferences')
  state.foodPreference = payload
}

export function setCategories(state, payload) {
  // setWithExpiry('categories', payload)
  // state.categories = getWithExpiry('categories')
  state.categories = payload
}

export function setdishTypes(state, payload) {
  // setWithExpiry('dishTypes', payload)
  // state.dishTypes = getWithExpiry('dishTypes')
  state.dishTypes = payload
}

export function setDietCat(state, payload) {
  // setWithExpiry('dietCat', payload)
  // state.dietCat =getWithExpiry('dietCat')
  state.dietCat = payload
}

export function setServingTypes(state, payload) {
  // setWithExpiry('servingTypes', payload)
  // state.servingTypes = getWithExpiry('servingTypes')
  state.servingTypes = payload
}

export function setUnits(state, payload) {
  // setWithExpiry('units', payload)
  // state.units = getWithExpiry('units')
  state.units = payload
}

export function saveSearch(state, payload) {
  state.search = payload
}

