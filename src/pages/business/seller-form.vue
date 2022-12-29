<template>
  <q-page class="seller-form">
    <!-- start show steps count  -->
    <div class="form-head fixed-top q-pa-lg">
      <div class="bsp-top">
        <span @click="previosStep()"><i class="fas fa-arrow-left"></i></span>
      </div>
      <div class="step-number" @click="previosStep()">
          {{ $lang.step }} {{ step }} / {{ totalSteps }}
      </div>
    </div>
    <!-- ends show steps count  -->

    <q-stepper
      class="no-shadow seller-form-step"
      v-model="step"
      ref="stepper"
      color="primary"
      animated
    >
      <q-step
        :name="1"
        :done="done1"
        :error="stateform1"
      >
        <div class="form-md q-pa-lg">
          <!-- show step title from language file -->
          <step-title step="step1" />
          <q-form ref="formStep1" >
            <div class="form-group q-mb-md">
              <label class="q-mb-sm flex"> {{ $lang.step1.fields.logo.label }}</label>
              <div class="row items-start cus-uplode">
                <q-uploader
                  url="http://localhost:4444/upload"
                  style="max-width: 150px"
                />
              </div>
            </div>
            <div class="form-group q-mb-md">
              <q-input
                v-model="name"
                :label="$lang.step1.fields.name.label"
                :placeholder="$lang.step1.fields.name.placeHolder"
                :rules="[
                  (val) => required(val, 'name'),
                ]"
              />
            </div>
            <div class="form-group q-mb-md">
              <q-input
                v-model="handler"
                :label="$lang.step1.fields.username.label"
                :placeholder="$lang.step1.fields.username.placeHolder"
                debounce="1000"
                :rules="[
                  (val) => required(val, 'handler'),
                  (val) => isSpecialString(val, 'handler')
                ]"
              />
                  <!-- (val) => checkHandler(), -->
            </div>
            <div class="form-group q-mb-md">
              <q-input
                v-model="email"
                type="email"
                :label="$lang.step1.fields.email.label"
                :placeholder="$lang.step1.fields.email.placeHolder"
                :rules="[
                  (val) => required(val, 'email'),
                  (val) => isEmail(val),
                ]"
              />
            </div>

            <div class="form-group q-mb-md">
              <div class="row mob-no">
                <div class="col-3">
                  <q-select
                    v-model="countrycode"
                    :options="options"
                    :label="$lang.step1.fields.isdCode.label"
                    :placeholder="$lang.step1.fields.isdCode.placeHolder"
                    :rules="[
                      (val) => required(val, 'country code'),
                    ]"
                  />
                </div>
                <div class="col-9 relative-position">
                  <q-input
                    v-model="phone"
                    type="tel"
                    :label="$lang.step1.fields.mobile.label"
                    :placeholder="$lang.step1.fields.mobile.placeHolder"
                    :rules="[
                      (val) => required(val, 'mobile number'),
                      (val) => isNumber(val, 'mobile number'),
                      (val) => min(val, 10, 'mobile number'),
                      (val) => max(val, 10, 'mobile number'),
                    ]"
                  />
                  <q-btn class="btn3 absolute-bottom-right" :label="$q.lang.label.sendOTP" @click="getOTP()"></q-btn>
                </div>
              </div>
            </div>
          </q-form>

          <div v-if="otpSent" class="form-group q-mb-md relative-position mob-otp">
            <q-input
              type="number"
              v-model="otp"
              :label="$lang.step1.fields.otp.label"
              :placeholder="$lang.step1.fields.otp.placeHolder"
              min="6"
              max="6"
              :rules="[
                (val) => required(val, 'OTP'),
                (val) => isNumber(val, 'OTP'),
                (val) => min(val, 6, 'OTP'),
                (val) => max(val, 6, 'OTP'),
              ]"
            />
            <q-btn class="btn3 absolute-bottom-right" :label="$q.lang.label.submit" @click="onVerifyOTP()" ></q-btn>
          </div>
        </div>
      </q-step>

      <q-step
        :name="2"
        :done="done2"
        :error="stateform2"
      >
        <div class="form-md q-pa-lg">
          <step-title step="step2" />
          <q-form ref="formStep2">
            <p v-if="categoryError"> {{ $q.lang.seller.becomeSeller.form.step2.error }}</p>
            <div class="ac-list">
              <div class="ac-box" v-for="(category, index) in categories" :key="index">
                <q-checkbox
                  v-model="selectedCategory"
                  :val="category.id"
                  @click="checkSelectedCategory()"
                >
                  <div class="ac-info">
                    <q-img :src="getImage(category.image)" :loading="eager" :decoding="async" :crossorigin="anonymous"></q-img>
                    <div class="cat-info">
                      <h6>{{ category.name }}</h6>
                      <span>{{ category.description }}</span>
                    </div>
                  </div>
                </q-checkbox>
              </div>
            </div>
          </q-form>
        </div>
      </q-step>

      <q-step
        :name="3"
        :done="done3"
        :error="stateform3"
      >
        <div class="form-md q-pa-lg">
          <step-title step="step3" />
          <div class="lc-dis">
            <b>{{ $lang.step3.description }}</b>
            <p>{{ $lang.step3.shortDescription }}</p>
          </div>
          <q-form ref="formStep3">
            <div class="q-py-lg loc-btn">
              <q-btn class="btn btn2 full-width" :label="$lang.step3.addLocation" icon="add"  @click="locdialog = true" />
            </div>
            <div v-for="(location, index) in locations" :key="index" class="loc-box q-pa-md q-mb-md">
              <div class="loc-img">
                <q-img :src="location.image" :loading="eager" :decoding="async" :crossorigin="anonymous"></q-img>
              </div>
              <div class="loc-detail q-pl-md">
                <p>{{ location.name }}</p>
                <span class="q-mb-sm flex">{{ location.address }}</span>
                <p>
                  <q-btn class="btn3" label="Edit" @click="editLocation(location.id)"></q-btn>
                  <q-btn class="btn3" label="Delete" @click="removeLocation(index)"></q-btn>
                </p>
              </div>
            </div>
          </q-form>
        </div>
      </q-step>
      <q-step
        :name="4"
        :done="done4"
        :error="stateform4"
      >
        <div class="form-md q-pa-lg">
          <step-title step="step4" />
          <q-form ref="formStep4">
            <div class="form-group q-mb-md" v-for="(link, index) in addotherlink" :key="index">
              <q-input
                v-model="socialLink[index]"
                type="url"
                :label="link.label"
                :placeholder="link.placeholder"
                class="form-control"
                :rules="[
                  (val) => isUrl(val, link.label),
                ]"
              />
            </div>

            <div class="form-group upload-portfolio">
              <!-- <q-btn @click="addOtherlink" class="btn3" :label="$lang.step4.addOtherLink" /> -->
              <q-uploader
                url="http://localhost:4444/upload"
                label="Upload Portfolio / CV / Resume "
                multiple
              >
                <template v-slot:list="scope">
                  <q-list separator>

                    <q-item v-for="file in scope.files" :key="file.__key">
                      <q-item-section>
                        <q-item-label class="full-width ellipsis">
                          {{ file.name }}
                        </q-item-label>

                        <q-item-label caption>
                          Status: {{ file.__status }}
                        </q-item-label>

                        <q-item-label caption>
                          {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                        </q-item-label>
                      </q-item-section>

                      <q-item-section
                        v-if="file.__img"
                        thumbnail
                        class="gt-xs"
                      >
                        <img :src="file.__img.src">
                      </q-item-section>

                      <q-item-section top side>
                        <q-btn
                          class="gt-xs"
                          size="12px"
                          flat
                          dense
                          round
                          icon="delete"
                          @click="scope.removeFile(file)"
                        />
                      </q-item-section>
                    </q-item>

                  </q-list>
                </template>
              </q-uploader>
              <span @click="nextStep()" class="float-right text-decoration">
                <b>{{ $q.lang.label.skip }}</b>
              </span>
            </div>
          </q-form>
        </div>
      </q-step>
      <!-- <q-step
        :name="5"
        :done="done5"
        :error="stateform5"
      >
        <div class="form-md q-pa-lg">
          <step-title step="step5" />
          <q-form ref="formStep5">
            <div class="form-group q-mb-md">
              <q-input
                v-model="gstno"
                :label="$lang.step5.fields.gstNo.label"
                :placeholder="$lang.step5.fields.gstNo.placeholder"
              />
            </div>
            <div class="form-group q-mb-md">
              <q-input
                v-model="fssailicense"
                :label="$lang.step5.fields.fssaiNo.label"
                :placeholder="$lang.step5.fields.fssaiNo.placeholder"
              />
            </div>
          </q-form>
        </div>
      </q-step> -->

      <!-- Start Next and Submit Button using slots -->
      <template v-slot:navigation>
        <div class="fixed-bottom seller-form-btm q-px-lg q-py-md box-shadow-cus">
          <p v-if="step == 4" class="tc-line flex justify-center q-mb-none">
            <q-checkbox
              v-model="termscheck"
              @click="checkAccept()"
            />
            By continuing, I accept the <router-link to="" @click="tcdialog = true">Terms & conditions</router-link>
          </p>
          <q-stepper-navigation>
            <q-btn @click="validateForms()" class="btn full-width" v-bind:class="{ 'btn1': isFilled, 'btn4': !isFilled }" :label="step === 4 ? 'Submit' : 'Next'" />
            <!-- <q-btn v-if="step == 5" @click="$router.push('thank-apply')" class="btn full-width btn4" :label="step === 5 ? 'Submit' : 'Next'" /> -->
          </q-stepper-navigation>
        </div>
      </template>
      <!-- End Next and Submit Button using slots -->
    </q-stepper>

    <q-dialog class="loc-popup" v-model="locdialog" position="bottom">
      <div class="cmn-flt">
        <q-card class="popup-cm">
          <q-card-section class="row items-center pop-head">
            <h6>Add Location with GPS</h6>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section class="pop-body">
            <div class="q-pa-lg">
              <div class="form-group q-mb-md">
                <GMapAutocomplete
                    placeholder="This is a placeholder"
                    :options="{
                      strictBounds: true
                    }"
                    @place_changed="setPlace"
                  >
                </GMapAutocomplete>
                <!-- <q-input v-model="locationtitle" label="Location Title" /> -->
              </div>
              <div class="form-group q-mb-md loc-icon">
                <q-input v-model="location" label="Location" />
                <router-link to="location"><span class="material-icons absolute-right">gps_fixed</span></router-link>
              </div>

            </div>
            <div class="seller-form-btm q-px-lg q-py-md box-shadow-cus">
              <q-btn class="btn full-width btn1" label="Save" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-dialog>
    <q-dialog class="tc-popup" v-model="tcdialog" position="bottom">
      <div class="cmn-flt">
        <q-card class="popup-cm">
          <div class="common-head">
            <div class="ch-left">
              <router-link to="" v-close-popup><i class="fas fa-arrow-left"></i></router-link> Terms & conditions
            </div>
          </div>
          <q-card-section class="pop-body">
            <div class="common-inner">
            <div class="tc-content">
              <p>PLEASE READ THESE TERMS OF SERVICE CAREFULLY AS THEY CONTAIN IMPORTANT INFORMATION REGARDING YOUR LEGAL RIGHTS, REMEDIES AND OBLIGATIONS. THESE INCLUDE VARIOUS LIMITATIONS AND EXCLUSIONS.</p>
              <p>Foodism.xyz Private Limited, proprietor and owner of “Foodism” (hereafter referred to as ”Foodism”, "we", "us", or "our" and includes group companies, intermediaries, subsidiary companies and affiliates) provides an online platform that connects homechefs who want to provide homemade food and customers who want to order from these home chefs (collectively, the “Services”), which Services are accessible at https://foodism.xyz/ and any other websites/ applications through which Foodism makes the Services available (collectively, the “Site”). All references herein to “User”, “your” or “you” refer to any person participating as a user of the Site who is not participating as a Home Chef (“Chef”).</p>
              <p>Foodism.xyz Private Limited, proprietor and owner of “Foodism” (hereafter referred to as ”Foodism”, "we", "us", or "our" and includes group companies, intermediaries, subsidiary companies and affiliates) provides an online platform that connects homechefs who want to provide homemade food and customers who want to order from these home chefs (collectively, the “Services”), which Services are accessible at https://foodism.xyz/ and any other websites/ applications through which Foodism makes the Services available (collectively, the “Site”). All references herein to “User”, “your” or “you” refer to any person participating as a user of the Site who is not participating as a Home Chef (“Chef”).</p>
              <p>Foodism.xyz Private Limited, proprietor and owner of “Foodism” (hereafter referred to as ”Foodism”, "we", "us", or "our" and includes group companies, intermediaries, subsidiary companies and affiliates) provides an online platform that connects homechefs who want to provide homemade food and customers who want to order from these home chefs (collectively, the “Services”), which Services are accessible at https://foodism.xyz/ and any other websites/ applications through which Foodism makes the Services available (collectively, the “Site”). All references herein to “User”, “your” or “you” refer to any person participating as a user of the Site who is not participating as a Home Chef (“Chef”).</p>
              <p><q-btn class="btn full-width btn1" v-close-popup label="Ok" /></p>
            </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, defineAsyncComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { useQuasar } from 'quasar';
import api from '../../apis/index';
import { getServerImageUrl } from '../../utils/server-asset';
import { LocalStorage, SessionStorage } from 'quasar';
import { Platform } from 'quasar';

export default ({
  name: 'BecomerSellerStepWizard',
  components:{
    'step-title': defineAsyncComponent(() => import('components/seller/become-seller/step-title.vue')),
  },
  setup () {
    const $q = useQuasar();
    const step = ref(1)

    //Mark is Done
    const done1 = ref(false)
    const done2 = ref(false)
    const done3 = ref(false)
    const done4 = ref(false)
    const done5 = ref(false)

    // Mark is have error
    const stateform1 = ref(false)
    const stateform2 = ref(false)
    const stateform3 = ref(false)
    const stateform4 = ref(false)
    const stateform5 = ref(false)
    const categoryError = ref(false)

    const locdialog = ref(false)
    const tcdialog = ref(false)
    const totalSteps = 4
    const $lang = $q.lang.seller.becomeSeller.form;
    return {
      $lang,
      step,
      done1,
      done2,
      done3,
      done4,
      done5,
      stateform1,
      stateform2,
      stateform3,
      stateform4,
      stateform5,
      categoryError,

      totalSteps,
      locdialog,
      tcdialog,

      name: ref(null),
      handler: ref(null),
      email: ref(null),
      countrycode: ref("+91"),
      phone: ref(null),
      otp: ref(null),
      selectedCategory: ref([]),
      otpSent: ref(false),
      verifyingOTP: ref(false),
      isFilled: ref(false),
      socialLink: ref([null]),
      locations: ref([
        {
          id: 1,
          name: 'Sion Branch',
          image: require('../../assets/map.jpg'),
          address: 'Pratiksha Nagar Depot Road, Pratiksha Nagar, Koliwada, Sion',
        }
      ]),

      gstno: ref(null),
      fssailicense: ref(null),
      termscheck: ref(false),

      options: ["+91", "+1", "+6"],
      reset () {
        done1.value = false
        done2.value = false
        done3.value = false
        done4.value = false
        done5.value = false
        step.value = 1
      },
      // Validate handler username exist or not
      checkHandler() {
        return new Promise((resolve, reject) => {
          if(this.handler && this.handler.length > 0) {
            api.post('/handler-avail', {
              handler: this.handler
            }).then(res => {
              if(res.success) {
                console.log("username avail "+ res.data.avail);
                // return res.data.avail;
                resolve(res.data.avail || 'This handler is already taken');
              }
            });
          }
          else{
            resolve(true);
          }
        });
      },
    }
  },
  data: () => ({
    addotherlink: [
      {
        label: "Business website",
        placeholder:"Business website link"
      },
      {
        label: "Facebook",
        placeholder:"Facebook link"
      },
      {
        label: "Instagram",
        placeholder:"Instagram link"
      },
      {
        label: "LinkedIn",
        placeholder:"Linkedin link"
      },
      {
        label: "Youtube",
        placeholder:"Youtube link"
      }
    ]
  }),
  created() {
    // for(let i=0; i <= this.categories.length; i++) {
    //   this.selectedCategory[i] = false
    // }
    for(let i=0; i <= this.categories.length; i++) {
      this.socialLink[i] = null
    }
  },
  computed: {
    ...mapGetters({
      categories: 'master/getCategories',
    }),
  },
  methods: {
    ...mapActions({
      sendOTP: "auth/sendOTP",
      verifyOTP: "auth/verifyOTP",
      resend: "auth/resendOTP",
    }),
    setPlace(data) {
      console.log(data);
    },
    getImage(image) {
      return getServerImageUrl(image, require("../../assets/c1.jpg"));
    },
    removeLocation(index) {
      this.locations.splice(index, 1);
    },
    checkSelectedCategory() {
      if(this.selectedCategory.length > 0) {
        this.isFilled = true;
      } else {
        this.isFilled = false;
      }
    },
    checkAccept() {
      if(this.termscheck) {
        this.isFilled = true;
      } else {
        this.isFilled = false;
      }
    },
    addOtherlink () {
      this.addotherlink.push({
        label: "Other Link",
        placeholder: "Enter link"
      })
    },
    submit () {
      const data = {
        addotherlink: this.addotherlink
      }
      alert(JSON.stringify(data, null, 2))
    },
    nextStep() {
      console.log('form validated')
      this.isFilled = false;
      this.$refs.stepper.next()
    },
    previosStep() {
      if(this.step > 1) {
        this.isFilled = true;
        this.step = this.step - 1;
      } else {
        this.$router.push({ name: 'home' })
      }
    },
    validateForms() {
      //this.nextStep();
      let success = false;

      if (this.$refs.formStep1) { // Validate form Step 1 and save data using axios
        this.stateform1 = false;
        this.nextStep();
        // this.$refs.formStep1.validate().then(success => {
        //   if (success) {
        //     this.stateform1 = false;
        //     this.nextStep();
        //   }
        //   else {
        //     this.stateform1 = true;
        //   }
        //   return success;
        // });
      } else if (this.$refs.formStep2 ) { // Validate form Step 2 and save data using axios with access token
        // this.categoryCheckbox = this.selectedCategory.filter(item => item === true)

        if (this.selectedCategory.length > 0) {
          this.stateform2 = false;
          this.categoryError = false
          this.nextStep();
        }
        else {
          this.stateform2 = true;
          this.categoryError = true;
        }
      } else if (this.$refs.formStep3) { // Validate form Step 3 and save data using axios with access token
        this.$refs.formStep3.validate().then(success => {
          if (success) {
            this.stateform3 = false;
            this.nextStep();
          }
          else {
            this.stateform3 = true;
          }
        });
      } else if (this.$refs.formStep4) { // Validate form Step 4 and save data using axios with access token
        this.$refs.formStep4.validate().then(success => {

          if( success && !this.termscheck ) {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'error',
              message: 'Please accept the terms & conditions',
            })
            return
          }

          if (success && this.termscheck) {
            this.stateform4 = false;
            // this.nextStep();
            this.$router.push({ 'name': 'thank-apply' })
          }
          else {
            this.stateform4 = true;
          }
        });
      } else if (this.$refs.formStep5) { // Validate form Step 5 and save data using axios with access token
        this.$refs.formStep5.validate().then(success => {
          if (success) {
            this.stateform5 = false;
            this.$router.push({ 'name': 'thank-apply' })
          }
          else {
            this.stateform5 = true;
          }
        });
      }
      return success;
    },
    getOTP() {
      this.$refs.formStep1.validate().then((success) => {
        console.log('success', success)
        if( !success ) {
          return;
        }

        const phoneNumber = this.countrycode+this.phone;

        this.sendOTP({
          task: 'become-seller',
          phone_number: phoneNumber,
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
      const phoneNumber = this.countrycode+this.phone;

      this.resend({
        phone_number: phoneNumber,
      }).then((result) => {
        console.log(result);
      }).catch((err) => {
        console.log(err);
      });
    },
    onVerifyOTP() {
      const phoneNumber = this.countrycode+this.phone;
      if(Platform.is.android){
        var device_name = "Android";
      }else{
          var device_name = "IOS";
      }
      this.verifyOTP({
        task: 'become-seller',
        phone_number: phoneNumber,
        otp: this.otp,
        device_name:device_name,
        device_token:LocalStorage.getItem("fcmtoken"),
      }).then((result) => {
        if(result.success) {
          this.isFilled = true;
          this.$store.dispatch('auth/me');
          this.verifyingOTP = false;
          console.log(result);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
  },
})
</script>

<style lang="scss">
  // $
  @import '../../css/page/become-seller.scss';
</style>
