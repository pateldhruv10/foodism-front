<template>
  <q-page class="following head-fix">
    <header-with-backbutton
      :title="$q.lang.common.title.following"
      extraClass="fixed-top"
    />
    <div class="common-inner">
      <user-list :user="user" />
    </div>
  </q-page>
</template>

<script>
import { ref, defineComponent, defineAsyncComponent, watch } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'followingIndex',
  components: {
    'user-list': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "user-list-view" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'components/common/user-list.vue'
      )
    ),
    'header-with-backbutton': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "common-header" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/layouts/header-with-backbutton.vue'
      )
    ),
  },
  setup() {
    const route = useRoute()

    const user = ref(route.params.slug)

    watch(route, (newVal, oldVal) => {
      user.value = newVal.params.slug;
    })

    watch(route, (newRoute, oldRoute) => {
      console.log("Watcher", newRoute.params.slug);
      console.log("Route", route.params.slug);
      console.log("Old Route", oldRoute.params.slug);
      if (newRoute.params.slug !== oldRoute.params.slug) {
        if (newRoute.name === 'following-list') {
          store.dispatch('auth/userFollowing', newRoute.params.slug)
        } else {
          store.dispatch('auth/userFollowers', newRoute.params.slug)
        }
      }
    })

    return {
      user,
    }
  },
  // beforeRouteLeave (to, from, next) {
  //   this.$store.commit('auth/setUserData', [])
  //   this.$store.commit('auth/setUserFollowers', [])
  //   this.$store.commit('auth/setUserFollowing', [])
  // }
})
</script>
<style lang="scss">
// $
.following {
  .common-head {
    @extend .background1;
    .ch-right {
      a {
        color: $dark-purple;
        font-size: 18px;
      }
    }
  }
  .common-inner {
    padding: 20px;
  }
}
</style>
