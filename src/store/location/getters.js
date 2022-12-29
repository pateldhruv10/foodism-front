// Get postion show center in map
export function getPosition (state) {
  return {
    lat : state.latitude,
    lng : state.longitude
  }
}

// Get Position for marker
export function getMarker (state) {
  return [{
    position: {
      lat : state.latitude,
      lng : state.longitude
    }
  }]
}
