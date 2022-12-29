export function saveLocation (state, data) {
  console.log(data);
  state.latitude = data.latitude;
  state.longitude = data.longitude;
}

export function saveCurrentLocation (state, data) {
  state.currentLocation.latitude = data.latitude;
  state.currentLocation.longitude = data.longitude;

  console.log('saveCurrentLocation', state.currentLocation);
}

