<template>
  <q-page class="refer-page head-fix">
    <div class="common-head fixed-top">
      <div class="ch-left">
        <router-link :to="{ name: 'eligibility' }"><i class="fas fa-arrow-left"></i></router-link> Refer
      </div>
      <div class="ch-right">

      </div>
    </div>
    <div class="common-inner">
      <div class="refer-box">
        <h4>50 Foodism Points<br><span>at Referral Sign up</span></h4>
        <div class="refer-title">
          <i class="las la-info-circle"></i> How it works?
        </div>
        <q-timeline>
          <q-timeline-entry
            subtitle="Invite your friend"
          >
          </q-timeline-entry>

          <q-timeline-entry
            subtitle="They sign-up foodism account"
          >
          </q-timeline-entry>

          <q-timeline-entry
            subtitle="Your are earning!"
          >
          </q-timeline-entry>
        </q-timeline>
        <p>Terms & conditions</p>
        <div class="refer-link">
          <div class="refer-lb">
            <span>{{user.referral_code}}</span><span><q-icon @click="copyToClipboard(user.referral_code)" name="content_copy" /></span>
          </div>
          <q-btn class="btn3" @click="referpoup = true">Refer Now</q-btn>
        </div>
      </div>


    </div>
    <q-dialog v-model="referpoup" class="center-popup refer-poup">
      <q-card>
        <q-card-section>
          <div class="text-h6"><q-icon name="share" /></div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="social-share">
            <router-link to=""><q-img src="~assets/instagram.png" /></router-link>
            <router-link to=""><q-img src="~assets/whatsapp.png" /></router-link>
            <router-link to=""><q-img src="~assets/facebook.png" /></router-link>
          </div>
        </q-card-section>

        <!-- <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions> -->
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed , defineAsyncComponent } from 'vue';
import { mapGetters, useStore } from 'vuex'
import { getServerImageUrl } from '../../utils/server-asset'
import { DateTime } from 'luxon'
import { useRoute } from 'vue-router'
import { Loading, Notify } from 'quasar'
import { Clipboard } from '@capacitor/clipboard'


export default defineComponent({
  name: 'referIndex',
  components:{
  },
  setup () {
    const slide = ref(0)
    const store = useStore()
    const route = useRoute()
    const slug = route.params.slug ?? null
    const loaded = ref(false)
    Loading.show()
    const currentUser = computed(() => {
      return store.getters['auth/getUser']
    })
    const user = []
    const followers = []
    const following = []
    return {
      loaded,
      currentUser,
      user,
      followers,
      following,
      slide,
      slug,
      longText: ref(''),
      referpoup: ref(false),
    }
  },
  created() {
    this.$store.dispatch('auth/me').then(() => {
      Loading.hide()
      this.loaded = false
    })
    console.log('current user')
    this.user = computed(() => {
      return this.$store.getters['auth/getUser']
    })
  },
  methods: {
    copyToClipboard(code){
      Clipboard.write({
        string: code,
      })
      Notify.create({
        type : 'positive',
        message : 'Copied !',
        timeout : 500
      })
    },
  }
})
</script>
<style lang="scss">
  // $
  @import '../../css/flp.scss';
</style>
