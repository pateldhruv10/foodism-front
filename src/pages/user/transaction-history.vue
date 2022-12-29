<template>
  <q-page class="flp-page head-fix">
    <div class="common-head fixed-top">
      <div class="ch-left">
        <router-link :to="{ name: 'flp' }"><i class="fas fa-arrow-left"></i></router-link> Transaction history
      </div>
      <div class="ch-right">

      </div>
    </div>
    <div class="common-inner">
      <reward-box />
      <div class="history-list" v-if="transactionList.length">
        <div class="history-box" v-for="transaction of transactionList" :key="transaction.id">
          <div class="transaction-date">
            {{transaction.created_at}}
          </div>
          <div class="transaction-detail">
            <span>{{transaction.remarks}}</span>
            <span v-if="transaction.type == 'debit'" class="rr">- {{transaction.flp_points}}</span>
            <span v-if="transaction.type == 'credit'" class="ep">{{transaction.flp_points}}</span>
          </div>
        </div>
      </div>
      <div class="no-history" v-if="!transactionList.length">
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
  name: 'transactionIndex',
  components:{
    'reward-box': defineAsyncComponent(() =>
      import('src/components/user/reward-box.vue')
    )
  },
  setup () {
    const transactionList = ref([])
    return {
      transactionList
    }
  },
  created() {
    this.getTransactionHistory();
  },
  methods: {
    /**
     * Get Transaction History
     */
     getTransactionHistory() {
      api
        .get(
          `/flp/user/transaction`
        )
        .then((response) => {
            this.transactionList = response.data.data;

            this.transactionList.map((item) => {
              console.log(item.created_at)
              item.created_at = date.formatDate(item.created_at, 'DD/MM/YYYY hh::mm A')
            })
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
