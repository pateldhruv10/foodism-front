<template>
  <q-page class="add-bites">
    <div class="common-head">
      <div class="ch-left">
        <span @click="previosStep()"><i class="fas fa-arrow-left"></i></span>
        {{ $q.lang.vlog.title }}
      </div>
      <div class="ch-right">
        <router-link @click="open('save-draft', savedraft)" to="">{{
          $q.lang.label.close
        }}</router-link>
      </div>
    </div>
    <div class="common-inner">
      <user-head :user="user" />
      <q-stepper
        v-model="step"
        class="add-bites-step"
        ref="stepper"
        alternative-labels
        color="primary"
        animated
      >
        <q-step :name="1" title="" icon="settings" :done="step > 1">
          <q-form ref="stepOne">
            <div class="add-vlog-form">
              <div class="row">
                <div class="col-12 form-group">
                  <q-input
                    v-model="formData.name"
                    :label="$q.lang.vlog.fields.vlogTitle.label"
                    :placeholder="$q.lang.vlog.fields.vlogTitle.placeHolder"
                    :rules="[(val) => required(val, 'Title')]"
                  />
                </div>
                <div class="col-12 form-group">
                  <q-input
                    v-model="formData.final_note"
                    type="textarea"
                    :label="$q.lang.vlog.fields.shortDis.label"
                    :placeholder="$q.lang.vlog.fields.shortDis.placeHolder"
                    :rules="[(val) => required(val, 'Short description')]"
                  />
                  <!-- :rules="[
                  (val) => max(val, 500, $q.lang.addRecipes.stepThree.fields.finalNote.label),
                ]" -->
                  <span class="ch-limit">0/500 characters</span>
                </div>
                <div class="col-12 form-group">
                  <div class="recipe-img">
                    <div class="row items-start cus-uplode">
                      <div v-if="coverPhoto" class="img-after-upload">
                        <div class="img-control">
                          <q-btn
                            icon="las la-trash"
                            title="Remove"
                            @click="setFieldNull('coverPhoto')"
                          />
                        </div>
                        <q-img
                          class="q-mr-md upload-img"
                          :src="coverPhoto"
                          alt="image"

                        />
                      </div>

                      <div
                        v-else
                        class="upload-option"
                        @click="open('upload-option', folderName, 'coverPhoto')"
                      >
                        <div class="icon">
                          <i class="las la-camera-retro"></i>
                          <span>{{
                            $q.lang.addRecipes.stepOne.fields.photo.label
                          }}</span>
                        </div>
                      </div>
                    </div>
                    <!-- <span class="ch-limit">{{
                      $q.lang.addRecipes.stepOne.fields.photo.maxSize
                    }}</span> -->
                  </div>
                </div>
                <div class="col-12 form-group">
                  <div
                    class="relative-position"
                    :v-model="select"
                    @click="
                      open(
                        'video-category',
                        video_category,
                        'video_category',
                        'video_category_show',
                        { slug: slug }
                      )
                    "
                  >
                    <p class="detail-title">
                      {{ $q.lang.vlog.fields.videoCategory.label }}
                    </p>
                    <div class="absolute-right edit-option">
                      <i class="las la-pen"></i>
                    </div>
                  </div>
                  <div class="taglist">
                    <ul v-if="video_category">
                      <li v-for="(item, index) in video_category" :key="item">
                        <q-btn
                          icon-right="close"
                          :label="item"
                          @click="
                            videocategoryDel(index), (video_category_show = null)
                          "
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 form-group">
                  <div class="row items-start cus-uplode">
                    <upload-video
                      :videoLink="video"
                      :folderName="folderName"
                      fieldName="video"
                      v-on:selectValue="setValue"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 form-group">
                  <div class="add-loc">
                    <q-img src="~assets/location.svg"></q-img
                    >{{ $q.lang.common.subLabel.location }}
                  </div>
                </div>
              </div>
            </div>
          </q-form>
        </q-step>

        <!-- <q-step
          :name="2"
          title="Create an ad group"
          caption="Optional"
          icon="create_new_folder"
          :done="step > 2"
        >
          <q-form ref="stepTwo">
            <div class="row">

            </div>

            <slot name="progress" />

          </q-form>
        </q-step> -->

        <template v-slot:navigation>
          <div class="fixed-bottom add-bites-btm box-shadow-cus">
            <q-stepper-navigation>
              <q-btn
                :to="{ name: 'vlog-preview' }"
                @click="preview()"
                class="btn btn2"
                label="Preview"
              />
              <q-btn
                @click="validateForms()"
                class="btn float-right"
                v-bind:class="btnclass"
                label="Submit"
              />
            </q-stepper-navigation>
          </div>
        </template>
      </q-stepper>
    </div>

    <q-dialog v-model="allpopup" position="bottom" :class="dialogClass">
      <component
        :is="currentFrom"
        :sendValue="sendValue"
        :fieldName="currentField"
        :sendDisplayField="sendDisplayField"
        :sendOptions="sendOptions"
        v-on:selectValue="setValue"
      >
      </component>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineAsyncComponent, ref, watch } from 'vue'
import { mapGetters } from 'vuex'
import api from '../../apis/index'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import uuid from '../../composable/uuid'
import useDialog from 'src/composable/useDialog'

export default {
  name: 'AddVlog',
  components: {
    'upload-option': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "upload-option" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/all-upload/upload-option.vue'
      )
    ),
    'save-draft': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "save-draft" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/all-upload/save-draft.vue'
      )
    ),
    'video-category': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "video-category" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/video-category.vue'
      )
    ),
    'upload-video': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "upload-video" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/all-upload/upload-video-option.vue'
      )
    ),
  },
  setup() {
    const {
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendOptions,
      sendDisplayField,
      dialogClass,

      open,
    } = useDialog()

    const uid = uuid()
    const route = useRoute()
    const slug = route.params.slug ?? null
    const btnclass = ref('btn4')
    const stepOne = ref(null)
    const stepTwo = ref(null)
    const step = ref(1)
    const isEdit = ref(false)

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

    const select = ref(null)
    const store = useStore()
    const myPreview = store.getters['event/getvlogPreview']

    const video_category = ref('')
    const coverPhoto = ref('')
    const video = ref('')
    const formData = ref({
      name: ref(''),
      final_note: ref(''),
    })

    watch(
      () =>
        _.cloneDeep([
          formData.value,
          step.value,
          video_category.value,
          video.value,
          coverPhoto.value,
        ]),
      (currentValue, oldValue) => {
        const form = currentValue[0]
        const stp = currentValue[1]

        if (stp == 1) {
          if (
            form.name !== '' &&
            video_category.value !== '' &&
            video.value !== ''
          ) {
            btnclass.value = 'btn1'
          } else {
            btnclass.value = 'btn4'
          }
        } else if (stp == 2) {
          if (form.final_note !== '' && coverPhoto.value !== '') {
            btnclass.value = 'btn1'
          } else {
            btnclass.value = 'btn4'
          }
        } else {
          btnclass.value = 'btn1'
        }
      }
    )

    return {
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendOptions,
      sendDisplayField,
      dialogClass,
      open,
      folderName: 'vlogs',
      uid,
      isEdit,
      slug,
      coverPhoto,
      video,
      video_category,
      formData,
      myPreview,
      select,
      btnclass,
      drag: ref(false),
      editStep: ref(0),
      refName: ref('name'),
      textArea: ref('textArea'),
      step,
      done1,
      done2,
      done3,
      done4,
      done5,
      stepOne,
      stepTwo,
      stateform1,
      stateform2,
      stateform3,
      stateform4,
      stateform5,
      categoryError,
      dense: ref(false),
      video_category_show: ref(null),
      accept: ref('image/*'),
    }
  },

  computed: {
    ...mapGetters({
      categories: 'master/getCategories',
      user: 'auth/getUser',
      profilePicture: 'auth/getUserProfilePicture',
    }),
  },
  created() {
    if (this.slug) {
      this.isEdit = true

      var myPreview = this.myPreview.find((item) => item.id == this.slug)
      console.log(myPreview)
      this.video_category = myPreview.video_category
        ? myPreview.video_category
        : ''
      this.coverPhoto = myPreview.image ? myPreview.image : ''
      this.video = myPreview.video ? myPreview.video : ''
      this.formData = {
        name: myPreview.name ? myPreview.name : '',
        final_note: myPreview.desc ? myPreview.desc : '',
      }
    }
  },
  methods: {
    videocategoryDel(index) {
      this.$store.commit('event/videocategoryDel', index)
      this.video_category.splice(index, 1)
    },
    getFiltered(array) {
      var filtered = array.filter(function (x) {
        if (typeof x == 'object') {
          return x.ingredient !== null
        }
        return x !== undefined
      })

      return filtered
    },
    nextStep() {
      this.$refs.stepper.next()
    },
    previosStep() {
      if (this.step == 1) {
        this.open('save-draft')

        // this.$store.commit('event/removevlogPreview')
        // this.$router.push({ name: 'user-home' })
      } else {
        this.$refs.stepper.previous()
      }
    },
    validateForms() {
      if (this.$refs.stepOne) {
        // Validate form Step 1 and save data using axios
        this.$refs.stepOne.validate().then((success) => {
          if (success) {
            this.stateform1 = false
            this.nextStep()
          } else {
            this.stateform1 = true
          }
          return success
        })
      } else if (this.$refs.stepTwo) {
        // Validate form Step 1 and save data using axios
        this.$refs.stepTwo.validate().then((success) => {
          if (success) {
            this.stateform2 = false
            this.submitForm()
          } else {
            this.stateform1 = true
          }
          return success
        })
      }
    },

    preview() {
      if (this.slug) {
        var data = {
          id: this.slug,
          video: this.video,
          name: this.formData.name,
          video_category: this.video_category,
          desc: this.formData.final_note,
          image: this.coverPhoto,
        }

        this.$store.commit('event/editVlog', data)
        this.isEdit = true
      } else {
        // let r = Math.random().toString(36).substring(7)
        // console.log(r)
        var data = {
          id: this.uid,
          video: this.video,
          name: this.formData.name,
          video_category: this.video_category,
          desc: this.formData.final_note,
          image: this.coverPhoto,
        }
        this.$store.commit('event/vlogPreview', data)
        console.log(data)
      }
    },

    async submitForm() {
      // alert('submit')
      const response = await fetch(this.coverPhoto)
      const blob = await response.blob()
      const formData = new FormData()
      formData.append('image', blob, this.coverPhoto)
      formData.append('final_note', this.final_note) // Int value

      api
        .post('/save-recipe', formData)
        .then((result) => {
          console.log('result', result)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    setFieldNull(fieldName) {
      this[`${fieldName}`] = null
    },

    setValue(data) {
      this.allpopup = false
      if (data.field.startsWith('step')) {
        const index = parseInt(data.field.split('.')[1])
        this.steps[index].image = data.value
      } else {
        console.log(data.value)
        this[`${data.field}`] = data.value
      }
    },
  },
}
</script>
<style lang="scss">
// $
@import '../../css/page/vlog.scss';
</style>
