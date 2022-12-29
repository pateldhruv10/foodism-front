<template>
  <q-header class="">
     <div class="container">
        <nav class="navbar navbar-expand-lg">
           <router-link class="navbar-brand" :to="{ name: 'web-home' }">
              <q-img src="~assets/logo.png"></q-img>
           </router-link>
           <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <q-list class="navbar-nav ms-auto mb-2 mb-lg-0">
                 <q-item
                    class="mob-none"
                    clickable
                    :active="link === 'index'"
                    @click="link = 'index'"
                    active-class="active"
                    >
                    <router-link :to="{ name: 'web-home' }">Home</router-link>
                 </q-item>
                 <q-item
                    clickable
                    class="mob-none"
                    :active="link === 'about'"
                    @click="link = 'about'"
                    active-class="active"
                    >
                    <router-link :to="{ name: 'web-aboutus' }">About</router-link>
                 </q-item>
                 <q-item
                    clickable
                    class="mob-none"
                    :active="link === 'events'"
                    @click="link = 'events'"
                    active-class="active"
                    >
                    <router-link :to="{ name: 'web-event' }">Events</router-link>
                 </q-item>
                 <q-item
                    clickable
                    class="mob-none"
                    :active="link === 'blog'"
                    @click="link = 'blog'"
                    active-class="active"
                    >
                    <router-link :to="{ name: 'web-blog' }">Blog</router-link>
                 </q-item>
                 <q-item
                    clickable
                    class="mob-none"
                    :active="link === 'policies'"
                    @click="link = 'policies'"
                    active-class="active"
                    >
                    <router-link :to="{ name: 'pricacy' }">Policies</router-link>
                 </q-item>
                 <!-- <q-item>
                    <a class="hd-app-link q-mr-md" href="https://play.google.com/store/apps/details?id=food.foodism.xyz" target="_blank">
                     <q-img src="~assets/images/android-app-small.png" />
                    </a>
                    <a class="hd-app-link" href="https://apps.apple.com/in/app/foodism/id6444040264" target="_blank">
                     <q-img src="~assets/images/ipn-app-small.png" />
                    </a>
                 </q-item> -->
                 <q-item class="nav-item" v-if="!this.isLoggedIn">
                    <q-btn @click="icon = true" class="btn btn1">Sign In / Sign Up</q-btn>
                 </q-item>
                 <q-item class="nav-item" v-if="this.isLoggedIn">
                    <q-btn  @click="logout_web()" class="btn btn1">Logout</q-btn>
                 </q-item>
                 <q-item class="mobile-menu-cus">
                    <q-btn class="btn" color="primary" icon="menu">
                       <q-menu class="mob-menu-drop">
                          <q-list>
                             <q-item>
                                <router-link :to="{ name: 'web-home' }">Home</router-link>
                             </q-item>
                             <q-item>
                                <router-link :to="{ name: 'web-aboutus' }">About</router-link>
                             </q-item>
                             <q-item>
                                <router-link :to="{ name: 'web-event' }">Events</router-link>
                             </q-item>
                             <q-item>
                                <router-link :to="{ name: 'web-blog' }">Blog</router-link>
                             </q-item>
                             <q-item>
                                <router-link :to="{ name: 'pricacy' }">Policies</router-link>
                             </q-item>
                          </q-list>
                       </q-menu>
                    </q-btn>
                 </q-item>
              </q-list>
           </div>
        </nav>
     </div>
  </q-header>
  <q-dialog class="web-center-popup" v-model="icon">
     <q-card>
        <div class="web-signin">
           <!-- <div class="">
              <h4 class="flex"><q-img src="~assets/logo1.png"></q-img>Sign in</h4>
              </div> -->
           <q-card-section class="row items-center q-pb-none">
              <h4 class="flex" v-if="signupPopup">
                 <q-img src="~assets/logo1.png"></q-img>
                 Sign in
              </h4>
              <h4 class="flex" v-if="!signupPopup">
                 <q-img src="~assets/logo1.png"></q-img>
                 Sign Up
              </h4>
              <q-space />
              <!-- <q-btn icon="close" flat round dense v-close-popup /> -->
           </q-card-section>
           <q-card-section>
              <div v-if="!otpSent && getemaillogin && signupPopup">
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
                    <div class="form-btm q-pb-md q-pt-md">
                       <q-btn type="submit" class="btn btn1 full-width" label="Send OTP" />
                       <!-- <q-btn color="red" label="Google Login" "/> -->
                    </div>
                    <div class="flex justify-between">
                        <div class="submit-otp">
                           <q-btn @click="getSignupPopup()" class="edit-no" label="Sign Up Here?"></q-btn>
                        </div>
                        <div class="submit-otp">
                           <q-btn @click="getemailfoem()" class="edit-no" label="Login with email?"></q-btn>
                        </div>
                    </div>


                 </q-form>
              </div>
              <div v-if="getemaillogin">
                 <div v-if="otpSent">
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
                          <p v-if="verifyingOTP"> Verifying </p>
                          <q-btn class="btn btn1 q-mr-md" :label="$q.lang.label.resendOTP" @click="resendOTP()" :disabled="isDisabled" />
                          <q-btn type="submit" class="btn btn3" :label="$q.lang.label.submit" @click="onSubmit" />
                       </div>
                    </q-form>
                 </div>
              </div>
              <div v-if="!getemaillogin">
                 <p class="text-subtitle1 text-red text-center"><strong>{{ $q.lang.label.loginWith }}</strong></p>
                 <div class="row q-my-sm justify-center">
                    <q-icon class="q-mx-md" name="img:/images/google.png" size="lg" @click="googlrlogin()">
                       <q-tooltip>Google</q-tooltip>
                    </q-icon>
                    <!-- <q-icon class="q-mx-md" name="img:/images/240px-Apple-logo.png" size="lg" color="white">
                       <q-tooltip>Apple</q-tooltip>
                    </q-icon> -->
                    <q-icon class="q-mx-md" name="img:/images/733547.png" size="lg" @click="facebookLogin()" >
                       <q-tooltip>Facebook</q-tooltip>
                    </q-icon>
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
              </div>
              <div v-if="getemaillogin && !signupPopup">
                 <div v-if="!otpSent">
                  <p class="text-subtitle1 text-red text-center"><strong>{{ $q.lang.authentication.signup.lable }}</strong></p>
                    <div class="row q-my-sm justify-center">
                     <q-icon class="q-mx-md" name="img:/images/google.png" size="lg" @click="googlrlogin()">
                       <q-tooltip>Google</q-tooltip>
                    </q-icon>
                       <!-- <q-icon class="q-mx-md" name="img:/images/240px-Apple-logo.png" size="lg" color="white"><q-tooltip>Apple</q-tooltip></q-icon> -->
                       <q-icon class="q-mx-md" name="img:/images/733547.png" size="lg" @click="facebookLogin()" >
                       <q-tooltip>Facebook</q-tooltip>
                    </q-icon>
                    </div>
                    <p class="text-weight-bold text-red text-center"><strong>{{ $q.lang.label.or }}</strong></p>
                    <q-form @submit="getSignupOTP" @reset="onReset" class="form" ref="registerForm">
                       <div class="">
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
                             <q-toggle
                                v-model="accept"
                                label=""
                                :rules="[
                                (val) => (val == true) || $q.lang.authentication.signup.accept.requiredMessage,
                                ]"
                                />
                             <span>I accept </span>
                             <router-link :to="{ name: 'terms-and-condition' }"> {{ $q.lang.general.terms }}</router-link>
                             <span> and </span>
                             <router-link :to="{ name: 'pricacy' }"> {{ $q.lang.general.privacy }}</router-link>
                          </div>
                       </div>
                       <div class="form-btm q-pt-md">
                          <q-btn class="btn btn1 q-mr-md" :label="$q.lang.label.login" @click="getLogin()" />
                          <q-btn class="btn btn3" :label="$q.lang.label.sendOTP" @click="getSignupOTP()" />
                       </div>
                    </q-form>
                  </div>
               </div>
           </q-card-section>
        </div>
     </q-card>
  </q-dialog>
  <!-- <q-dialog v-model="allpopup" position="bottom" :class="dialogClass">
     <component
       :is="currentFrom"
       :sendValue="sendValue"
       :fieldName="currentField"
       :sendDisplayField="sendDisplayField"
       v-on:selectValue="setValue"
     ></component>
     </q-dialog> -->
</template>
<script>
  import { ref, defineAsyncComponent, computed } from 'vue'
  import { useStore } from 'vuex'
  import useDialog from 'src/composable/useDialog'
  import { useQuasar } from "quasar";
  import { mapActions } from "vuex";
  import { LocalStorage, SessionStorage } from 'quasar';
  import { Platform } from 'quasar';
  import firebase from "firebase";
  import api from '../../apis/index';

  export default {
    name: 'UserHeader',
    // components: {
    //   'event-review': defineAsyncComponent(() =>
    //     import('components/common/event-review.vue')
    //   ),
    // },
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
        icon: ref(false),
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
        isLoggedIn: computed( () => {
          return store.getters['auth/isLoggedIn'];
        }),
        tab: ref(store.state.home.currentTab),
      }
    },
    data(){
      return{
        countrycode: ref("+91"),
        phone: ref(null),
         name: ref(null),
         email: ref(null),
        dense: ref(false),
        options: [],
        otpSent: false,
        getemaillogin: true,
        signupPopup: true,
        signupaccept: ref(true),
        accept:ref(false),
        otp: [],
        verifyingOTP: false,
        timerCount: 0,
        isDisabled: true,
        link: 'index',
      }
    },
    components:{
      'otp-input': defineAsyncComponent(() => import('components/auth/otp-input.vue')),
    },
    methods: {
      ...mapActions({
          logout: 'auth/logout',
          sendOTP: "auth/sendOTP",
         verifyOTP: "auth/verifyOTP",
         resend: "auth/resendOTP",
        }),
        logout_web(){
          this.logout();
          setTimeout(() => {
    // route.push({ name: 'web-home' })
    window.location.reload();
  }, 1000)

        },
      changeTab() {
        this.$store.dispatch('event/resetEvents')
        this.$store.dispatch('recipe/resetRecipes')
        this.$store.commit('home/changeTab', this.tab)
      },
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
      getSignupOTP(){
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
          referral_code: this.refercode,
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
      getemailfoem(){
        this.otpSent= true;
        this.getemaillogin= false;
      },
      getLogin(){
         this.otpSent= false;
         this.getemaillogin= true;
         this.signupPopup=true;
      },
      getSignupPopup(){
         this.otpSent= false;
         this.getemaillogin= true;
         this.signupPopup=false;
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

          },
          created () {
               this.getphonecode();
               //console.log(this.getBlogData);
            }
  }
</script>
<style lang="scss">
  // $
  @import '../../css/layout/header.scss';
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
  .active{
  a{
  color: #e03c23;
  }
  }
  .otp-input::-webkit-inner-spin-button,
  .otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
  }
</style>
