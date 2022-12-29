<template>
  <div class="fdb-form-fill">
    <q-form v-show="!loading" @submit="onSubmit" @reset="onReset">
        <p>Hi! We need five minutes of your time... Please fill-in this form to enable us to know you
      better in order to collaborate more effectively. Thank you! </p>
          <div class="form-group">
            <q-input
            outlined
                v-model="name"
                label="Name"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type your name']"
                 />
          </div>
          <div class="form-group">
            <q-input outlined type="number" v-model="mobile_number" label="Mobile Number"   :rules="[ val => val && val.length > 0 || 'Please type mobil number', val => val > 0 && val < 9999999999 || 'Please type valid number']" />

          </div>
          <div class="form-group">
            <q-input type="email" outlined v-model="email" label="Email Address"  :rules="[ val => val && val.length > 0 || 'Please type email']"/>
          </div>
          <div class="form-group">
            <q-input outlined v-model="location" label="Location">
              <template v-slot:append>
                <q-icon name="location_on" />
              </template>
            </q-input>
          </div>
          <div class="form-group">
            <q-input outlined v-model="organization" label="Name of Organisation / Venture"  :rules="[ val => val && val.length > 0 || 'Please type your Organisation / Venture']"/>
          </div>
          <div class="form-group birth-date">
            <q-input v-model="dob" mask="date" label="Date of Birth" >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="dob">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="form-group">
            <q-input outlined v-model="fb_media" label="Facebook">
              <template v-slot:append>
                <q-icon name="lab la-facebook-f" />
              </template>
            </q-input>
          </div>
          <div class="form-group">
            <q-input outlined v-model="tr_media" label="Twitter">
              <template v-slot:append>
                <q-icon name="lab la-twitter" />
              </template>
            </q-input>
          </div>
          <div class="form-group">
            <q-input outlined v-model="ig_media" label="Instagram">
              <template v-slot:append>
                <q-icon name="lab la-instagram" />
              </template>
            </q-input>
          </div>
          <div class="form-group">
            <q-input outlined v-model="ln_media" label="Linkedin">
              <template v-slot:append>
                <q-icon name="lab la-linkedin-in" />
              </template>
            </q-input>
          </div>
          <div class="form-group">
            <q-input outlined v-model="other" label="Other Social Media Presence">
              <template v-slot:append>
                <q-icon name="las la-link" />
              </template>
            </q-input>
          </div>
          <!-- <div class="form-group">
            <q-input outlined v-model="text" label="Social Media Presence" />
            <div class="social-tag q-mt-md">
              <span class="selected">Facebook</span>
              <span class="">Twitter</span>
              <span class="">Instagram</span>
              <span class="">Linkedin</span>
              <span class="">Other</span>
            </div>
          </div> -->
          <q-separator class="q-my-lg" />

      <div class="step-info">
        <div class="q-pb-lg">
          <h4>1. Are you a... <span>(Please tick all that are applicable)</span></h4>
          <div class="step-checkbox">
            <q-option-group
              :options="options"
              type="checkbox"
              v-model="applicable"
            />
          </div>
        </div>
        <div class="q-pb-lg">
          <h4>2. Since when are you associated with the Food Industry? </h4>
          <div class="step-checkbox">
            <q-option-group
              :options="optionsyear"
              type="radio"
              v-model="food_industry"
            />
          </div>
        </div>
        <div class="q-pb-lg">
          <h4>3. Would you like to collaborate with us? <span>(Please pick any one)</span> </h4>
          <div class="step-checkbox">
            <q-option-group
              :options="optionscol"
              type="radio"
              v-model="collaborate_with_us"
            />
          </div>
        </div>
        <div class="q-pb-lg">
          <h4>4. On What areas can we collaborate with you? </h4>
          <div class="form-group">
            <q-input
              v-model="collaborate_with_you"
              filled
              type="textarea"
            />
          </div>
        </div>
        <div class="q-pb-lg">
          <h4>5. Would you like to receive updates from Foodism? </h4>
          <div class="step-radio">
            <q-option-group
              :options="optionradio"
              type="radio"
              v-model="f_updates"
            />
          </div>
        </div>
        <div class="q-pb-lg">
          <h4>6. Anything else that you wish to add? </h4>
          <div class="form-group">
            <q-input
              v-model="anythings"
              filled
              type="textarea"
            />
          </div>
        </div>
      </div>
      <div class="fixed-bottom fedback-btm box-shadow-cus">
        <q-btn class="btn btn4" label="Cancel" />
        <q-btn type="submit" class="btn btn2 float-right" label="Save"/>
      </div>
    </q-form>
  </div>

</template>

<script>
  import { ref, defineComponent,defineAsyncComponent } from 'vue';
  import api from '../../apis/index'
  import Notify from 'src/boot/notification'
  import { useRouter } from 'vue-router';
  import { useQuasar } from 'quasar'
  const route = useRouter();
export default {
  name: "FeedbackForm",
  setup () {
    const $q = useQuasar()
    return {
      name: ref([]),
      dob: ref([]),
      applicable: ref([]),
      mobile_number: ref([]),
      location: ref([]),
      email:ref([]),
      organization: ref([]),
      fb_media: ref([]),
      ig_media: ref([]),
      ln_media: ref([]),
      tr_media:ref([]),
      other: ref([]),
      collaborate_with_you: ref([]),
      anythings: ref([]),
      food_industry: ref([]),
      collaborate_with_us: ref([]),
      f_updates: ref([]),
      options: [
        { label: 'Home Chef', value: 'Home Chef' },
        { label: 'Vendor', value: 'Vendor'},
        { label: 'Home Baker', value: 'Home Baker'},
        { label: 'Consultant', value: 'Consultant'},
        { label: 'Foodpreneur/Restaurateur', value: 'Foodpreneur/Restaurateur'},
        { label: 'Food Photographer/Designer', value: 'Food Photographer/Designer'},
        { label: 'Food Blogger', value: 'Food Blogger'},
        { label: 'Health and Wellness Services  Provider', value: 'Health and Wellness Services  Provider'},
        { label: 'Professional Chef', value: 'Professional Chef'},
        { label: 'Any other, specify what', value: 'Any other, specify what'}
      ],
      optionsyear: [
        { label: 'Less than 2 years', value: 'Less than 2 years' },
        { label: 'Between 2 to 5 years', value: 'Between 2 to 5 years'},
        { label: 'Between 5 to 10 years', value: 'Between 5 to 10 years'},
        { label: 'Between 10 to 15 years', value: 'Between 10 to 15 years'},
        { label: 'More then 15 years', value: 'More then 15 years'}
      ],
      optionscol: [
        { label: 'No (Please go to Q-6)', value: 'No (Please go to Q-6)' },
        { label: 'Yes - Professionally', value: 'Yes - Professionally'},
        { label: 'Yes - Personally', value: 'Yes - Personally'},
        { label: 'Maybe', value: 'Maybe'},
        // { label: 'Any Other, specify what', value: 'friend'}
      ],
      optionradio: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no'}
      ]

    }
  },
  methods: {
    onSubmit() {
      if(this.fb_media === []){
        alert(this.fb_media);
      }

      const data = {
                      
                      name: this.name,
                      dob: this.dob,
                      mobile_number: this.mobile_number,
                      location: this.location.toString(),
                      email: this.email,
                      organization: this.organization,
                      fb_media: this.fb_media.toString(),
                      ig_media: this.ig_media.toString(),
                      ln_media: this.ln_media.toString(),
                      tr_media: this.tr_media.toString(),
                      other: this.other.toString(),
                      applicable: this.applicable.toString(),
                      food_industry: this.food_industry,
                      collaborate_with_us: this.collaborate_with_us.toString(),
                      collaborate_with_you: this.collaborate_with_you.toString(),
                      f_updates: this.f_updates,
                      anythings: this.anythings.toString(),

                    }
                    //console.log(data);
                   api.post('/user-feedback', data)
        .then((response) => {
          if (response.success) {
             this.$q.notify({
                progress: true,
                message: 'B2B requeat send successfully',
                icon: 'visibility',
                color: 'white',
                textColor: 'primary'
              })
              window.location.reload();
          }
        })
    },
  }
}
</script>
<style lang="scss">

</style>
