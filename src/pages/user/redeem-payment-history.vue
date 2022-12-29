<template>
  <q-page class="flp-page head-fix">
    <div class="common-head fixed-top">
      <div class="ch-left">
        <router-link :to="{ name: 'flp' }"><i class="fas fa-arrow-left"></i></router-link> Redemption Payment History
      </div>
      <div class="ch-right">

      </div>
    </div>
    <div class="common-inner">
      <div class="reward-box">
        <div class="reward-inner">
          <div class="rewrd-left">
            <h5>Total Earned</h5>
            <p>₹{{totalEarned}}</p>
          </div>
          <div class="reward-right">
            <q-img src="~assets/coins.png"></q-img>
          </div>
        </div>
      </div>
      <q-list bordered separator class="q-mt-md">

        <q-item clickable v-ripple v-for="payment of redemptionPaymentList" :key="payment.id" >
          <q-item-section>
            <q-item-label class="flex justify-between">
              <div class="">{{payment.bank_name}} - {{payment.account_number}}</div>
              <div class="">{{payment.account_holder_name}}</div>
              <div class="">₹{{payment.total_rupees.toFixed(2)}}</div>
            </q-item-label>
            <q-item-label caption>{{payment.created_at}}</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
      <div class="no-history"  v-if="!redemptionPaymentList.length">
        <div class="no-data-img">
          <q-img src="~assets/no-data-new.png" />
        </div>
        <h5>No Data Found</h5>
      </div>

    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed , defineAsyncComponent } from 'vue';
import { api } from 'src/boot/axios'
import { date } from 'quasar'
export default defineComponent({
  name: 'RraIndex',
  components:{},
  setup () {
    const redemptionPaymentList = ref([])
    const totalEarned = ref(0)
    return {
      totalEarned,
      redemptionPaymentList
    }
  },
  created() {
    this.getRedemptionPaymentHistory();
  },
  methods: {
    /**
     * Get Transaction History
     */
     getRedemptionPaymentHistory() {
      api
        .get(
          `/flp/user/redemption/payment/history`
        )
        .then((response) => {
            this.redemptionPaymentList = response.data.data;
            this.redemptionPaymentList.map((item) => {
              item.account_number = 'XXXXX' + item.account_number.slice(5);

              this.totalEarned += item.total_rupees
              item.created_at = date.formatDate(item.created_at, 'DD/MM/YYYY hh:mm A')
            })
            this.totalEarned = this.totalEarned.toFixed(2)
        })
        .catch((err) => {
          console.log(err)
        });
    }
  }
})
</script>
<style lang="scss">
  // $
  @import '../../css/flp.scss';
</style>
