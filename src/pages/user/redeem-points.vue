<template>
  <q-page class="flp-page head-fix">
    <div class="common-head fixed-top">
      <div class="ch-left">
        <router-link :to="{ name: 'flp' }"><i class="fas fa-arrow-left"></i></router-link> Withdraw Foodism Point</div>
      <div class="ch-right">

      </div>
    </div>
    <div class="common-inner">
      <reward-box />
      <div class="redeem-form">
          <q-form @submit="onSubmit">
                <div class="form-group">
                  <q-input
                    type="number"
                    outlined
                    lazy-rules
                    minlength="4"
                    :rules="[ val => val && val.length > 0]"
                    v-model="detail.flp_points"
                    label="Enter redeem points*" />
                </div>
                <div class="form-group">
                  <q-input outlined type="text" v-model="detail.notes" label="Note" />
                </div>
                <div class="q-mt-md text-center">
                  <q-btn type="submit" class="btn4">Redeem</q-btn>
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
  name: 'flpIndex',
  components:{
    'reward-box': defineAsyncComponent(() =>
      import('src/components/user/reward-box.vue')
    )
  },
  setup () {
    return {
      detail: ref({
        flp_points: '',
        notes: '',
      })
    }
  },
  methods: {
    onSubmit() {
      api
            .post(
              `/flp/user/redemption/request`,
              this.detail
            )
            .then((response) => {
                if(response.data.success) {
                  Notify.success('Redemption request has been sent')
                  this.$router.push({ name: 'redeem-request' })
                } else {
                  Notify.error(response.data.message)
                }
            })
            .catch((err) => {
              console.log(err)
              Notify.error('Oops! something went wrong. Please contact the administrator')
            });
    }
  }
})
</script>
<style lang="scss">
  // $
  @import '../../css/flp.scss';
</style>
