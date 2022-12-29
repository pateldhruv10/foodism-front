<template>
  <q-page class="policies-settings head-fix">
    <header-with-backbutton
      :title="$q.lang.common.settings.privacy"
      extraClass="fixed-top"
    />
    <div class="common-inner">
      <div class="ps-list">
        <div class="ps-list-box">
          <router-link :to="{ name: 'blockAccountcount' }">
            <div class="ps-left">
              <div class="ps-icon">
                <q-img src="~assets/ac-block.svg"></q-img>
              </div>
              <span>Blocked accounts </span>
            </div>
            <div class="ps-right">
              <q-img src="~assets/right-arrow.svg"></q-img>
            </div>
          </router-link>
        </div>

        <div class="ps-list-box">
          <div class="ps-left">
            <div class="ps-icon"><q-img src="~assets/mobile.svg"></q-img></div>
            <span>Phone number visibility </span>
          </div>
          <div class="ps-right">
            <div class="switch-cus">
              <q-toggle
                true-value="active"
                false-value="inactive"
                v-model="phoneNo"
                color="green"
                @update:model-value="ph()"
              />
            </div>
          </div>
        </div>

        <div class="ps-list-box">
          <div class="ps-left">
            <div class="ps-icon"><q-img src="~assets/email.svg"></q-img></div>
            <span>Email Address visibility </span>
          </div>
          <div class="ps-right">
            <div class="switch-cus">
              <q-toggle
                true-value="active"
                false-value="inactive"
                v-model="email"
                color="green"
                @update:model-value="em()"
              />
            </div>
          </div>
        </div>

        <!-- <div class="ps-list-box">
          <div class="ps-left">
            <div class="ps-icon">
              <q-img src="~assets/community-guidline.svg"></q-img>
            </div>
            <span>Messaging </span>
          </div>
          <div class="ps-right">
            <div class="switch-cus">
              <q-toggle v-model="msg" color="green" />
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, defineComponent, computed, defineAsyncComponent } from 'vue'
import api from 'src/apis/index'
import { useStore } from 'vuex'
import { LocalStorage } from 'quasar'

export default defineComponent({
  name: 'PrivacyIndex',
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
    const store = useStore()

    const user = computed(() => {
      return store.getters['auth/getUser'];
    });

    return {
      email: ref(user.value.email_visibility == 1 ? 'active' : 'inactive'),
      phoneNo: ref(user.value.mobile_visibility == 1 ? 'active' : 'inactive'),
      msg: ref(false),
      user,
    }
  },

  methods: {
    ph() {
      if (this.phoneNo == 'active') {
        this.phoneShow()
      } else {
        this.phoneShow()
      }
    },
    em() {
      if (this.email == 'active') {
        this.emailShow()
      } else {
        this.emailShow()
      }
    },
    phoneShow() {
      LocalStorage.set('mobile_visibility', this.phoneNo)
      const data = {
        mobile_visibility: 'mobile_visibility',
      }
      api.put('visibility/mobile', data)
    },
    emailShow() {
      LocalStorage.set('email_visibility', this.email)
      const data = {
        email_visibility: 'email_visibility',
      }
      api.put('visibility/email', data)
    },
  },
})
</script>
<style lang="scss">
// $
@import 'src/css/policies-settings.scss';
</style>
