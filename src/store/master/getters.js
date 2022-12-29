// import { getWithExpiry } from '../../utils/storage';
import { sortArray } from '../../utils/array';

export function getCategories(state) {
  return state.categories
}

export function drawerState(state) {
  return state.drawer
}

export function getCities(state) {
  return state.cities
}

export function getCityOption(state) {
  const cities = state.cities
  let array = [];
  if (cities) {
    cities.map(city => array.push({
      value: city.id,
      label: city.name
    }))
  }
  return sortArray(array, 'label');
}


export function getCityNameFromId(state, cityId) {
  const cities = state.cities
  if (cities) {
    return cities.filter(city => city.id === cityId)[0];
  }
  return cityId;
}

export function getPreferredCuisine(state) {
  return state.cuisines;
}



export function getPreferredCuisineOption(state) {
  const data = state.cuisines;
  let array = [];

  if (data) {
    data.map(item => array.push({
      value: item.id,
      label: item.name
    }))
  }

  return sortArray(array, 'label');
}


export function getDietCategory(state) {
  return state.dietCat;
}
export function getDietCategoryOption(state) {
  const data = state.dietCat;
  let array = [];

  if (data) {
    data.map(item => array.push({
      value: item.id,
      label: item.name
    }))
  }

  return sortArray(array, 'label');
}


export function getPreferredFood(state) {
  return state.foodPreference;
}
export function getPreferredFoodOption(state) {
  const data = state.foodPreference // Change here it should be state.cuisineTypes
  let array = [];

  if (data) {
    data.map(item => array.push({
      value: item.id,
      label: item.name
    }))
  }

  return sortArray(array, 'label');
}

export function getLanguages(state) {
  return state.languages;
}

export function getLanguage(state, id) {
  return state.languages.find(language => language.id === id);
}

export function getCuisineTypeOption(state) {
  const data = state.cuisines // Change here it should be state.cuisineTypes
  let array = [];

  if (data) {
    data.map(item => array.push({
      value: item.id,
      label: item.name
    }))
  }

  return sortArray(array, 'label');
}

export function getdishTypes(state){
  return state.dishTypes
}

export function getdishTypeOption(state) {
  const data = state.dishTypes // Change here it should be state.cuisineTypes
  let array = [];
  if (data) {
    data.map(item => array.push({
      value: item.id,
      label: item.name
    }))
  }
  return sortArray(array, 'label');
}

export function getServingTypes(state) {
  const data = state.servingTypes
  let array = [];
  if (data) {
    data.map(item => array.push({
      value: item.id,
      name: item.name
    }))
  }
  return array;
}

export function getUnits(state) {
  const data = state.units // Change here it should be state.cuisineTypes
  let array = [];
  if (data) {
    data.map(item => array.push({
      value: item.id,
      name: item.name
    }))
  }

  return array;
}

export function getSearch(state) {
  return state.search;
}
