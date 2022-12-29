<template>
  <q-page class="policies-settings head-fix">
    <header-with-backbutton :title="$q.lang.common.sidebar.settings" extraClass="fixed-top" />

    <div class="common-inner">
      <div class="ps-list">
        <div class="ps-list-box">
          <div class="ps-left">
            <div class="ps-icon"><q-img src="~assets/notification-inner.svg"></q-img></div>
            <span>{{ $q.lang.common.settings.notification }}</span>
          </div>
          <div class="ps-right">
            <div class="switch-cus">
              <q-toggle
                v-model="notification"
                color="green"
              />
            </div>
          </div>
        </div>
        <div class="ps-list-box">
          <div class="ps-left">
            <div class="ps-icon"><q-img src="~assets/dark-mode.svg"></q-img></div>
            <span>{{ $q.lang.common.settings.darkMode }}</span>
          </div>
          <div class="ps-right">
            <div class="switch-cus">
              <q-toggle
                v-model="mode"
                color="green"
                @update:model-value="setTheme"
              />
            </div>
          </div>
        </div>
        <div class="ps-list-box">
          <router-link :to="{ name: 'privacy' }">
            <div class="ps-left">
              <div class="ps-icon"><q-img src="~assets/privacy.svg"></q-img></div>
              <span>{{ $q.lang.common.settings.privacy }} </span>
            </div>
            <div class="ps-right">
              <q-img src="~assets/right-arrow.svg"></q-img>
            </div>
          </router-link>
        </div>
        <div class="ps-list-box">
          <router-link :to="{ name: 'deleteaccount' }">
            <div class="ps-left">
              <div class="ps-icon"><q-img src="~assets/delete-ac.svg"></q-img></div>
              <span>{{ $q.lang.common.settings.deleteAccount }}</span>
            </div>
            <div class="ps-right">
              <q-img src="~assets/right-arrow.svg"></q-img>
            </div>
          </router-link>
        </div>
        <div class="ps-list-box">
          <router-link :to="{ name: 'changeDetails' }">
            <div class="ps-left">
              <div class="ps-icon"><q-img src="~assets/change-details.svg"></q-img></div>
              <span>{{ $q.lang.common.settings.changeDetails }}</span>
            </div>
            <div class="ps-right">
              <q-img src="~assets/right-arrow.svg"></q-img>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, defineComponent,defineAsyncComponent } from 'vue';
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'SettingsIndex',
   components: {
    'header-with-backbutton': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "common-header" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/layouts/header-with-backbutton.vue'
      )
    ),
  },
  setup () {
    const $q = useQuasar()

    const slide = ref(0);

    return {
      slide,
      notification: ref(true),
      mode: ref(false),
      setTheme(value, event) {
        $q.dark.set(value)
      }
    }
  },
})
</script>
<style lang="scss">
  // $
  @import 'src/css/policies-settings.scss';
</style>
