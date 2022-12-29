import _ from 'lodash'

export function cuisines(state) {
  return state.cuisines
}

export function toppicks(state) {
  return state.toppicks
}

export function popularsellers(state) {
  return state.popularsellers
}

export function occasions(state) {
  return state.occasions
}

export function popularfoods(state) {
  return state.popularfoods
}

export function events(state) {
  return state.events;
}

export function currentHomeTab(state){
  return state.currentTab
}

export function getMyInterestedEvent(state){
  return state.myInterested
}

export function getEvent(state) {
  return state.event;
}

export function getProfile(state) {
  return state.profile;
}

export function getCoverImage(state) {
  return state.event && state.event.images && state.event.images.length ? state.event.images?.find(it => it.is_cover_page == 1) ?? null : null
}

export function getEditGalleryImages(state) {
  const images = _.cloneDeep(state.event.images);
  if (images && images.length >= 1) { images.shift() }
  return images
}

export function getEventGalleryImages(state) {
  return state.event ? state.event.images ?? [] : [];
}

export function getEventTab(state) {
  return state.eventTab;
}

export function getEventType(state) {
  return state.eventType;
}
export function getSearchCity(state) {
  return state.filter.city;
}
export function getSortOption(state) {
  return state.filter.sort;
}
export function getFilterOption(state) {
  return state.filter.filter
}

