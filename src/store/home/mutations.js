
import { LocalStorage } from "quasar"
export function changeTab(state, tab) {

  LocalStorage.set('currentTab', tab)
  state.currentTab = tab
}

// export function changeProfileTab(state,tab){
//   LocalStorage.set('currentProfileTab', tab)
//   state.currentProfileTab = tab
// }

export function changeEventTab(state, tab) {
  LocalStorage.set('eventTab', tab)
  state.eventTab = tab
}

export function changeEventType(state, type) {
  LocalStorage.set('eventType', type)
  state.eventType = type
}

export function setEvents(state, data) {
  state.events = data
}

// export function setMyInterestedEvent(state, data){
//   state.myInterested = data
//   LocalStorage.set('InterestedEvents' , data)

// }

export function setEvent(state, data) {
  state.event = data
}

export function setProfile(state, data) {
  state.profile = data
}

export function addParticipant(state, data) {
  for (var i in state.events) {
    if (state.events[i].id == data.event_id) {
      let newParticipant = {
        user_id: data.user_id,
        event_id: data.event_id,
      }
      state.events[i].participant.push(newParticipant)
      break;
    }
  }

  if (state.event.id == data.event_id) {
    let newParticipant = {
      user_id: data.user_id,
      event_id: data.event_id,
    }
    state.event.participant.push(newParticipant)
  }
}
export function removeParticipantProfile(state, data) {
  for (var i in state.events) {
    state.events.forEach((items, index, object) => {
      if (state.events[i].id == data.event_id) {
        object.splice(i, 1);
      }
    });
  }
}
export function removeParticipant(state, data) {

  for (var i in state.events) {
    if (state.events[i].id == data.event_id) {
      state.events[i].participant.forEach((items, index, object) => {
        if (items.user_id == data.user_id) {
          object.splice(index, 1);
        }
      });
    }
  }

  if (state.event.id == data.event_id) {

    state.event.participant.forEach((items, index, object) => {
      if (items.user_id == data.user_id) {
        object.splice(index, 1);

      }
    })
  }
}

export function blockUser(state, user_id) {
  state.events.forEach((items, index, object) => {
    if (items.user_id == user_id) {
      object.splice(index, 1)
    }
  })
}

export function setSearchCity(state, payload) {
  state.filter.city = payload
}

export function setFilter(state, payload) {
  state.filter.filter = payload
}

export function setSort(state, payload) {
  state.filter.sort = payload
}

