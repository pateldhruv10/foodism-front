<template>
  <q-page class="flp-page head-fix">
    <div class="common-head fixed-top">
      <div class="ch-left">
        <router-link :to="{ name: 'eligibility' }"><i class="fas fa-arrow-left"></i></router-link> Foodism Loyalty Points
      </div>
      <div class="ch-right">

      </div>
    </div>
    <div class="common-inner">
      <reward-box />
      <div class="flp-link">
        <div class="flp-link-box">
          <router-link :to="{ name: 'transaction-history' }">
            <div class="flp-left">
              <div class="flp-icon"><q-img src="~assets/transactions-history.png"></q-img></div>
              <span>Transactions History</span>
            </div>
            <div class="flp-right">
              <q-img src="~assets/right-arrow.svg"></q-img>
            </div>
          </router-link>
        </div>
        <div class="flp-link-box">
          <router-link :to="{ name: 'bank-list' }">
            <div class="flp-left">
              <div class="flp-icon"><q-img src="~assets/Manage-Bank.png"></q-img></div>
              <span>Manage Bank</span>
            </div>
            <div class="flp-right">
              <q-img src="~assets/right-arrow.svg"></q-img>
            </div>
          </router-link>
        </div>
        <div class="flp-link-box">
          <router-link :to="{ name: 'redeem-points' }">
            <div class="flp-left">
              <div class="flp-icon"><q-img src="~assets/Withdraw-foodism-points.png"></q-img></div>
              <span>Withdraw Foodism Point</span>
            </div>
            <div class="flp-right">
              <q-img src="~assets/right-arrow.svg"></q-img>
            </div>
          </router-link>
        </div>
        <div class="flp-link-box">
          <router-link :to="{ name: 'redeem-request' }">
            <div class="flp-left">
              <div class="flp-icon"><q-img src="~assets/Withdraw-request-history.png"></q-img></div>
              <span>Withdraw Request History</span>
            </div>
            <div class="flp-right">
              <q-img src="~assets/right-arrow.svg"></q-img>
            </div>
          </router-link>
        </div>
        <div class="flp-link-box">
          <router-link :to="{ name: 'redeem-request-accepted' }">
            <div class="flp-left">
              <div class="flp-icon"><q-img src="~assets/foodism-points-redeemed-history.png"></q-img></div>
              <span>Foodism Points Redeemed History</span>
            </div>
            <div class="flp-right">
              <q-img src="~assets/right-arrow.svg"></q-img>
            </div>
          </router-link>
        </div>
        <div class="flp-link-box">
          <router-link :to="{ name: 'redeem-payment-history' }">
            <div class="flp-left">
              <div class="flp-icon"><q-img src="~assets/Payment-History.png"></q-img></div>
              add-btns              <span>Payment History</span>
            </div>
            <div class="flp-right">
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
  name: 'flpIndex',
  components:{
    'reward-box': defineAsyncComponent(() =>
      import('src/components/user/reward-box.vue')
    )
  },
  setup () {

    return {
    }
  }
})
</script>
<style lang="scss">
  // $
  @import '../../css/flp.scss';
</style>
