<template>
  <q-page class="add-bank head-fix">
    <div class="common-head fixed-top">
      <div class="ch-left">
        <router-link :to="{ name: 'bank-list' }"><i class="fas fa-arrow-left"></i></router-link> {{btnLabel}} Bank
      </div>
      <div class="ch-right">

      </div>
    </div>
    <div class="common-inner">
      <div class="add-bank-form">
        <q-form @submit="onSubmit">
              <div class="form-group">
                <q-input outlined
                v-model="detail.account_holder_name"
                lazy-rules
                :rules="[ val => val && val.length > 0]"
                placeholder="Enter account holder name*"
                label="Enter account holder name*" />
              </div>
              <div class="form-group">
                <q-input outlined type="text" :rules="[ val => val && val.length > 0]" v-model="detail.bank_name" label="Enter your bank name*" />

              </div>
              <div class="form-group">
                <q-input type="text" outlined v-model="detail.account_number" :rules="[ val => val && val.length > 0]" label="Enter account number*" />
              </div>

              <div class="form-group">
                <q-input type="text" outlined v-model="detail.bank_ifsc_code" :rules="[ val => val && val.length > 0]" label="Enter IFSC Code*" />
              </div>
              <div class="form-group">
                <q-input type="text" outlined v-model="detail.bank_branch_name" :rules="[ val => val && val.length > 0]" label="Enter bank branch name*" />
              </div>
              <div class="form-group">
                <q-input type="text" outlined v-model="detail.bank_branch_code" label="Enter bank branch code" />
              </div>
              <div class="form-group">
                <q-input type="text" outlined v-model="detail.upi_id" label="Enter UIP Id" />
              </div>
              <div class="form-group" v-if="this.bankId==0">
                <h5>Account Type</h5>
                <div class="check-cus-left">
                  <q-checkbox v-model="detail.is_primary" label="Is Primary?" />
                </div>
              </div>
              <div class="fixed-bottom addb-btm box-shadow-cus">
                <router-link :to="{ name: 'bank-list' }"><q-btn class="btn btn4" label="Cancel" /></router-link>
                <q-btn type="submit" class="btn btn2 float-right" :label="btnLabel"/>
              </div>
        </q-form>
      </div>

    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed , defineAsyncComponent } from 'vue';
import { api } from 'src/boot/axios'
import Notify from "boot/notification";

export default defineComponent({
  name: 'banklistIndex',
  components:{
  },
  setup () {
    let bankId = ref(0)
    let btnLabel = ref('Add')
    return {
       detail: ref({
          account_holder_name: '',
          account_number: '',
          bank_name: '',
          bank_branch_code: '',
          bank_branch_name: '',
          bank_ifsc_code: '',
          is_primary: true,
          upi_id: '',
      }),
      bankId,
      btnLabel
    }
  },
  created() {
    this.bankId = this.$route.params.id
    if(this.bankId > 0) {
      this.btnLabel = 'Update';
      this.getBankDetail(this.bankId)
    }

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
          this.detail = response.data.data;
        })
        .catch((err) => {
          console.log(err)
        });
    },
    onSubmit() {
      if(this.bankId == 0) {
          api
            .post(
              `/user/bank/add`,
              this.detail
            )
            .then((response) => {
                if(response.status == 201) {
                  Notify.success('Bank account has been added')
                  this.$router.push({ name: 'bank-list' })
                }
            })
            .catch((err) => {
              console.log(err)
            });
      } else {
          api
            .put(
              `/user/bank/${this.bankId}/edit`,
              this.detail
            )
            .then((response) => {
                Notify.success('Bank account has been updated')
                this.$router.push({ name: 'bank-list' })
            })
            .catch((err) => {
              Notify.error('Oops! something went wrong. Please contact to Administrator')
            });

      }
    }

  }
})
</script>
<style lang="scss">
  // $
  @import '../../css/flp.scss';
</style>
