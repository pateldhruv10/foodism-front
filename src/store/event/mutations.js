import { LocalStorage, Notify } from "quasar";

export function setUserEvents(state, data) {
  state.user_events = data;
}

export function setFevEvents(state, data) {
  state.fev_events = data;
  LocalStorage.set('bookmarkedEvent', data)
}

export function pushToBookmark(state, data) {
  state.bookmark = data
  state.fev_events.push(data)
  LocalStorage.set('bookmarkedEvent', state.fev_events)
}

export function removebookmark(state, item_id) {

  const events = _.cloneDeep(state.fev_events);

  for (var i = 0; i < events.length; i++) {
    if (events[i].id == item_id) {
      events.splice(i, 1);
    }
  }
  LocalStorage.set('bookmarkedEvent', events)
  state.fev_events = events;
}


export function vlogPreview(state, data) {
  state.previewData = data
  state.vlog = data
  state.vlogPreview.push(data)
}

export function saveToDraft(state) {

  var data = state.vlogPreview
  LocalStorage.set('vlogPreview', data)
  Notify.create({
    message: 'Saved to Draft',
    type: 'positive'
  })
  // Storage.set({key:'vlogPreview',value :data})
}

// export function removevlogPreview(state,data){
//    LocalStorage.remove('vlogPreview')
//    state.vlogPreview = []
//  // Storage.remove('vlogPreview')
// }

export function removeDraft(state, item_id) {
  const draft = _.cloneDeep(state.vlogPreview);

  for (var i in draft) {
    if (draft[i].id == item_id) {
      draft.splice(i, 1);
      break;
    }
  }
  const df = draft;
  state.vlogPreview = df;
  LocalStorage.set('vlogPreview', df)
  Notify.create({
    message: 'Draft Successfully  Removed !',
    type: 'positive'
  })
  // alert(payload)
}

export function editVlog(state, payload) {
  state.previewData = payload
  const editDraft = _.cloneDeep(state.vlogPreview);
  for (var i in editDraft) {
    if (editDraft[i].id == payload.id) {
      editDraft[i] = payload
      break;
    }
  }
  const de = editDraft;
  state.vlogPreview = de;
  LocalStorage.set('vlogPreview', de)

}

export function videocategoryDel(state, index) {
  // const vc = _.cloneDeep(state.vlogPreview);

  // for(var i in vc){
  //   if(vc[i].id == index){

  //       vc[i].video_category[index]
  //       break;
  //   }
  // }
}


export function setSearchCity(state, payload) {
  state.filter.city = payload
}

export function setEventCities(state, payload) {
  state.eventcities = payload
}

export function setSearchType(state, payload) {
  state.filter.type = payload
}

export function setSearchMode(state, payload) {
  state.filter.mode = payload
}

export function setSort(state, payload) {
  state.filter.sort = payload
}

export function setDateRange(state, payload) {
  state.filter.daterange = payload
}


