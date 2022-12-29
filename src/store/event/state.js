
import { LocalStorage } from "quasar";

export default function () {
  return {
    user_events: [],
    fev_events: LocalStorage.getItem('bookmarkedEvent') || [],
    bookmark: [],

    vlog: [],
    previewData: [],
    vlogPreview:
      LocalStorage.getItem('vlogPreview')
      //Storage.get({key:'vlogPreview'})
      || [],

    eventcities: [],

    filter: {
      city: false,
      type: false,
      mode: false,
      daterange: {
        from: null,
        to: null
      },
      sort: 'c2u'
    },

  }
}
