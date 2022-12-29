<template>
  <q-page class="reward head-fix">
    <div class="common-head fixed-top">
      <div class="ch-left">
        <router-link :to="{ name: 'rewards' }"><i class="fas fa-arrow-left"></i></router-link> {{ $q.lang.common.title.referral }}
      </div>
      <div class="ch-right">
        
      </div>
    </div>
    <div class="common-inner">
      <div class="q-pt-md">
        <refer-profile />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed , defineAsyncComponent } from 'vue';

export default defineComponent({
  name: 'referralsIndex',
  components:{
    'refer-profile' : defineAsyncComponent(() => import('src/components/common/all-upload/refer-profile.vue')),
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
