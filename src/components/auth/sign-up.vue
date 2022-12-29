<template>
  <div>
    <template v-if="!otpSent">
    <!-- <p class="text-subtitle1 text-red text-center"><strong>{{ $q.lang.authentication.signup.lable }}</strong></p> -->
    <!-- <div class="row q-my-sm justify-center">

      <q-icon class="q-mx-md" name="img:/images/google.png" size="lg"> <q-tooltip>Google</q-tooltip></q-icon>
      <q-icon class="q-mx-md" name="img:/images/240px-Apple-logo.png" size="lg" color="white"><q-tooltip>Apple</q-tooltip></q-icon>
      <q-icon class="q-mx-md" name="img:/images/733547.png" size="lg"><q-tooltip>Facebook</q-tooltip></q-icon>
    </div> -->

    <!-- <p class="text-weight-bold text-red text-center q-mt-lg"><strong>{{ $q.lang.label.or }}</strong></p> -->
      <q-form @submit="getOTP" @reset="onReset" class="form" ref="registerForm">
        <div class="">
          <div class="">
            <div class="row">
              <div class="col-12">
                <q-input
                  v-model="name"
                  :label="$q.lang.authentication.signup.name.label"
                  :placeholder="$q.lang.authentication.signup.name.placeHolder"
                  :dense="dense"
                  :rules="[
                    (val) => required(val, 'name'),
                  ]"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <q-select
                v-model="countrycode"
                :options="options"
                :label="$q.lang.authentication.signup.isdCode.label"
                :placeholder="$q.lang.authentication.signup.placeHolder"
                :rules="[
                  (val) => required(val, 'country code'),
                ]"
              />
            </div>
            <div class="col-9 q-pl-md">
              <q-input
                type="number"
                v-model="phone"
                :label="$q.lang.authentication.signup.mobile.label"
                :placeholder="$q.lang.authentication.signup.mobile.placeHolder"
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

          <!-- <div class="row">
            <div class="col-12">
              <q-input
                v-model="email"
                :label="$q.lang.authentication.signup.email.label"
                :placeholder="$q.lang.authentication.signup.email.placeHolder"
                :dense="dense"
                :rules="[
                  (val) => required(val, 'email'),
                  (val) => isEmail(val),
                ]"
              />
            </div>
          </div> -->
          <div class="row">
            <div class="col-12">
              <q-input
                v-model="email"
                :label="$q.lang.authentication.signup.email.label"
                :placeholder="$q.lang.authentication.signup.email.placeHolder"
                :dense="dense"
                :rules="[
                  (val) => required(val, 'email'),
                  (val) => isEmail(val),
                ]"
              />
            </div>
            <!-- <div class="col-12">
              <q-input
                type="password"
                v-model="password"
                :label="$q.lang.authentication.signup.password.label"
                :placeholder="$q.lang.authentication.signup.password.placeHolder"
                :dense="dense"
                :rules="[
                  (val) => required(val, 'password'),
                ]"
              />
            </div> -->
            <div class="col-12 q-mb-md">
              <q-input
                v-model="refercode"
                label="Referral Code"
                placeholder="Referral Code"
                :dense="dense"
              />
            </div>
          </div>
          <div class="login-con">
            <!-- <q-checkbox v-model="signupaccept" label="Teal" color="teal" /> -->
            <q-toggle
              v-model="accept"
              label=""
              :rules="[
                (val) => (val == true) || $q.lang.authentication.signup.accept.requiredMessage,
              ]"
            />
            <span>I agree to</span>
            <router-link :to="{ name: 'terms-and-condition' }"> {{ $q.lang.general.terms }}</router-link>
            <span> and </span>
            <router-link :to="{ name: 'pricacy' }"> {{ $q.lang.general.privacy }}</router-link>
          </div>
        </div>
        <div class="form-btm q-pt-md">
          <q-btn class="btn btn3 q-mr-md" :label="$q.lang.label.login" v-on:click="showForm()" />
          <q-btn class="btn btn3" :label="$q.lang.label.sendOTP" @click="getOTP()" />
        </div>
      </q-form>
    </template>
    <template v-if="otpSent">
      <q-form @submit="onSubmit" @reset="onReset" class="form" ref="otpForm">
        <div class="submit-otp q-pb-md">
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
        <!-- <p class="w-100" v-if="verifyingOTP"> Verifying </p> -->
        <div class="form-btm q-pb-lg q-pt-md">
          <!-- <p class="w-100" v-if="verifyingOTP"> Verifying </p> -->
          <!-- <p class="w-100"> Verifying </p> -->
          <div class="">
            <q-btn class="btn btn2 q-mr-md" :label="$q.lang.label.resendOTP" @click="resendOTP()" :disabled="isDisabled" />
            <q-btn type="submit" class="btn btn2" :label="$q.lang.label.submit" @click="onSubmit" />
          </div>
        </div>
        <p class="w-100 text-center veri-cus" v-if="verifyingOTP"> Verifying </p>
      </q-form>
    </template>
  </div>
</template>

<script>
import { useQuasar, openURL } from "quasar";
import { ref, defineAsyncComponent, defineComponent } from "vue";
import { mapActions } from "vuex";
import { LocalStorage, SessionStorage } from 'quasar';
import { Platform } from 'quasar';
import api from '../../apis/index';

export default defineComponent({
  name: 'SignUpComponent',
  emits: ['changeform'],
  data() {
    return {
      $q: useQuasar(),
      phone: ref(null),
      name: ref(null),
      email: ref(null),
      password: ref(null),
      dense: ref(false),
      accept:ref(false),
      countrycode: ref("+91"),
      options: [],
      otpSent: false,
      verifyingOTP: false,
      timerCount: 0,
      isDisabled: true,
      signupaccept: ref(true),
      gotoURL(url) {
        openURL(url)
      }
    }
  },
  components:{
    'otp-input': defineAsyncComponent(() => import('components/auth/otp-input.vue')),
  },
  methods: {
    ...mapActions({
      sendOTP: "auth/sendOTP",
      verifyOTP: "auth/verifyOTP",
      resend: "auth/resendOTP",
    }),
    showForm() {
      this.$emit('changeform', { 'position': 'bottom', 'form' : 'sign-in' })
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
      this.$refs.registerForm.validate().then((success) => {
        console.log('success', success)
        if( !success ) {
          return;
        }

        if( success && !this.accept ) {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Please accept the license and terms',
          })
          return
        }

        // const phoneNumber = this.countrycode+this.phone;

        this.sendOTP({
          task: 'register',
          phone_number: this.phone,
          country_code: this.countrycode,
          name: this.name,
          email: this.email,
          referral_code: this.referralCode,
          password: this.password,
          accept: this.accept,
        }).then((result) => {
            this.otpSent = true; // show otp form
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      })
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
          if(Platform.is.android){
            var device_name = "Android";
          }else{
             var device_name = "IOS";
          }

          this.verifyOTP({
            task: 'register',
            phone_number: this.phone,
            country_code: this.countrycode,
            otp: this.otp,
            referral_code: this.referralCode,
            device_name:device_name,
            device_token:LocalStorage.getItem("fcmtoken"),
          }).then((result) => {
            if(result.success) {
              this.$store.dispatch('auth/me');
              this.verifyingOTP = false;
              console.log(result);
              this.$router.push({ name: 'user-detail' });
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
})
</script>

<style lang="scss">

</style>
