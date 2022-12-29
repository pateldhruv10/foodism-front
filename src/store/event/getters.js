// import { getWithExpiry } from '../../utils/storage';
import { sortArray } from '../../utils/array';

export function getUserEvents(state) {
  return state.user_events;
}

export function getFevEvents(state) {
  return state.fev_events;
}

export function getvlogPreview(state) {
  return state.vlogPreview
}

export function getPreviewData(state) {
  return state.previewData
}

export function getRecipeData(state) {
  return state.recipeDraft
}

export function getSearchCity(state) {
  return state.filter.city;
}

export function getSearchType(state) {
  return state.filter.type;
}

export function getSearchMode(state) {
  return state.filter.mode;
}

export function getDateRange(state) {
  return state.filter.daterange;
}

export function getSortOption(state) {
  return state.filter.sort;
}

export function getEventCityOption(state) {
  const cities = state.eventcities
  let array = [];
  if (cities) {
    cities.map(city => array.push({
      value: city.id,
      label: city.name
    }))
  }
  return sortArray(array, 'label');
}


