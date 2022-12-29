import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import home from './home'
import auth from './auth'
import location from './location'
import master from './master'
import event from './event'
import recipe from './recipe'
import blog from './blog'



/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      master,
      home,
      auth,
      location,
      event,
      recipe,
      blog
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  Store.subscribe((mutation, state) => {
    if (mutation == 'event/setSearchMode' && !state.event.filter.includes["offline"]) {
      Store.commit('event/setSearchCity', []);
    }
  })

  return Store
})
