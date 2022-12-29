<template>
  <q-page class="user-profile-edit">
    <header-with-backbutton :title="$q.lang.userProfile.edit.title" />
    <div class="common-inner">
      <label class="q-mb-sm flex">{{
        $q.lang.userProfile.edit.fields.uploadProfile.label
      }}</label>
      <div class="upload-pr-pic flex">
        <div class="row cus-uplode q-col-gutter-x-md">
          <div
            class="items-start"
            v-for="index in 3"
            :key="index"
            :id="`img${index}`"
          >
            <div
              class="col-12"
              v-if="images[index - 1] && images[index - 1].id"
            >
              <div class="img-upload">
                <img
                  :src="getImage(images[index - 1].image_path)"
                  :alt="`userimage${index}`"
                />
                <div class="img-control">
                  <q-btn
                    icon="las la-trash"
                    title="Remove"
                    @click="removeImage(index - 1)"
                  />
                </div>
              </div>
            </div>
            <q-uploader
              class="uploder_img"
              v-else
              accept=".jpg, image/*"
              @rejected="onRejected"
              :filter="checkFileType"
              field-name="image"
              :formFields="[
                { name: 'flag', value: 'profile', type: 'new', image_id: 0 },
              ]"
              @uploaded="fileUploaded"
              @input="handleFile"
            />
          </div>
        </div>
      </div>
      <div class="user-field q-pt-lg">
        <q-form @submit="onSubmit" @reset="onReset" ref="userForm">
          <div class="form-group">
            <q-input
              v-model="name"
              :label="$q.lang.userProfile.edit.fields.name.label"
              :placeholder="$q.lang.userProfile.edit.fields.name.placeHolder"
            />
          </div>
          <div class="form-group">
            <q-input
              v-model="handler"
              :label="$q.lang.userProfile.edit.fields.handler.label"
              :placeholder="$q.lang.userProfile.edit.fields.handler.placeHolder"
              debounce="1000"
              :rules="[(val) => checkHandler()]"
            />
          </div>
          <div class="form-group">
            <q-input
              v-model="about"
              type="textarea"
              :label="$q.lang.userProfile.edit.fields.about.label"
              :placeholder="$q.lang.userProfile.edit.fields.about.placeHolder"
              :maxlength="maxCount"
            />

            <span class="ch-limit"
              >{{ about?.length || 0 }}/500
              {{ $q.lang.common.subLabel.characters }}</span
            >
          </div>
          <div class="form-group q-mb-md">
            <label class="fs14">
              {{ $q.lang.userProfile.edit.fields.gender.label }}
            </label>
            <div class="edit-cus-radio">
              <q-radio v-model="gender" val="male" label="Male" />
              <q-radio v-model="gender" val="female" label="Female" />
              <q-radio
                v-model="gender"
                val="preferNotToSay"
                label="Prefer not to say"
              />
            </div>
          </div>

          <div class="form-group q-mb-md">
            <div
              class="select-cus"
              @click="open('date-selector', date_of_birth, 'date_of_birth')"
            >
              <q-input
                readonly
                v-model="date_of_birth"
                :label="$q.lang.userProfile.edit.fields.dob.label"
                :placeholder="$q.lang.userProfile.edit.fields.dob.placeHolder"
              />

              <q-icon name="expand_more" />
            </div>
          </div>

          <div class="form-group q-mb-md">
            <div
              class="select-cus"
              @click="open('city-selector', city, 'city', 'cityShow')"
            >
              <q-input
                readonly
                v-model="cityShow"
                :label="$q.lang.userProfile.edit.fields.city.label"
                :placeholder="$q.lang.userProfile.edit.fields.city.placeHolder"
              />
              <q-icon name="expand_more" />
            </div>
          </div>

          <div class="form-group q-mb-md">
            <div
              class="select-cus"
              @click="
                open(
                  'language-selector',
                  languageId,
                  'languageId',
                  'languageIdShow'
                )
              "
            >
              <q-input
                readonly
                v-model="languageIdShow"
                :label="$q.lang.userProfile.edit.fields.preferredLanguage.label"
                :placeholder="
                  $q.lang.userProfile.edit.fields.preferredLanguage.placeHolder
                "
              />

              <q-icon name="expand_more" />
            </div>
          </div>

          <div class="form-group">
            <div
              class="select-cus"
              @click="
                open(
                  'food-preference-selector',
                  foodpreference,
                  'foodpreference',
                  'foodpreferenceShow'
                )
              "
            >
              <q-input
                readonly
                v-model="foodpreferenceShow"
                :label="$q.lang.userProfile.edit.fields.foodPreference.label"
                :placeholder="
                  $q.lang.userProfile.edit.fields.foodPreference.placeHolder
                "
              />

              <q-icon name="expand_more" />
            </div>
          </div>

          <div class="form-group q-mb-md">
            <div
              class="select-cus"
              @click="
                open(
                  'cuisine-selector',
                  cuisinePreference,
                  'cuisinePreference',
                  'cuisinePreferenceShow'
                )
              "
            >
              <q-input
                readonly
                v-model="cuisinePreferenceShow"
                :label="$q.lang.userProfile.edit.fields.preferredCuisine.label"
                :placeholder="
                  $q.lang.userProfile.edit.fields.preferredCuisine.placeHolder
                "
              />

              <q-icon name="expand_more" />
            </div>
          </div>
        </q-form>
      </div>

      <div class="fixed-bottom q-px-lg q-py-md box-shadow-cus">
        <q-btn
          class="btn full-width btn1"
          type="submit"
          :label="$q.lang.label.save"
          @click="onSubmit"
        />
      </div>
    </div>
    <q-dialog v-model="allpopup" position="bottom" :class="dialogClass">
      <component
        :is="currentFrom"
        :sendValue="sendValue"
        :fieldName="currentField"
        :sendDisplayField="sendDisplayField"
        v-on:selectValue="setValue"
        v-on:clearImage="clearImage"
      ></component>
    </q-dialog>
  </q-page>
</template>

<script ts>
import { defineComponent, defineAsyncComponent, ref } from 'vue'
import { mapGetters, useStore } from 'vuex'
import api from '../../apis/index'
import { useQuasar } from 'quasar'
import { getServerImageUrl } from '../../utils/server-asset'
import { DateTime } from 'luxon'
import useDialog from 'src/composable/useDialog'
// import cropperDialog from 'src/components/common/CropperDialog.vue'

export default defineComponent({
  setup() {
    const {
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
    } = useDialog()
    const store = useStore()
    const $q = useQuasar()
    let cities = store.getters['master/getCityOption']
    if (cities.length === 0) {
      store.dispatch('master/getCitiesApi').then(() => {
        cities = store.getters['master/getCityOption']
      })
    }
    let foodpreferences = store.getters['master/getPreferredFood']
    if (!foodpreferences || foodpreferences.length === 0) {
      store.dispatch('master/getFoodPreference').then(() => {
        foodpreferences = store.getters['master/getPreferredFood']
      })
    }
    const cityOption = ref(cities)
    // console.log(cityOption);

    const user = store.getters['auth/getUser']
    function onRejected(rejectedEntries) {
      $q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
      })
    }
    let city = ref(null)
    let cityShow = ref(null)
    if (user.city_id) {
      city = ref(user.city_id.id)
      cityShow = ref(user.city_id.name)
    }
    const languageIdShow = ref(store.getters['auth/getUserLanguageText'])
    const cuisinePreferenceShow = ref(
      store.getters['auth/getUserCuisinePreference']
    )
    const cuisineIDs = user.cuisinePreference
      ? user.cuisinePreference.map((item) => {
          return item.id
        })
      : null
    const date_of_birth = user.date_of_birth
      ? ref(
          DateTime.fromISO(user.date_of_birth)
            .setLocale('en')
            .toFormat('dd-MM-yyyy')
        )
      : ref(null)
    const showCropper = ref(false)
    let backUpImage = ref(null)
    let editValue = ref(null)
    return {
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
      showCropper,
      foodpreferences,
      cityOption,
      onRejected,
      store,
      slide: ref(1),
      autoplay: ref(true),
      editValue,

      cuisinePreferenceShow,
      languageIdShow,
      cityShow,

      user,
      name: ref(user.name),
      handler: ref(user.handler),
      about: ref(user.about),
      gender: ref(user.gender),
      date_of_birth,
      city,
      backUpImage,
      cuisinePreference: ref(cuisineIDs.join(',')),

      foodpreference: ref(user.foodPreference ? user.foodPreference.id : null),
      foodpreferenceShow: ref(
        user.foodPreference ? user.foodPreference.name : null
      ),
      languageId: ref([user.languageId ?? 1]),
      async filterFn(val, update) {
        if (val === '') {
          update(() => {
            cityOption.value = cities
          })
          return
        }
        update(() => {
          const needle = val.toLowerCase()
          cityOption.value = cities.filter((v) => {
            if (v.label.toLowerCase().startsWith(needle)) {
              return v
            }
          })
        })
      },
      setModel(val) {
        city.value = val
      },
      checkHandler() {
        return new Promise((resolve, reject) => {
          if (
            this.handler &&
            this.handler.length > 0 &&
            user.handler !== this.handler
          ) {
            api
              .post('/handler-avail', {
                handler: this.handler,
              })
              .then((res) => {
                if (res.success) {
                  console.log('username avail ' + res.data.avail)

                  resolve(res.data.avail || 'This handler is already taken')
                }
              })
          } else {
            resolve(true)
          }
        })
      },
      editImage(id) {
        this.open('cropper-dialog', id)
        editValue.value = id
      },
      removeImage(index) {
        api.delete('/my-image', { id: this.images[index].id }).then((res) => {
          if (res.success) {
            store.commit('auth/removeImage', index)
          }
        })
      },
      imageSrc: ref(null),
      maxCount: ref(500),
    }
  },
  components: {
    'details-updated': defineAsyncComponent(() =>
      import('src/components/common/details-updated.vue')
    ),
    'cropper-dialog': defineAsyncComponent(() =>
      import('src/components/common/CropperDialogSquare.vue')
    ),
    'date-selector': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "date-selector" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/date-selector.vue'
      )
    ),
    'city-selector': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "city-selector" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/city-selector.vue'
      )
    ),
    'language-selector': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "language-selector" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */

        '../../components/common/language-selector.vue'
      )
    ),
    'cuisine-selector': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "cuisine-selector" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/cuisine-selector.vue'
      )
    ),
    'food-preference-selector': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "food-preference-selector" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/selectors/food-preference-selector.vue'
      )
    ),
    'categories-selector': defineAsyncComponent(
      () =>
        /* webpackChunkName: "categories-selector" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/categories-selector.vue'
    ),
    'header-with-backbutton': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "header-with-backbutton" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/layouts/header-with-backbutton.vue'
      )
    ),
  },
  name: 'UserProfileEditIndex',
  methods: {
    getImage(img) {
      return getServerImageUrl(img)
    },
    handleFile(file) {
      this.imageSrc = window.URL.createObjectURL(
        new Blob([file.target.files[0]])
      )
      this.open('cropper-dialog', this.imageSrc, 'imageSrc')
    },
    finishCropper(croppedImage) {
      this.imageSrc = croppedImage
    },

    fileUploaded({ files, xhr }) {
      this.store.commit('auth/setUser', JSON.parse(xhr.response).data)
    },

    setValue(data) {
      console.log(data)
      this.allpopup = false
      if (data.field === 'imageSrc') {
        this.imageSrc = this.uploadImage(data.value)
      } else {
        this[`${data.field}`] = data.value
      }
    },
    async uploadImage(image) {
      const response = await fetch(image)
      const blob = await response.blob()

      // Create form data to save new image
      const formData = new FormData()
      formData.append('flag', 'profile')
      formData.append('image', blob, image)

      api
        .put('/my-image', formData)
        .then((res) => {
          this.store.commit('auth/setUser', res.data)

          console.log(res.data)
          return res.data.images[0].image_path
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onSubmit() {
      this.$refs.userForm.validate().then((success) => {
        console.log(success)
        if (success) {
          let saveDate = this.date_of_birth
          if (saveDate) {
            saveDate = DateTime.fromFormat(saveDate, 'dd-MM-yyyy').toFormat(
              'yyyy-MM-dd'
            )
          }
          // alert(this.foodpreference)
          api
            .put('/me', {
              name: this.name,
              handler: this.handler,
              about: this.about,
              gender: this.gender,
              dateOfBirth: saveDate,
              cityId: this.city ? this.city : null,
              foodPreferenceId: this.foodpreference,
              languageId: this.languageId[0],
              cuisinePreference: this.cuisinePreference,
            })
            .then((result) => {
              console.log('result', result)
              if (result.success) {
                this.$store.commit('auth/setUser', result.data)
                this.open('details-updated', 'Profile updated successfully !')
                // this.$router.push({
                //   name: 'profile-view',
                //   params: { slug: this.user.id },
                // })
              }
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Please fill all required details',
          })
        }
      })

    },
    ...mapGetters({
      getUserProfilePicturesAll: 'auth/getUserProfilePicturesAll',
    }),
  },
  computed: {
    images() {
      return this.$store.getters['auth/getUserImages']
    },
  },
  created(){
    this.$store.dispatch('master/getFoodPreference');
  }
})
</script>

<style lang="scss">
// $
@import '../../css/user-profile.scss';
</style>
<style lang="scss">
.container {
  position: relative;
  max-width: 80vw;
  max-height: 50vh;
  overflow: hidden;
  img {
    display: block;
    max-width: 100%;
    max-height: 50vh;
  }
  .overlay {
    position: absolute;
    display: flex;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: #fff, $alpha: 0.7);
    opacity: 0;
    transition: 0.3s ease;
    .crop-icon {
      opacity: 1;
    }
  }
  .overlay:hover {
    opacity: 1;
  }
}

.q-uploader__list.scroll {
  display: none !important;
}
.uploder_img .q-uploader__header-content {
  .flex {
    .q-btn:first-child {
      display: none !important;
    }
  }
  a{
    .q-icon{
      margin-top: 10px;
    }
  }
}
</style>
