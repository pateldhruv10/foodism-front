<template>
  <q-page class="login-page">
    <div class="">
      <div class="absolute-top-right q-pa-lg">
        <router-link class="skip-btn" :to="{ name: 'user-home' }">{{
          $q.lang.label.skip
        }}</router-link>
      </div>
      <div class="titel-text">
        <h1>Welcome,</h1>
        <h1><span>Home of the</span></h1>
        <h1><span>food industry</span></h1>
        <p>"If it's food, it's foodism"</p>
      </div>
      <div class="absolute-bottom lg-btm text-center">
        <q-btn
          class="btn btn1 full-width q-mb-lg"
          label="Sign Up"
          @click="open('sign-up')"
        />
        <q-btn
          class="btn btn2 full-width q-mb-xl"
          label="Sign In"
          @click="open('sign-in')"
        />

        <div class="open-with">
          <p><span>Or open with</span></p>
          <div class="q-mb-xl">
            <q-icon class="q-mx-md" name="img:/images/733547.png" size="lg" @click="facebookLogin()" ><q-tooltip>Facebook</q-tooltip></q-icon>
            <q-icon class="q-mx-md" name="img:/images/google.png" size="lg" @click="googlrlogin()"> <q-tooltip>Google</q-tooltip></q-icon>
          </div>

        </div>
        <!-- <p class="q-pt-md">
          {{ $q.lang.authentication.notHaveAccount }}
          <router-link to="" @click="open('sign-up')">
            {{ $q.lang.authentication.signup.title }}
          </router-link>
        </p> -->
        <!-- <q-btn
          :label="$q.lang.authentication.createBusinessAccount"
          :to="{ name: 'become-seller' }"
          class="btn1 q-mb-md text-capitalize"
        /> -->

        <p class="btm-ftr q-mb-none">
          By Clicking button above, you agree to our <router-link to="#" @click="gotoURL('https://foodism.xyz/terms')">
            {{ $q.lang.general.terms }}</router-link>
          <span> and </span>
          <router-link to="#" @click="gotoURL('https://foodism.xyz/privacy')">
            {{ $q.lang.general.privacy }}</router-link
          >
        </p>
      </div>
    </div>

    <q-dialog v-model="allpopup" :position="position" class="login-popup">
      <div class="form-cus">
        <div class="form-title q-pb-md q-mb-lg">
          <!-- <q-img src="~assets/logo1.png"></q-img> -->
          <h3 v-if="currentFrom == 'sign-in'">
            {{ $q.lang.authentication.signIn.description }}
          </h3>
          <h3 v-if="currentFrom == 'sign-up'">
            {{ $q.lang.authentication.signup.description }}
          </h3>
        </div>
        <sign-up
          v-if="currentFrom == 'sign-up'"
          @changeform="onChangeForm"
        ></sign-up>
        <sign-in v-if="currentFrom == 'sign-in'"></sign-in>
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineAsyncComponent, ref } from 'vue'
import { useQuasar, openURL } from 'quasar'
import useDialog from 'src/composable/useDialog'
import { mapActions } from "vuex";
import firebase from "firebase";

export default {
  name: 'IndexPage',
  setup() {
    const $q = useQuasar()
    const { allpopup, currentFrom, currentField, dialogClass, open } =
      useDialog()
    const position = ref('bottom')

    return {
      $q,
      dense: ref(false),
      gender: ref(null),
      allpopup,
      currentFrom,
      currentField,
      dialogClass,
      open,
      position,

      options: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'],
    }
  },
  components: {
    'sign-in': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "sign-in" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/auth/sign-in.vue'
      )
    ),
    'sign-up': defineAsyncComponent(() =>
      /* webpackChunkName: "sign-up" */
      /* webpackMode: "lazy" */
      /* webpackInclude: /\.vue$/ */
      import('src/components/auth/sign-up.vue')
    ),
  },
  methods: {
    ...mapActions({
      socialLogin: "auth/socialLogin"
    }),
    gotoURL(url) {
      openURL(url)
    },
    onChangeForm(data) {
      console.log(data);
      this.open(data.form)
    },
    async googlrlogin(){
    const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
      .then(result => {
        console.log('result', result)
        this.$q.notify({message: 'Sign In Success.'})
        const googleEmail = result.additionalUserInfo.profile.email;
        const googleSid = result.additionalUserInfo.profile.id;
        const googleStoken = result.credential.accessToken;
       // this.$router.push('/home')
       this.socialLogin({
            sToken: googleStoken,
            email: googleEmail,
            sId:googleSid,
            socialType:"Google",
          }).then((result) => {
            if(result.success) {
              this.$store.dispatch('auth/me');
            //  this.verifyingOTP = false;
              console.log(result);
              this.$router.push({ name: 'user-home' });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(error => console.log('error',error))

    },

    async facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithPopup(provider)
      .then(result => {
        console.log('result', result)
        this.$q.notify({message: 'Sign In Success.'})
        const fbEmail = result.additionalUserInfo.profile.email;
        const fbSid = result.additionalUserInfo.profile.id;
        const fbStoken = result.credential.accessToken;
       // this.$router.push('/home')
       this.socialLogin({
            sToken: fbStoken,
            email: fbEmail,
            sId:fbSid,
            socialType:"Facebook",
          }).then((result) => {
            if(result.success) {
              this.$store.dispatch('auth/me');
              // this.verifyingOTP = false;
              console.log(result);
              this.$router.push({ name: 'user-home' });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(error => console.log('error',error))
  },
  },
}
</script>
<style lang="scss">
// $
@import 'src/css/index.scss';
//@import '../css/page/login-signup.scss';
</style>
