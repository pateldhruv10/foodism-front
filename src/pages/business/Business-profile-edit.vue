<template>
  <q-page class="bus-pr-edit">
    <div class="common-head">
      <div class="ch-left">
        <router-link :to="{ name: 'my-business-profile' }"><i class="fas fa-arrow-left"></i></router-link> Edit Profile
      </div>
    </div>
    <div class="common-inner">
      <div class="profile-field">
        <div class="form-group q-mb-lg">
          <div class="edit-photo">
            <label class="q-mb-sm">Business Photo</label>
            <q-img src="~assets/lg1.png">
              <i class="las la-pen"></i>
            </q-img>
          </div>
        </div>
        <div class="form-group q-mb-md">
          <div class="edit-cover-photo">
            <label class="q-mb-sm">Cover Photo</label>
            <q-img src="~assets/c2.jpg">
              <i class="las la-pen"></i>
            </q-img>
          </div>
        </div>
        <div class="form-group q-mb-md">
          <q-input v-model="businessname" label="Business Name" />
        </div>
        <div class="form-group q-mb-md">
          <q-input v-model="businessmail" label="Business Email" />
        </div>
        <div class="form-group q-mb-md">
          <q-input v-model="businesscontactno" label="Business Contact no" />
        </div>
        <div class="form-group q-mb-md">
          <q-input v-model="businessbio" type="textarea" label="Business Bio" />
          <span class="ch-limit">0/500 characters</span>
        </div>
        <div class="form-group q-mb-md">
          <q-input v-model="weblink" label="Websit link" />
        </div>
        <div class="form-group q-mb-md">
          <q-input v-model="fblink" label="Facebook link" />
        </div>
        <div class="form-group q-mb-md">
          <q-input v-model="instalink" label="Instagram link" />
        </div>
        <div class="form-group q-mb-md">
          <q-input v-model="linkedinlink" label="Linkedin link" />
        </div>
        <div class="form-group q-mb-md q-pt-md">
          <q-btn class="btn btn1 full-width" label="Save" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue';

export default defineComponent({
  data(){
    return{
      showFilter:false,
      greenModel: ref(true),
      tab: ref('products')
    }
  },
  components:{
  },
  name: 'Business-profile-Edit-Index'
})
</script>
<style lang="scss">
  // $
  @import '../../css/business-profile.scss';
</style>

