<template>
  <q-page class="flp-page head-fix">
    <div class="common-head fixed-top">
      <div class="ch-left">
        <router-link :to="{ name: 'flp' }"><i class="fas fa-arrow-left"></i></router-link> Withdraw Foodism Point Request History
      </div>
      <div class="ch-right">

      </div>
    </div>
    <div class="common-inner">
      <reward-box />
      <div class="redeem-table" v-if="redemptionRequestList.length">
        <ul>
          <li>
            <div class="li-left"><div class="t-date">Date</div> <div class="t-remark">Remarks</div></div> <div class="points">Points</div>
          </li>
          <li v-for="info of redemptionRequestList" :key="info.id">
            <div class="li-left">
              <div class="t-date">{{info.created_at}}</div>
              <div class="t-remark">{{info.notes}}</div>
            </div>
            <div class="points">{{info.flp_points}}</div>
          </li>
        </ul>
      </div>
      <div class="no-history"  v-if="!redemptionRequestList.length">
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
  name: 'RrIndex',
  components:{
    'reward-box': defineAsyncComponent(() =>
      import('src/components/user/reward-box.vue')
    )
  },
  setup () {
    const redemptionRequestList = ref([])
    return {
      redemptionRequestList
    }
  },
  created() {
    this.getRedemptionRequestList();
  },
  methods: {
    /**
     * Get Transaction History
     */
     getRedemptionRequestList() {
      api
        .get(
          `/flp/user/redemption/request/listing`
        )
        .then((response) => {
            this.redemptionRequestList = response.data.data;
            this.redemptionRequestList.map((item) => {
              item.created_at = date.formatDate(item.created_at, 'DD/MM/YYYY')
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
