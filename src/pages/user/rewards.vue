 <template>
  <q-page class="reward head-fix">
    <header-with-backbutton :title="$q.lang.common.sidebar.reward" extraClass="fixed-top" />

    <div class="common-inner">
      <div class="eligibal-box q-mb-md">
        <q-linear-progress size="25px" dark stripe rounded :value="progress1" color="primary">
          <div class="absolute-full flex flex-center">
            <q-badge :label="progressLabel1" />
          </div>
        </q-linear-progress>
        <p class="q-pb-md">You are eligible to encash  minimum <b>Rs 2000</b>.</p>
        <div class="rewards-box flex justify-between">
          <h4>1152</h4>
          <div class="reward-btn flex">
            <router-link :to="{ name: 'encash' }" class="btn3 text-capitalize">encash</router-link>
          </div>
        </div>
      </div>
      <div class="totle-vt">
        <div class="vt-box">
          <h6>15k</h6>
          <p>Total Views</p>
        </div>
        <div class="vt-box">
          <h6>15h, 45min</h6>
          <p>Total Time</p>
        </div>
      </div>
      <!-- <div class="all-reward q-mb-md">
        <q-img src="~assets/reward.jpg"></q-img>
        <div class="fc-count">1950/-</div>
      </div> -->

      <!-- <div class="reward-tab">
        <q-card>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="rewards" label="rewards" />
            <q-tab name="referrals" label="referrals" />
            <q-tab name="history" label="history" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="rewards">
              <div class="row">
                <div class="col-6 text-center">
                  <div class="badge pink">
                    <div class="circle"> <span>125</span> <span>FC</span> </div>
                  </div>
                </div>
                <div class="col-6 text-center">
                  <div class="badge dark-purple">
                    <div class="circle"> <span>25</span> <span>FC</span></div>
                  </div>
                </div>
                <div class="col-6 text-center">
                  <div class="badge light-orange1">
                    <div class="circle"> <span>50</span> <span>FC</span></div>
                  </div>
                </div>
                <div class="col-6 text-center">
                  <div class="badge light-green">
                    <div class="circle"> <span>100</span> <span>FC</span></div>
                  </div>
                </div>
                <div class="col-6 text-center">
                  <div class="badge purple">
                    <div class="circle"> <span>75</span> <span>FC</span></div>
                  </div>
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="referrals">
              <div class="q-pt-md">
                <refer-profile />
              </div>
            </q-tab-panel>

            <q-tab-panel name="history">
              <div class="history-list">
                <div class="history-box">
                  <div class="history-left">
                    <div class="ic-box">
                      <q-img src="~assets/referral.svg"></q-img>
                    </div>
                    <div class="history-details">
                      <div class="name">Refral</div>
                      <div class="location">March 24, 2022 at 6:06 pm</div>
                    </div>
                  </div>
                  <div class="history-right">
                    <span>+25</span>
                    <span class="faild">Faild</span>
                  </div>
                </div>
                <div class="history-box">
                  <div class="history-left">
                    <div class="ic-box">
                      <q-img src="~assets/contest.svg"></q-img>
                    </div>
                    <div class="history-details">
                      <div class="name">Contest</div>
                      <div class="location">March 24, 2022 at 6:06 pm</div>
                    </div>
                  </div>
                  <div class="history-right">
                    <span>+125</span>
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
                    <span class="withrow">-125</span>
                  </div>
                </div>
                <div class="history-box">
                  <div class="history-left">
                    <div class="ic-box">
                      <q-img src="~assets/referral.svg"></q-img>
                    </div>
                    <div class="history-details">
                      <div class="name">Refral</div>
                      <div class="location">March 24, 2022 at 6:06 pm</div>
                    </div>
                  </div>
                  <div class="history-right">
                    <span>+25</span>
                    <span class="faild">Faild</span>
                  </div>
                </div>
                <div class="history-box">
                  <div class="history-left">
                    <div class="ic-box">
                      <q-img src="~assets/contest.svg"></q-img>
                    </div>
                    <div class="history-details">
                      <div class="name">Contest</div>
                      <div class="location">March 24, 2022 at 6:06 pm</div>
                    </div>
                  </div>
                  <div class="history-right">
                    <span>+125</span>
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
                    <span class="withrow">-125</span>
                  </div>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>

      </div> -->
      <div class="ps-list q-pt-lg">

        <div class="ps-list-box">
          <router-link :to="{ name: 'referrals' }">
            <div class="ps-left">
              <div class="ps-icon"><q-img src="~assets/refer.svg"></q-img></div>
              <span>{{ $q.lang.common.title.referral }} </span>
            </div>
            <div class="ps-right">
              <q-img src="~assets/right-arrow.svg"></q-img>
            </div>
          </router-link>
        </div>
        <div class="ps-list-box">
          <router-link :to="{ name: 'milestone' }">
            <div class="ps-left">
              <div class="ps-icon"><q-img src="~assets/milestone.svg"></q-img></div>
              <span>{{ $q.lang.common.title.milestone }}</span>
            </div>
            <div class="ps-right">
              <q-img src="~assets/right-arrow.svg"></q-img>
            </div>
          </router-link>
        </div>
        <div class="ps-list-box">
          <router-link :to="{ name: 'history' }">
            <div class="ps-left">
              <div class="ps-icon"><q-img src="~assets/history-1.svg"></q-img></div>
              <span>{{ $q.lang.common.title.history }}</span>
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
import { defineComponent, ref, computed , defineAsyncComponent } from 'vue';

export default defineComponent({
  name: 'RewardsIndex',
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
