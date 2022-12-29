<template>
  <q-page class="">
    <div class="about-us faq-section" >
      <div class="banner-cus">
        <q-img src="~assets/images/faq-video.jpg"></q-img>
        <div class="banner-content">
          <h2>FAQ Videos</h2>
        </div>
      </div>
      <div class="q-py-xl">
        <div class="container">
          <div class="">
            <div class="row q-col-gutter-lg">
              <div class="col-md-4 q-mb-lg col-sm-6 col-12">
                <div class="video-box" @click="signup = true">
                  <div class="video-thumb">
                    <q-img src="~assets/images/sign-up.jpg"></q-img>
                  </div>
                  <h4 class="text-center pt-2">How to sign up?</h4>
                </div>
              </div>
              <div class="col-md-4 q-mb-lg col-sm-6 col-12">
                <div class="video-box" @click="uploadrecipes = true">
                  <div class="video-thumb">
                    <q-img src="~assets/images/uplod-recipes.jpg"></q-img>
                  </div>
                  <h4 class="text-center pt-2">How to upload recipes?</h4>
                </div>
              </div>
              <div class="col-md-4 q-mb-lg col-sm-6 col-12">
                <div class="video-box" @click="editprofile = true">
                  <div class="video-thumb">
                    <q-img src="~assets/images/edit-profile.jpg"></q-img>
                  </div>
                  <h4 class="text-center pt-2">How to edit your profile?</h4>
                </div>
              </div>
              <div class="col-md-4 q-mb-lg col-sm-6 col-12">
                <div class="video-box" @click="deleteacc = true">
                  <div class="video-thumb">
                    <q-img src="~assets/images/delete-acc.jpg"></q-img>
                  </div>
                  <h4 class="text-center pt-2">How to delete your account?</h4>
                </div>
              </div>
              <div class="col-md-4 q-mb-lg col-sm-6 col-12">
                <div class="video-box" @click="privacysettings = true">
                  <div class="video-thumb">
                    <q-img src="~assets/images/privacy-settings.jpg"></q-img>
                  </div>
                  <h4 class="text-center pt-2">How to change your privacy settings?</h4>
                </div>
              </div>
              <div class="col-md-4 q-mb-lg col-sm-6 col-12 ">
                <div class="video-box" @click="hostevent = true">
                  <div class="video-thumb">
                    <q-img src="~assets/images/host-event.jpg"></q-img>
                  </div>
                  <h4 class="text-center pt-2">How to host an event?</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Sign Up Modal -->
    <q-dialog v-model="signup" class="web-center-popup">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">How to Sign up?</div>
          <q-space />
          <q-btn icon="close" v-close-popup />
        </q-card-section>

        <q-card-section>
          <video width="450" height="450" controls>
            <source src="~assets/images/sign-up.mp4" type="video/mp4">
          </video>
          <!-- <q-video
            src="~assets/images/sign-up.mp4"
          /> -->
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Upload Recipes Modal -->
    <q-dialog v-model="uploadrecipes" class="web-center-popup">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">How to Upload Recipes?</div>
          <q-space />
          <q-btn icon="close" v-close-popup />
        </q-card-section>

        <q-card-section>
          <video width="450" height="450" controls>
            <source src="~assets/images/recipe-upload.mp4" type="video/mp4">
          </video>
          <!-- <q-video
            src="~assets/images/sign-up.mp4"
          /> -->
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Edit profile Modal -->
    <q-dialog v-model="editprofile" class="web-center-popup">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">How to Edit a Profile?</div>
          <q-space />
          <q-btn icon="close" v-close-popup />
        </q-card-section>

        <q-card-section>
          <video width="450" height="450" controls>
            <source src="~assets/images/Profile.mp4" type="video/mp4">
          </video>
          <!-- <q-video
            src="~assets/images/sign-up.mp4"
          /> -->
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Delete Account Modal -->
    <q-dialog v-model="deleteacc" class="web-center-popup">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">How to Delete Account?</div>
          <q-space />
          <q-btn icon="close" v-close-popup />
        </q-card-section>

        <q-card-section>
          <video width="450" height="450" controls>
            <source src="~assets/images/delete-acc.mp4" type="video/mp4">
          </video>
          <!-- <q-video
            src="~assets/images/sign-up.mp4"
          /> -->
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Privacy Settings Modal -->
    <q-dialog v-model="privacysettings" class="web-center-popup">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">How to Change Your Privacy Settings?</div>
          <q-space />
          <q-btn icon="close" v-close-popup />
        </q-card-section>

        <q-card-section>
          <video width="450" height="450" controls>
            <source src="~assets/images/privacy-settings.mp4" type="video/mp4">
          </video>
          <!-- <q-video
            src="~assets/images/sign-up.mp4"
          /> -->
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Host an Events Modal -->
    <q-dialog v-model="hostevent" class="web-center-popup">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">How to Host an Events?</div>
          <q-space />
          <q-btn icon="close" v-close-popup />
        </q-card-section>

        <q-card-section>
          <video width="450" height="450" controls>
            <source src="~assets/images/how-to-host-event.mp4" type="video/mp4">
          </video>
          <!-- <q-video
            src="~assets/images/sign-up.mp4"
          /> -->
        </q-card-section>
      </q-card>
    </q-dialog>


  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue'

export default defineComponent({
  name: 'WebFaqVideo',
  setup () {
    return {
      current: ref(3),
      signup: ref(false),
      uploadrecipes: ref(false),
      editprofile: ref(false),
      deleteacc: ref(false),
      privacysettings: ref(false),
      hostevent: ref(false),
    }
  },
})
</script>
