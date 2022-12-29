<template>
  <q-page class="upMilestone head-fix">
    <div class="common-head fixed-top">
      <div class="ch-left">
        <router-link :to="{ name: 'milestone' }"><i class="fas fa-arrow-left"></i></router-link> {{ $q.lang.common.title.upMilestone }}
      </div>
      <div class="ch-right">
        
      </div>
    </div>
    <div class="common-inner">
      <div class="ms-inner up-ms">
        <div class="ms-heading">
          <h5>2nd Milestone</h5>
          <!-- <p>Becoming eligible for FLP</p> -->
        </div>
        <div class="ms-box condition1">
          <div class="con-left">
            <q-circular-progress
              show-value
              font-size="14px"
              :value="ms1"
              size="50px"
              :thickness="0.25"
              color="orange"
              track-color="grey-5"
              class=""
            >
              {{ ms1 }}%
            </q-circular-progress>
          </div>
          <div class="con-right">
            <h6>Earn 5000 RS with FLP </h6>
          </div>
        </div>
        <div class="ms-box condition2">
          <div class="con-left">
            <q-circular-progress
              show-value
              font-size="14px"
              :value="ms2"
              size="50px"
              :thickness="0.25"
              color="orange"
              track-color="grey-5"
              class=""
            >
              {{ ms2 }}%
            </q-circular-progress>
          </div>
          <div class="con-right">
            <h6>Verified status / or icon</h6>
          </div>
        </div>
        <div class="ms-box condition3">
          <div class="con-left">
            <q-circular-progress
              show-value
              font-size="14px"
              :value="ms3"
              size="50px"
              :thickness="0.25"
              color="orange"
              track-color="grey-5"
              class=""
            >
              {{ ms3 }}%
            </q-circular-progress>
          </div>
          <div class="con-right">
            <h6>Unlock host a event feature</h6>
          </div>
        </div>
      </div>
      <div class="ms-inner up-ms q-mt-xl">
        <div class="ms-heading">
          <h5>3rd Milestone</h5>
          <!-- <p>Becoming eligible for FLP</p> -->
        </div>
        <div class="ms-box condition1">
          <div class="con-left">
            <q-circular-progress
              show-value
              font-size="14px"
              :value="ms1"
              size="50px"
              :thickness="0.25"
              color="orange"
              track-color="grey-5"
              class=""
            >
              {{ ms1 }}%
            </q-circular-progress>
          </div>
          <div class="con-right">
            <h6>Lock exclusive recipes on page</h6>
          </div>
        </div>
        <div class="ms-box condition2">
          <div class="con-left">
            <q-circular-progress
              show-value
              font-size="14px"
              :value="ms2"
              size="50px"
              :thickness="0.25"
              color="orange"
              track-color="grey-5"
              class=""
            >
              {{ ms2 }}%
            </q-circular-progress>
          </div>
          <div class="con-right">
            <h6>Sell pdf or cook books </h6>
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
  @import '../../css/milestone.scss';
</style>
