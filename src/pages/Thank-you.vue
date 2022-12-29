<template>
  <q-page class="thank-you">
    <div class="common-head">
      <div class="ch-left">
        <router-link to="/buyer-view-recipe-detail"
          ><i class="fas fa-arrow-left"></i
        ></router-link>
      </div>
    </div>
    <div class="common-inner">
      <div class="th-inner q-pa-md text-center">
        <q-img src="../assets/th1.png"></q-img>
        <h5 class="q-pt-lg q-pb-lg">Thank you for <br />selecting us</h5>
        <p>Tell us how is your experience on <b>Foodism App</b></p>
        <div class="rating-div">
          <p>Tap for the Rating below</p>
          <div class="q-pa-md">
            <q-rating
              v-model="ratingModel"
              size="3.5em"
              icon="img:https://cdn.quasar.dev/logo-v2/svg/logo.svg"
            />
          </div>
        </div>
        <div class="rt-commonts">
          <div class="form-group q-mb-xl q-pt-md">
            <q-input v-model="message" label="commonts" />
            <span class="ch-limit">0/500 characters</span>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed-bottom contact-seller shadow-up-2">
      <q-btn @click="thank = true" class="btn btn1 full-width" label="Send" />
    </div>
    <q-dialog class="th-mdl fh-mdl" v-model="thank">
      <q-card class="text-center">
        <q-img class="q-mt-xl q-mb-lg" src="../assets/th2.png"></q-img>
        <h5 class="q-pt-lg q-pb-lg">Thank your for your <br />feedback</h5>

        <q-card-actions class="q-mb-md" align="center">
          <q-btn label="OK" class="btn btn1" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      thank: ref(false),
      ratingModel: ref(0),
    }
  },
  name: 'Thank-you-Index',
})
</script>
