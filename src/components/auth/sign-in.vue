<template>
  <div>
    <template v-if="!otpSent">
      <q-form @submit="getOTP" @reset="onReset" class="form" ref="loginForm">
        <div class="">
          <div class="row q-pb-md">
            <div class="col-3">
              <q-select
                v-model="countrycode"
                :options="options"
                :label="$q.lang.authentication.signIn.isdCode.label"
                :placeholder="$q.lang.authentication.signIn.placeHolder"
                :rules="[
                  (val) => required(val, 'country code'),
                ]"
              />
            </div>
            <div class="col-9 q-pl-md">
              <q-input
                type="number"
                v-model="phone"
                :label="$q.lang.authentication.signIn.mobile.label"
                :placeholder="$q.lang.authentication.signIn.mobile.placeHolder"
                :dense="dense"
                :rules="[
                  (val) => required(val, 'mobile number'),
                  (val) => isNumber(val, 'mobile number'),
                  (val) => min(val, 10, 'mobile number'),
                  (val) => max(val, 10, 'mobile number'),
                ]"
              />
            </div>
          </div>
        </div>
        <div class="form-btm q-pt-md">
          <q-btn type="submit" class="btn btn2" label="Send OTP" />
          <!-- <q-btn color="red" label="Google Login" "/> -->
        </div>
         <!-- <div class="submit-otp q-pb-md">
           <q-btn @click="getemailfoem()" class="edit-no" label="Login with email?"></q-btn>
        </div> -->
      </q-form>
    </template>
    <div v-if="getemaillogin">
    <template v-if="otpSent">
      <q-form @submit="onSubmit" @reset="onReset" class="form" ref="otpForm">
        <div class="submit-otp q-pb-md">
          <div>
            <p class="q-mb-none"> OTP has been sent on {{ countrycode }} {{ phone }} </p>
            <q-btn @click="editPhone()" class="edit-no" label="Not yours? edit"></q-btn>
          </div>

          <p class="q-mb-sm">Enter OTP</p>
          <div class="otp-digit">
            <otp-input
              v-model="otp"
              :rules="[
                (val) => required(val, 'otp'),
              ]"
              ref="otpInput"
              input-classes="otp-input"
              separator="-"
              :num-inputs="6"
              inputClasses="q-mr-md"
              :should-auto-focus="true"
              :is-input-num="true"
              @on-change="handleOnChange"
              @on-complete="handleOnComplete"
            />
            <!-- <button @click="handleClearInput()">Clear Input</button> -->
          </div>
        </div>
        <div class="submit-otp q-pb-md">
        <p class="q-mb-sm">resendOTP in: {{ timerCount }}</p>
        </div>
        <div class="form-btm q-pb-lg q-pt-md">
          <q-btn class="btn btn2 q-mr-md" :label="$q.lang.label.resendOTP" @click="resendOTP()" :disabled="isDisabled" />
          <q-btn class="btn btn2" color="red" :label="$q.lang.label.submit" @click="onSubmit" />
        </div>
        <p class="w-100 text-center" v-if="verifyingOTP"> Verifying </p>
      </q-form>
    </template>
</div>
    <template v-if="!getemaillogin">
    <p class="text-subtitle1 text-red text-center"><strong>{{ $q.lang.label.loginWith }}</strong></p>

    <div class="row q-my-sm justify-center">

      <q-icon class="q-mx-md" name="img:/images/google.png" size="lg" @click="googlrlogin()"> <q-tooltip>Google</q-tooltip></q-icon>
      <q-icon class="q-mx-md" name="img:/images/240px-Apple-logo.png" size="lg" color="white"><q-tooltip>Apple</q-tooltip></q-icon>
      <q-icon class="q-mx-md" name="img:/images/733547.png" size="lg" @click="facebookLogin()" ><q-tooltip>Facebook</q-tooltip></q-icon>
    </div>

    <p class="text-weight-bold text-red text-center q-mt-lg"><strong>{{ $q.lang.label.or }}</strong></p>
    <q-form @submit="emaillogin" @reset="onReset" class="form" ref="loginForm1">
      <div class="">
          <div class="row q-pb-md">
            <div class="col-12 q-pb-sm">
               <q-input
                type="text"
                v-model="email"
                :label="$q.lang.label.email"
                placeholder="xyz@foodism.com"
                :dense="dense"
              />
            </div>
            <div class="col-12 ">
              <q-input
                type="password"
                v-model="password"
                :label="$q.lang.label.password"
                placeholder="password"
                :dense="dense"

              />
            </div>
          </div>
        </div>
        <div class="form-btm q-pb-lg q-pt-md">
          <q-btn type="submit" class="btn btn1 full-width" :label="$q.lang.label.login" />
        </div>
        <div class="submit-otp q-pb-md">
           <q-btn @click="getMobilefoem()" class="edit-no" label="Login with mobile?"></q-btn>
        </div>
    </q-form>
    </template>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref, defineAsyncComponent } from "vue";
import { mapActions } from "vuex";
import { LocalStorage, SessionStorage } from 'quasar';
import { Platform } from 'quasar';
import firebase from "firebase";
import api from '../../apis/index';

console.log('Food Push notification received: ',LocalStorage.getItem("fcmtoken"));
export default {
  name: "LoginComponent",
  data() {
    return {
      $q: useQuasar(),
      countrycode: ref("+91"),
      phone: ref(null),
      dense: ref(false),
      options: [],
      otpSent: false,
      getemaillogin: true,
      otp: [],
      verifyingOTP: false,
      timerCount: 0,
      isDisabled: true,
    };
  },
  components:{
    'otp-input': defineAsyncComponent(() => import('components/auth/otp-input.vue')),
  },
  methods: {
    ...mapActions({
      sendOTP: "auth/sendOTP",
      resend: "auth/resendOTP",
      verifyOTP: "auth/verifyOTP",
      socialLogin: "auth/socialLogin"
    }),
    editPhone() {
      this.otpSent = false;
    },
    handleOnComplete(value) {
      console.log('OTP completed: ', value);
      this.otp = value;
      this.onSubmit();
    },
    handleOnChange(value) {
      this.otp = value;
      console.log('OTP changed: ', value);
    },
    handleClearInput() {
      this.$refs.otpForm.clearInput();
    },
    getOTP() {
      this.timerCount=30;
      this.isDisabled= true,
      this.$refs.loginForm.validate().then((success) => {
        console.log("success", success);
        if (success) {
          // const phoneNumber = this.countrycode+this.phone;
          this.sendOTP({
            phone_number: this.phone,
          country_code: this.countrycode,
          }).then((result) => {
            console.log(result)
            if(result.success) {
              this.otpSent = true; // show otp form
              console.log(result);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        }
      });
    },
    getemailfoem(){
      this.otpSent= true;
      this.getemaillogin= false;
    },
    getMobilefoem(){
      this.otpSent= false;
      this.getemaillogin= true;
    },
    resendOTP() {
      this.timerCount=30;
      this.isDisabled=true;
      // const phoneNumber = this.countrycode+this.phone;
      this.resend({
        phone_number: this.phone,
        country_code: this.countrycode,
      }).then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
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
    onSubmit(e) {
      this.$refs.otpForm.validate().then((success) => {
        console.log("success", success);
        if (success) {

          this.$q.notify({
            spinner: true,
            message: 'Please wait... Verifying OTP',
            timeout: 1000
          })

          this.verifyingOTP = true;

          // const phoneNumber = this.countrycode+this.phone;
          if(Platform.is.android == true){
            var device_name = "Android";
          }else{
             var device_name = "IOS";
          }
          this.verifyOTP({
            task: 'login',
            phone_number: this.phone,
            country_code: this.countrycode,
            otp: this.otp,
            device_name:device_name,
            device_token:LocalStorage.getItem("fcmtoken"),
          }).then((result) => {
            if(result.success) {
              this.$store.dispatch('auth/me');
              this.verifyingOTP = false;
              console.log(result);
              this.$router.push({ name: 'user-home' });
            }
          })
          .catch((err) => {
            console.log(err);
          });
        } else {
          this.$q.notify({
            color: "red-5",
            textColor: "white",
            icon: "error",
            message: "Please fill all required details",
          });
        }
      });
    },
    getphonecode () {
      // var getEventData = [];
      api.get('/misc/phone-code').then(res => {
        // console.log(res.data);
        for(var i in res.data) {
          this.options.push(res.data[i]['phonecode']);
        }
    }).catch(err => {
      console.log(err);
      reject(err)
    });
    },
  },
  created () {
      this.getphonecode();
      //console.log(this.getBlogData);
  },
  watch: {
            timerCount: {
                handler(value) {

                    if (value > 0) {
                        setTimeout(() => {
                            this.timerCount--;
                        }, 1000);
                    }
                    if(value <= 0){
                      this.isDisabled=false;
                    }

                },
                immediate: true // This ensures the watcher is triggered upon creation
            }

        }
};
</script>

<style lang="scss">
  .otp-input {
    width: 40px;
    height: 40px;
    padding: 5px;
    margin: 0 10px;
    font-size: 20px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    text-align: center;
    &.error {
      border: 1px solid red !important;
    }
  }
  .otp-input::-webkit-inner-spin-button,
  .otp-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
