import api from "../../apis/index.js";

const CITY_API = '/misc/cities';
const CUISINE_API = '/misc/cuisine-preference';
const FOOD_PREFERENCE_API = '/misc/food-preference';
const LANGUAGE_API = '/misc/languages';
const DISH_TYPE_API = '/dish-type';
const SERVING_TYPE_API = '/serving-type';
const UNIT_API = '/unit';
const CATEGORY_API = '/category';
const DIET_CATEGORY = '/misc/diet-category'


export async function getCitiesApi (context) {
  return new Promise(async (resolve, reject) => {
    await api.get(CITY_API).then(response => {
    context.commit("setCities", response.data);
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}



export async function getCuisines (context) {
  return new Promise(async (resolve, reject) => {
    await api.get(CUISINE_API).then(response => {
      context.commit("setCuisine", response.data);
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}

export async function getFoodPreference (context) {
  return new Promise(async (resolve, reject) => {
    await api.get(FOOD_PREFERENCE_API).then(response => {
      context.commit("setFoodPreference", response.data);
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}

export async function getLanguages (context) {
  return new Promise(async (resolve, reject) => {
    await api.get(LANGUAGE_API).then(response => {
      context.commit("setLanguages", response.data);
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}

export async function getCategories (context) {
  return new Promise(async (resolve, reject) => {
    await api.get(CATEGORY_API).then(response => {
      context.commit("setCategories", response.data);
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}

export async function getdishTypes (context) {
  return new Promise(async (resolve, reject) => {
    await api.get(DISH_TYPE_API).then(response => {
      context.commit("setdishTypes", response.data);
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}

export async function getServingTypes (context) {
  return new Promise(async (resolve, reject) => {
    await api.get(SERVING_TYPE_API).then(response => {
      context.commit("setServingTypes", response.data);
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}

export async function getUnits (context) {
  return new Promise(async (resolve, reject) => {
    await api.get(UNIT_API).then(response => {
      context.commit("setUnits", response.data);
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}

export async function getDietCat (context) {
  return new Promise(async (resolve, reject) => {
    await api.get(DIET_CATEGORY).then(response => {
      context.commit("setDietCat", response.data);
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}


