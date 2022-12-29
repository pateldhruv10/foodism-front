<template>
  <q-footer>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4">
          <div class="ftr-box">
            <q-img src="~assets/images/logo.png"></q-img>
            <p>Foodism is a one-stop, uniquely immersive food community. Find and share recipes, meet like-minded foodies, build a professional network in the food industry and create your mark on the restaurant, home kitchen, FMCG/F&B or start-up circuit.</p>
          </div>
        </div>

        <div class="col-md-3">
          <div class="ftr-box">
            <h4>Quick links</h4>
            <ul>
              <li><router-link :to="{ name: 'web-home' }">Home</router-link></li>
              <li><router-link :to="{ name: 'web-aboutus' }">About</router-link></li>
              <li><router-link :to="{ name: 'web-event' }">Events</router-link></li>
              <!-- <li><router-link :to="{ name: 'web-blog' }">Blog</router-link></li> -->
              <li><router-link :to="{ name: 'web-support' }">Support</router-link></li>
              <li><router-link :to="{ name: 'web-helpcenter' }">Help Center</router-link></li>
            </ul>
          </div>
        </div>
        <div class="col-md-5">
          <div class="ftr-box">
            <h4>Get In Touch</h4>
            <ul>
              <!-- <li><a href="https://g.page/foodism-xyz?share" target="_blank"><q-img src="~assets/images/add.png"></q-img> Foodism, 601, Sarap - Nr Income Tax, opp. Navjivan Press, Vasna Telephone Exchange, Ahmedabad, Gujarat 380014</a></li> -->
              <li><a href="mailto:help@foodism.com"><q-img src="~assets/images/mail.png"></q-img> help@foodism.com</a></li>
              <li><a href="tel:+91 6359111000"><q-img src="~assets/images/phone.png"></q-img> +91 6359111000</a></li>
              <!-- <li><a href="#"><img src="images/time.png"> 09.00 AM - 07:00 PM</a></li> -->
            </ul>
            <!-- <h4>Follow Us</h4> -->
            <ul class="social-link">
              <li><a href="https://www.facebook.com/foodism.xyz/" target="_blank"><img src="~assets/images/facebook.png"></a></li>
              <li><a href="https://www.instagram.com/foodism.xyz/" target="_blank"><img src="~assets/images/instagram.png"></a></li>
              <li><a href="https://www.youtube.com/channel/UC5A40soTNMxHRNoovmUNseg" target="_blank"><img src="~assets/images/youtube.png"></a></li>
              <li><a href="https://wa.link/2a7b9s" target="_blank"><img src="~assets/images/whatsapp.png"></a></li>
              <li><a href="https://in.linkedin.com/company/foodismindia" target="_blank"><img src="~assets/images/linkedin.png"></a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row sub-ftr">
        <div class="col-md-12 col-12 text-center">
          Copyright @ 2022 Foodism
        </div>
      </div>
    </div>
    <!-- Tearms and condition popup -->
    <!-- <div class="tearms-popup">
      <h5>Accept Tearms and cookies polices</h5>
      <p>We use cookies to personalise content and ads, to provide social media features and to analyse our
      traffic. We also share information about your use of our site with our social media, advertising and
      analytics partners who may combine it with other information that you’ve provided to them or that
      they’ve collected from your use of their services. You agree to our cookies if you continue to use our
      website.</p>
      <div class="mb-0 flex justify-between">
        <button type="button" class="btn btn2">Deny</button>
        <button type="button" class="btn btn1">Allow</button>
      </div>
    </div> -->
  </q-footer>

  <q-dialog v-model="allpopup" position="bottom" :class="dialogClass">
    <component
      :is="currentFrom"
      :sendValue="sendValue"
      :fieldName="currentField"
      :sendDisplayField="sendDisplayField"
      v-on:selectValue="setValue"
    ></component>
  </q-dialog>
</template>

<script>
import { ref, defineAsyncComponent } from 'vue'
import { useStore } from 'vuex'
import useDialog from 'src/composable/useDialog'

export default {
  name: 'UserHeader',
  components: {
    'event-review': defineAsyncComponent(() =>
      import('components/common/event-review.vue')
    ),
  },
  setup() {
    const store = useStore()
    const useroption = ref(false)

    const {
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
    } = useDialog()

    return {
      useroption,
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
      setValue(data) {
        this.allpopup = false
        this[`${data.field}`] = data.value
      },
      tab: ref(store.state.home.currentTab),
    }
  },
  methods: {
    changeTab() {
      this.$store.dispatch('event/resetEvents')
      this.$store.dispatch('recipe/resetRecipes')
      this.$store.commit('home/changeTab', this.tab)
    },
  },
}
</script>
<style lang="scss">
// $
</style>
