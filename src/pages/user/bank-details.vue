<template>
  <q-page class="flp-page head-fix">
    <div class="common-head fixed-top">
      <div class="ch-left">
        <router-link :to="{ name: 'bank-list' }"><i class="fas fa-arrow-left"></i></router-link> Bank Details
      </div>
      <div class="ch-right">

      </div>
    </div>
    <div class="common-inner">
      <div class="bank-details-page" v-if="bankDetail != null">
        <h6>Account Information</h6>
        <ul >
          <li><span class="bd-left">Bank Name</span><span class="bd-right">: {{bankDetail.bank_name}}</span></li>
          <li><span class="bd-left">Account Holder Name</span><span class="bd-right">: {{bankDetail.account_holder_name}}</span></li>
          <li><span class="bd-left">Account Number</span><span class="bd-right"></span>: {{bankDetail.account_number}}</li>
          <li><span class="bd-left">IFSC Code</span><span class="bd-right">: {{bankDetail.bank_ifsc_code}}</span></li>
          <li><span class="bd-left">Branch Name</span><span class="bd-right">: {{bankDetail.bank_branch_name}}</span></li>
          <li><span class="bd-left">UPI ID</span><span class="bd-right">: {{bankDetail.upi_id || 'N/A'}}</span></li>
          <li><span class="bd-left">Is Primary Account?</span><span class="bd-right">: <span v-if="bankDetail.is_primary == 1">Yes</span><span v-if="bankDetail.is_primary == 0">No</span></span></li>
        </ul>
        <div class="bd-btn" v-if="bankDetail.is_primary == 0">
          <q-btn @click="setAccountAsPrimary()" class="btn1">Set as Primary</q-btn>
        </div>

      </div>

    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed , defineAsyncComponent } from 'vue';
import { api } from 'src/boot/axios'
import Notify from "boot/notification";

export default defineComponent({
  name: 'bankdetailsIndex',
  components:{
  },
  setup () {
    const bankDetail = ref(null)
    return {
      bankDetail
    }
  },
  created() {
    this.getBankDetail(this.$route.params.id)
  },
  methods: {
    /**
     * Get Bank Detail
     */
     getBankDetail(bankId) {
      api
        .get(
          `/user/bank/${bankId}`
        )
        .then((response) => {

            this.bankDetail = response.data.data;
            console.log(this.bankDetail)
        })
        .catch((err) => {
          console.log(err)
        });
    },
    /**
     * Set Account as Primary
     */
    setAccountAsPrimary() {
      api
        .put(
          `/user/bank/${this.$route.params.id}/primary`
        )
        .then((response) => {
            Notify.success('Account has been set as primary');
            this.getBankDetail(this.$route.params.id)
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
