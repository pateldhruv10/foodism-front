import { getServerImageUrl } from '../../utils/server-asset';

export function isLoggedIn(state) {
  return state.access_token !== '' && state.access_token !== null;
}

export function getAccessToken(state) {
  return state.access_token;
}

export function getUser(state) {
  return state.user;
}
export function getUserData(state) {
  return state.userData;
}
export function getFollow(state) {
  return state.follow;
}
export function getFollowers(state) {
  return state.followers;
}
export function getFollowing(state) {
  return state.following;
}
export function getUserFollowers(state) {
  return state.userFollowers;
}
export function getUserFollowing(state) {
  return state.userFollowing;
}
export function getUserLanguageText(state) {
  return state.user && state.user.language ? state.user.language.name : '-';
}

export function getUserCuisinePreference(state) {
  return state.user && state.user.cuisinePreference ? state.user.cuisinePreference.map(item => { return item.name }) : '-';
}

export function getUserFoodPreference(state) {
  return state.user && state.user.foodPreference ? state.user.foodPreference.name : '-';
}

export function getUserCityName(state) {
  return state.user && state.user.city_id ? state.user.city_id.name : '-';
}

export function getUserProfilePicture(state) {
  return state.user && state.user.images && state.user.images.length > 0 ? getServerImageUrl(state.user.images[0].image_path) : require('../../assets/pr-pic.svg');
}

export function getUserImages(state) {
  return state.user.images;
}

export function getUserProfilePicturesAll(state) {
  return state.user.images ? state.user.images.map(item => {
    return getServerImageUrl(item.image_path)
  }) : [require('../../assets/pr-pic.svg')];
}

export function getUserType(state) {
  // 1 = user
  // 2 = business

  return 1; // indicates the user
}

export function getUserGender(state) {
  return state.user?.gender == 'preferNotToSay' ? 'Prefer not to say' : state.user?.gender;
}

