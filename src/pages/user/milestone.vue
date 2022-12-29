<template>
  <q-page class="milestone head-fix">
    <div class="common-head fixed-top">
      <div class="ch-left">
        <router-link :to="{ name: 'rewards' }"><i class="fas fa-arrow-left"></i></router-link> {{ $q.lang.common.title.milestone }}
      </div>
      <div class="ch-right">
        
      </div>
    </div>
    <div class="common-inner">
      <div class="ms-inner">
        <div class="ms-heading">
          <h5>1st Milestone</h5>
          <p>Become eligible for FLP</p>
        </div>
        <div class="ms-box condition1 box-with-link">
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
            <h6>Complete 5 Uploads Of</h6>
            <p>recipes or videos</p>
          </div>
          <div class="direct-link">
            <router-link to=""><q-img src="~assets/add.svg"></q-img></router-link>
          </div>
        </div>
        <div class="ms-box condition2 box-with-link">
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
            <h6>Refer 5 People </h6>
            <p>Get them to sign up</p>
          </div>
          <div class="direct-link">
            <router-link to=""><q-img src="~assets/refer-earn.svg"></q-img></router-link>
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
            <h6>Gather 20 Subcribers</h6>
            <!-- <p>need to sign up</p> -->
          </div>
        </div>
      </div>
      <!-- <div class="mt-cover">
        <q-img src="~assets/milestone-bg.jpg"></q-img>
      </div> -->
      <!-- <div class="milestone-wrapper">
        <div class="middle-line"></div>
        <div class="mt-list">
          <div class="mt-box">
            <div class="mt-number">
              1
            </div>
          </div>
          <div class="mt-box">
            <div class="mt-number">
              2
            </div>
          </div>
          <div class="mt-box">
            <div class="mt-number">
              3
            </div>
            <div class="mt-dis">
              <span class="dis-t">Earned Feb 23</span>
              <span>Complete your milestone</span>
            </div>
          </div>
          <div class="mt-box">
            <div class="mt-number">
              4
            </div>
          </div>
          <div class="mt-box">
            <div class="mt-number">
              5
            </div>
          </div>
          <div class="mt-box">
            <div class="mt-number">
              6
            </div>
          </div>
          <div class="mt-box">
            <div class="mt-number">
              7
            </div>
          </div>
          <div class="mt-box">
            <div class="mt-number">
              8
            </div>
          </div>
          <div class="mt-box">
            <div class="mt-number">
              9
            </div>
          </div>
          <div class="mt-box">
            <div class="mt-number">
              10
            </div>
          </div>
          <div class="mt-box">
            <div class="mt-number">
              11
            </div>
          </div>
          <div class="mt-box">
            <div class="mt-number">
              12
            </div>
          </div>
        </div>
      </div> -->
      <div class="upcoming-mt q-mt-xl">
        <p><router-link :to="{ name: 'upcomingmilestone' }"> Upcoming milestone on your path <q-img src="~assets/right-arrow.svg"></q-img> </router-link></p>
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
      ms1: 80,
      ms2: 60,
      ms3: 40,
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
