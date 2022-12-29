<template>
  <q-page class="policies-settings">
    <header-with-backbutton :title="$q.lang.common.sidebar.policies" />
    <!-- <div class="common-head">
      <div class="ch-left">
        <router-link to="/"><i class="fas fa-arrow-left"></i></router-link> {{ $q.lang.common.sidebar.policies }}
      </div>
    </div> -->
    <div class="common-inner">
      <div class="ps-list">
        <div class="ps-list-box">
          <!-- <router-link to="" @click="gotoURL('https://beta.foodism.xyz/web/help-center')"> -->
            <router-link :to="{ name: 'pricacy' }">
            <div class="ps-left">
              <div class="ps-icon">
                <q-img src="~assets/privacy.svg"></q-img>
              </div>
              <span>Privacy policy</span>
            </div>
            <div class="ps-right">
              <q-img src="~assets/right-arrow.svg"></q-img>
            </div>
          </router-link>
        </div>
        <div class="ps-list-box">
          <!-- <router-link to="" @click="gotoURL('https://beta.foodism.xyz/web/help-center')"> -->
            <router-link :to="{ name: 'terms-and-condition' }">
            <div class="ps-left">
              <div class="ps-icon"><q-img src="~assets/t-c.svg"></q-img></div>
              <span>Terms and conditions</span>
            </div>
            <div class="ps-right">
              <q-img src="~assets/right-arrow.svg"></q-img>
            </div>
          </router-link>
        </div>
        <div class="ps-list-box">
          <!-- <router-link to="" @click="gotoURL('https://beta.foodism.xyz/web/help-center')"> -->
            <router-link :to="{ name: 'cookies-policy' }">
            <div class="ps-left">
              <div class="ps-icon">
                <q-img src="~assets/cookie-policy.svg"></q-img>
              </div>
              <span>Cookie policy </span>
            </div>
            <div class="ps-right">
              <q-img src="~assets/right-arrow.svg"></q-img>
            </div>
          </router-link>
        </div>
        <div class="ps-list-box">
          <!-- <router-link to=""  @click="gotoURL('https://beta.foodism.xyz/web/help-center')"> -->
            <router-link :to="{ name: 'community-guideline' }">
            <div class="ps-left">
              <div class="ps-icon">
                <q-img src="~assets/community-guidline.svg"></q-img>
              </div>
              <span>Community guidelines</span>
            </div>
            <div class="ps-right">
              <q-img src="~assets/right-arrow.svg"></q-img>
            </div>
          </router-link>
        </div>
        <div class="ps-list-box">
          <!-- <router-link to=""  @click="gotoURL('https://beta.foodism.xyz/web/help-center')"> -->
            <router-link :to="{ name: 'event-policy' }">
            <div class="ps-left">
              <div class="ps-icon">
                <q-img src="~assets/community-guidline.svg"></q-img>
              </div>
              <span>Event Policy</span>
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
import { ref, defineComponent, defineAsyncComponent } from 'vue'
import { useQuasar, openURL } from "quasar";
export default defineComponent({
  name: 'PoliciesIndex',
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
  setup() {
    const slide = ref(0)
    return {
      slide,
       gotoURL(url) {
        openURL(url)
      }
    }
  },
})
</script>
<style lang="scss">
// $
@import 'src/css/policies-settings.scss';
</style>
