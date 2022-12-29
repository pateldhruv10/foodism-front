<template>
  <q-page class="reward head-fix">
    <div class="common-head fixed-top">
      <div class="ch-left">
        <router-link :to="{ name: 'rewards' }"><i class="fas fa-arrow-left"></i></router-link> {{ $q.lang.common.title.history }}
      </div>
      <div class="ch-right">
        
      </div>
    </div>
    <div class="common-inner">
      <div class="history-list">
        <div class="history-box">
          <div class="history-left">
            <div class="ic-box">
              <q-img src="~assets/referral.svg"></q-img>
            </div>
            <div class="history-details">
              <div class="name">Referral</div>
              <div class="location">March 24, 2022 at 6:06 pm</div>
            </div>
          </div>
          <div class="history-right">
            <span>+25</span>
          </div>
        </div>
        <div class="history-box">
          <div class="history-left">
            <div class="ic-box">
              <q-img src="~assets/withrow.svg"></q-img>
            </div>
            <div class="history-details">
              <div class="name">Withdraw</div>
              <div class="location">March 24, 2022 at 6:06 pm</div>
            </div>
          </div>
          <div class="history-right">
            <span class="withrow">-2000/-</span>
          </div>
        </div>
        <div class="history-box">
          <div class="history-left">
            <div class="ic-box">
              <q-img src="~assets/referral.svg"></q-img>
            </div>
            <div class="history-details">
              <div class="name">Referral</div>
              <div class="location">March 24, 2022 at 6:06 pm</div>
            </div>
          </div>
          <div class="history-right">
            <span>+25</span>
          </div>
        </div>
        <div class="history-box">
          <div class="history-left">
            <div class="ic-box">
              <q-img src="~assets/withrow.svg"></q-img>
            </div>
            <div class="history-details">
              <div class="name">Withrow</div>
              <div class="location">March 24, 2022 at 6:06 pm</div>
            </div>
          </div>
          <div class="history-right">
            <span class="withrow">-2000/-</span>
          </div>
        </div>
      </div>
      
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed , defineAsyncComponent } from 'vue';

export default defineComponent({
  name: 'referralsIndex',
  components:{
    // 'refer-profile' : defineAsyncComponent(() => import('src/components/common/all-upload/refer-profile.vue')),
  },
  setup () {
    const progress1 = ref(0.3)

    return {
      tab: ref('rewards'),
      progress1,
      progressLabel1: computed(() => (progress1.value * 100).toFixed(0) + '%'),
    }
  }
})
</script>
<style lang="scss">
  // $
  @import '../../css/refer-earn.scss';
</style>
