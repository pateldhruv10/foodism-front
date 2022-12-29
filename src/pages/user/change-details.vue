<template>
  <q-page class="policies-settings head-fix">
    <div class="common-head fixed-top">
      <div class="ch-left">
        <router-link :to="{ name: 'settings' }"
          ><i class="fas fa-arrow-left"></i
        ></router-link>
        {{ $q.lang.common.settings.changeDetails }}
      </div>
    </div>
    <div class="common-inner">
      <div class="ps-list">
        <div class="ps-list-box">
          <router-link :to="{ name: 'changenumber' }">
            <div class="ps-left">
              <div class="ps-icon">
                <q-img src="~assets/mobile.svg"></q-img>
              </div>
              <span>{{ $q.lang.common.settings.changeMobileNo }} </span>
            </div>
            <div class="ps-right">
              <q-img src="~assets/right-arrow.svg"></q-img>
            </div>
          </router-link>
        </div>
        <div class="ps-list-box">
          <router-link :to="{ name: 'changeEmail' }">
            <div class="ps-left">
              <div class="ps-icon"><q-img src="~assets/email.svg"></q-img></div>
              <span>{{ $q.lang.common.settings.changeEmail }} </span>
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
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'changeDetailsIndex',
  setup() {
    const slide = ref(0)
    return {
      slide,
      phoneNo: ref(true),
      msg: ref(false),
    }
  },
})
</script>
<style lang="scss">
// $
@import 'src/css/policies-settings.scss';
</style>
