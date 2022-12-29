import notification from "src/boot/notification";
import api from "../../apis/index";

const BOOKMARK_EVENT = '/event/bookmark/add';
const BOOKMARK_REMOVE = '/event/bookmark/remove';


const FETCH_FEV_EVENTS = '/bookmarks'
const EVENT_CITY_API = '/event/cities'

// Add bookmark to server and locatstorage
export function bookmarkEvent({ commit }, eventDetail) {
  return new Promise((resolve, reject) => {

    // Pushed in localhost before sendting to server
    const data = {
      id: eventDetail.id,
      image: eventDetail.image,
      name: eventDetail.name,
      slug: eventDetail.slug
    }
    commit('pushToBookmark', data)
    api.post(BOOKMARK_EVENT, {
      'event_id':  eventDetail.id,
    }).then(res => {
      if(res.success) {
        resolve(res);
      } else {
        notification.error(res.message);
        commit('removebookmark',data.id)
      }
       resolve(res)
    }).catch(err => {
      commit('removebookmark',data.id)
      reject(err)
    });
  });
}




// Remove bookmark from server and from local storage
export function removeBookmark({ commit }, event_id) {
  return new Promise((resolve, reject) => {
    //Remove from Localhost before server
    commit('removebookmark',event_id)
    api.getWithParam(BOOKMARK_REMOVE, {
      'event_id':  event_id,
    },).then(res => {
      if(res.success) {
        //commit('removebookmark', event_id); // remove from store
        resolve(res);
      }
      resolve(res)
    }).catch(err => {
      reject(err)
    });
  });
}

// Fetch user bookmarked event and store in local storage until user logged out
export function fetchFevEvents (context, data) {
  return new Promise((resolve, reject) => {
    api.getWithParam(FETCH_FEV_EVENTS,{
    }).then(res => {
      if(res.success) {
        context.commit('setFevEvents', res.data.Events)
        resolve(res)
      }
    }).catch(err => {
      reject(err)
    });
  });
}

export async function getEventCitiesApi (context) {
  return new Promise(async (resolve, reject) => {
    await api.get(EVENT_CITY_API).then(response => {
      context.commit("setEventCities", response.data);
      resolve(response.data);
    }).catch(error => {
      reject(error);
    });
  });
}



export async function resetEvents ( { commit }) {
  await commit('home/setEvents', [], { root: true })
  await commit('master/saveSearch', null, { root: true })

  // Reset all events filter to default
  await commit('setSearchCity', false)
  await commit('setSearchType', false)
  await commit('setSearchMode', false)
  await commit('setSort', 'c2u')
  await commit('setDateRange', {
    from: '',
    to: ''
  })
}
