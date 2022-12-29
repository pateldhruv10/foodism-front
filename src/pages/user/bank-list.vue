<template>
  <q-page class="flp-page head-fix">
    <div class="common-head fixed-top">
      <div class="ch-left">
        <router-link :to="{ name: 'flp' }"><i class="fas fa-arrow-left"></i></router-link> Manage Bank
      </div>
      <div class="ch-right">

      </div>
    </div>
    <div class="common-inner">
      <div class="bank-list" v-if="bankList.length">
        <div class="bank-box" v-for="bank of bankList" :key="bank.id">

            <div class="bank-name">
              <router-link :to="{ name: 'bank-details' , params: { id: bank.id }}">{{bank.bank_name}}</router-link>
              <span v-if="bank.is_primary" class="pr-ac">Primary</span>
            </div>
            <div class="bank-detail">
              <div class="bd-left">
                <router-link :to="{ name: 'bank-details' , params: { id: bank.id }}">
                  <div class="bank-ac">
                    {{bank.account_number}}
                  </div>
                  <div class="bank-ifsc">
                    {{bank.bank_ifsc_code}}
                  </div>
                </router-link>
              </div>
              <div class="bd-right">
                <router-link :to="{ name: 'bank-edit' , params: { id: bank.id }}">
                  <q-icon  name="edit" />
                </router-link>
              </div>
            </div>
        </div>
        <div class="q-mt-md flex">
          <q-btn class="btn btn2 full-width" :to="{ name: 'add-bank' }"><q-icon name="add" /> Add Bank</q-btn>
        </div>
      </div>
      <div class="no-bank-list" v-if="!bankList.length">
        <div class="bank-icon">
          <q-icon name="account_balance" />
        </div>
        <q-btn class="btn btn2 full-width" :to="{ name: 'add-bank' }"><q-icon name="add" /> Add Bank</q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed , defineAsyncComponent } from 'vue';
import { api } from 'src/boot/axios'

export default defineComponent({
  name: 'banklistIndex',
  components:{
  },
  setup () {
    const bankList = ref([]);
    return {
      bankList,
    }
  },
  created() {
    this.getBankList();
  },

  methods: {
    /**
     * Get Transaction History
     */
     getBankList() {
      api
        .get(
          `/user/bank/listing`
        )
        .then((response) => {
            this.bankList = response.data.data;

            // this.transactionList.map((item) => {
            //   console.log(item.created_at)
            //   item.created_at = date.formatDate(item.created_at, 'DD/MM/YYYY hh::mm A')
            // })
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
