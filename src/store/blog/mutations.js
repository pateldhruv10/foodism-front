import { setWithExpiry, getWithExpiry } from '../../utils/storage'

export function setBlogs(state, payload) {
  // setWithExpiry('cities', payload)
  // state.cities = getWithExpiry('cities')
  state.blogs = payload
}


