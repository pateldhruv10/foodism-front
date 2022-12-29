<template>
  <q-page class="thank-apply">
    <div class="common-head">
      <div class="ch-left">
        <router-link :to="{ name: 'seller-form' }">
          <i class="fas fa-arrow-left"></i>
        </router-link>
      </div>
    </div>
    <div class="common-inner">
      <div class="th-inner q-px-md q-py-xl q-mt-xl text-center">
        <q-img src="~assets/th1.png"></q-img>
        <h5 class="q-pt-lg q-pb-lg">{{ $q.lang.seller.becomeSeller.thankyou.title }}</h5>
        <p v-html="$q.lang.seller.becomeSeller.thankyou.description"></p>

      </div>
    </div>
      <div class="fixed-bottom contact-seller">
        <q-btn :to="{ name: 'my-business-profile' }" class="btn btn1 full-width" label="View Profile" />
      </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ThankApply'
})
</script>
