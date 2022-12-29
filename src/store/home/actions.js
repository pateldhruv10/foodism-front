import api from "../../apis/index";
import _ from 'lodash'

const FETCH_EVENTS = '/event/list'
const FETCH_EVENT = '/event/'
const FETCH_PROFILE = '/profile/filters'



export async function fetchEvents({ commit, getters }, data) {
  try {
    const res = await api.getWithParam(FETCH_EVENTS, data);
    if (res.success) {
      const events = getters.events;
      const ev = events.concat(...res.data.data);
      commit('setEvents', ev);
      return res
    }
  } catch (err) {
    return err
  }
}
export async function fetchEvent(context, slug) {
  return await new Promise((resolve, reject) => {
    console.log(slug)
    api.get(FETCH_EVENT + slug).then(res => {
      if (res.success) {
        context.commit('setEvent', res.data)
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    });
  });
}

export async function fetchProfile(context, slug) {
  // return await new Promise((resolve, reject) => {

    await api.getWithParam(FETCH_PROFILE , slug).then(res => {
      if (res.success) {
        context.commit('setProfile', res.data)

      }
    })
  // });
}

export async function resetProfile({commit}){
  await commit('setFilter', [])
  await commit('setSearchCity', [])
  await commit('setProfile', [])
}


export function removeEvent({ commit, getters }, id) {
  const events = _.cloneDeep(getters.events);

  for (var i in events) {
    if (events[i].id == id) {
      events.splice(i, 1);
      break;
    }
  }

  const ev = events;
  commit('setEvents', ev);
}


