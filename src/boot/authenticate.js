import { boot } from "quasar/wrappers";
import { Notify, LocalStorage } from "quasar";

export default boot(({ router, store }) => {
  if(LocalStorage.getItem('access_token') && !store.state.access_token) {
    store.commit('auth/setToken', LocalStorage.getItem('access_token'))
    if(!store.state.user) {
      store.commit('event/setFevEvents', LocalStorage.getItem('bookmarkedEvent'))
      store.commit('auth/setUser', LocalStorage.getItem('user'))
    }
  }

  router.beforeEach((to, from, next) => {
    // console.log(to.name == 'index' && LocalStorage.getItem('access_token'))
    // console.log(to)
    if (
      to.matched.some((record) => record.meta.requiresAuth) &&
      !LocalStorage.getItem('access_token')
    ) {
      console.log("not authenticated");
      Notify.create({
        color: "red-5",
        textColor: "white",
        icon: "error",
        message: "You must be logged in to view this page.",
      });
      return next({
        name: "index",
      });
    } else if (to.name == 'index' && LocalStorage.getItem('access_token')){
      return next({
        name: "user-home",
      });
    } else{
      next();
    }

    // Now you need to add your authentication logic here, like calling an API endpoint
  });
});
