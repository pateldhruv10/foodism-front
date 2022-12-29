<template>
  <q-page class="add-bites" ref="pageheight">
    <div class="common-head">
      <div class="ch-left">
        <span @click="previosStep()">
          <i class="fas fa-arrow-left"></i>
        </span>
        {{ $q.lang.event.title }}
      </div>
      <div class="ch-right">
        <a href="javascript:history.go(-1)">{{ $q.lang.label.close }}</a>
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
          <q-form ref="stepOne"  >
            <div class="col-12 form-group">
                <q-input
                  v-model="formData.name"
                  ref="refName"
                   :autofocus="true"
                  :label="$q.lang.event.fields.name.label"
                  :rules="[(val) => required(val, 'name')]"

                  @focus="scrollhere"
                />
              </div>
            <div class="row">
              <div class="col-12 form-group q-mt-md">
                <div class="row items-start cus-uplode">
                  <div v-if="cover_image" class="img-after-upload">
                    <div class="img-control">
                      <q-btn
                        icon="las la-trash"
                        title="Remove"
                        @click="
                          setFieldNull('cover_image') && cover_image == ''
                        "
                      />
                    </div>
                    <q-img
                      class="q-mr-md upload-img"
                      :src="showCoverImage"
                      alt="image"
                    />
                  </div>
                  <div
                    v-else
                    class="upload-option"
                    @click="open('upload-option', cover_image, 'cover_image')"
                  >
                    <div class="icon">
                      <i class="las la-camera-retro"></i>
                      <span>{{ $q.lang.event.fields.photo.label }}</span>
                    </div>
                  </div>
                  <span class="error" v-if="cover_image == ''">
                    {{ imgErr }}</span
                  >
                </div>
              </div>
            </div>
            <div class="row event-more-img q-col-gutter-md">
              <template v-if="slider_images.length > 0">
                <div
                  class="col-4"
                  v-for="(sl_img, index) in slider_images"
                  :key="index"
                  :id="`img${index}`"
                >
                  <div class="ev-up-img">
                    <img
                      :src="showSliderImage(sl_img)"
                      :alt="`userimage${index}`"
                    />

                    <div class="img-control">
                      <q-btn
                        icon="las la-trash"
                        title="Remove"
                        @click="removeSliderItem(index)"
                      />
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <q-btn
              v-if="slider_images.length <= 2"
              class="q-mb-md"
              label="Add More Image"
              color="black"
              title="Remove"
              @click="open('upload-option', slider_images, 'slider_images')"
            />

            <div class="row">

              <div class="col-12 form-group">
                <div
                  class="select-cus"
                  @click="open('event-type', event_type, 'event_type')"
                >
                  <q-input
                  readonly
                    v-model="formData.event_type"
                    :label="$q.lang.event.fields.event_type.label"
                    :rules="[(val) => required(val, 'event type')]"
                  />
                  <q-icon name="expand_more" />
                </div>
              </div>
              <div
                class="col-12 form-group"
                v-if="formData.event_type == 'Online'"
              >
                <q-input
                  type="url"
                  v-model="formData.online_event_link"
                  :label="$q.lang.event.fields.online_event_link.label"
                  @focus="scrollhere"
                  :rules="[
                    (val) =>
                      required(
                        val,
                        'online link',
                        formData.event_type == 'Online'
                      ),
                    (val) => isUrl(val, 'event type'),
                  ]"
                />
              </div>
              <div
                class="col-12 form-group"
                v-if="formData.event_type == 'Offline'"
              >
                <q-input
                  v-model="formData.offline_event_address"
                  :label="$q.lang.event.fields.offlineLink.label"
                  @focus="scrollhere"
                  :rules="[
                    (val) =>
                      required(
                        val,
                        'offline address',
                        formData.event_type == 'Offline'
                      ),
                  ]"
                />
              </div>
              <div class="col-12 form-group">
                <div
                  class="select-cus"
                  v-if="formData.event_type == 'Offline'"
                  @click="
                    open(
                      'city-selector',
                      formData.city_id,
                      'city_id',
                      'cityShow'
                    )
                  "
                >
                  <q-input
                    readonly
                    v-model="formData.cityShow"
                    :label="$q.lang.userProfile.edit.fields.city.label"
                    :placeholder="
                      $q.lang.userProfile.edit.fields.city.placeHolder
                    "
                  />
                  <q-icon name="expand_more" />
                </div>
              </div>

              <div class="select-cus"></div>
              <div class="col-12 form-group">
                <q-input
                  v-model="formData.description"
                 ref="message"
                  type="textarea"
                  :label="$q.lang.event.fields.description.label"
                  @focus="scrollhere"
                  :rules="[(val) => required(val, 'description')]"
                />
              </div>
            </div>
          </q-form>
        </q-step>

        <q-step
          :name="2"
          title="Create an ad group"
          caption="Optional"
          icon="create_new_folder"
          :done="step > 2"
        >
          <q-form ref="stepTwo">
            <div class="row">
              <div class="col-12 form-group ev-time">
                <div class="row q-col-gutter-md">
                  <div class="col-6">
                    <q-input
                      filled
                      v-model="start_date_show"
                      label="Start Date"
                      @click="$refs.startDateProxy.show()"
                    >
                      <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                            ref="startDateProxy"
                            class="center-popup"
                          >
                            <div>
                              <q-date
                                v-model="formData.start_date"
                                mask="YYYY-MM-DD HH:mm:ss"
                                :options="optionsFn"
                              >
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="Close"
                                    color="primary"
                                    flat
                                  />
                                  <q-btn
                                  @click="selected"
                                    v-close-popup
                                    label="Ok"
                                    color="primary"
                                    flat
                                  />
                                </div>
                              </q-date>
                            </div>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-6">
                    <q-input
                    :disable="isDisableStart"
                      filled
                      v-model="start_time_show"
                      label="Start time"
                      @click="$refs.startTimeProxy.show()"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                            ref="startTimeProxy"
                            class="center-popup"
                          >
                            <q-time
                              v-model="formData.start_date"
                              mask="YYYY-MM-DD HH:mm:ss"
                              format24h
                              :options="optionsFnTime"
                            >
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                                <q-btn
                                  v-close-popup
                                  label="Ok"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>
              </div>

              <div class="col-12 form-group ev-time">
                <div class="row q-col-gutter-md">
                  <div class="col-6">
                    <q-input
                      filled
                      v-model="end_date_show"
                      label="End Date"
                      @click="$refs.endDateProxy.show() "
                    >
                      <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                            ref="endDateProxy"
                            class="center-popup"
                          >
                            <q-date
                              v-model="formData.end_date"
                              mask="YYYY-MM-DD HH:mm:ss"
                              :options="optionsEndFn"
                            >
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                                <q-btn
                                @click="selected"
                                  v-close-popup
                                  label="Ok"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-6">
                    <q-input
                    :disable="isDisableEnd"
                      filled
                      v-model="end_time_show"
                      label="End time"
                      @click="$refs.endTimeProxy.show()"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                            ref="endTimeProxy"
                            class="center-popup"
                          >
                            <q-time
                              v-model="formData.end_date"
                              mask="YYYY-MM-DD HH:mm:ss"
                              format24h
                              :options="optionsFnTime2"
                            >
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                                <q-btn
                                  v-close-popup
                                  label="Ok"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>
              </div>

              <div class="col-12 form-group">
                <div
                  class="select-cus"
                  @click="
                    open(
                      'language-selector',
                      event_language,
                      'event_language',
                      'event_language_show'
                    )
                  "
                >
                  <q-input
                    v-model="formData.event_language_show"
                    :label="$q.lang.event.fields.event_language.label"
                    :rules="[
                      (val) =>
                        required(
                          val,
                          $q.lang.event.fields.event_language.label
                        ),
                    ]"
                    readonly
                    @focus="scrollhere"
                  />
                  <q-icon name="expand_more" />
                </div>
              </div>
              <div class="col-12 form-group">
                <q-input
                  v-model="formData.about_host"
                  type="textarea"
                  :label="$q.lang.event.fields.about_host.label"
                  :rules="[
                    (val) =>
                      required(val, $q.lang.event.fields.about_host.label),
                  ]"
                  @focus="scrollhere"
                />
              </div>
              <div class="col-12 form-group">
                <q-input
                  v-model="formData.terms_condition"
                  type="textarea"
                  :label="$q.lang.event.fields.terms_condition.label"
                  :rules="[
                    (val) =>
                      required(val, $q.lang.event.fields.terms_condition.label),
                  ]"
                  @focus="scrollhere"
                />
              </div>
            </div>
          </q-form>
        </q-step>

        <template v-slot:navigation>
          <div class="fixed-bottom add-bites-btm box-shadow-cus">
            <q-stepper-navigation>
              <q-btn
                @click="previosStep()"
                class="btn btn2"
                :label="step === 1 ? 'Close' : 'Previous'"
              />
              <q-btn
                @click="validateForms()"
                class="btn float-right"
                :loading="submitting"
                v-bind:class="btnclass"
                :label="step === 2 ? 'Submit' : 'Next'"
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
import {
  defineComponent,
  defineAsyncComponent,
  ref,
  watch,
  computed,
} from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import _ from 'lodash'
import api from '../../apis/index'
import { date, useQuasar } from 'quasar'
import Notify from 'src/boot/notification'
import { getServerImageUrl, isBase64 } from '../../utils/server-asset'
import { DateTime } from 'luxon'
import useDialog from 'src/composable/useDialog'
export default defineComponent({
  name: 'HostEvent',
  components: {
    'upload-option': defineAsyncComponent(() =>
      import('../../components/common/all-upload/event-upload-option.vue')
    ),
    'language-selector': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "language-selector" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/common/language-selector.vue'
      )
    ),
    'event-type': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "event-type-selector" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/common/selectors/event-type.vue'
      )
    ),
    'city-selector': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "city-selector" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/common/city-selector.vue'
      )
    ),
    'thank-submit': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "thank-you" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/common/thank-submit.vue'
      )
    ),
  },
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
    const $q = useQuasar()
    const route = useRoute()
    const store = useStore()
    const slug = route.params.slug ?? null
    const isEdit = ref(false)
    const editId = ref(null)
    const stepOne = ref(null)
    const stepTwo = ref(null)
    const step = ref(1)
    //Mark is Done
    const done1 = ref(false)
    const done2 = ref(false)
    // Mark is have error
    const stateform1 = ref(false)
    const stateform2 = ref(false)
    const nameRef = ref(null)
    const cover_image = ref('')
    const slider_images = ref([])
    const start_date = ref(null)
    const end_date = ref(null)
    const formData = ref({
      // Step 1 fields
      name: ref(null),
      event_type: ref(null),
      description: ref(null),
      online_event_link: ref(),
      offline_event_address: ref(),
      city_id: ref(),
      cityShow: ref(),
      // Step 2 Fields
      start_date,
      end_date,
      event_language: ref(null),
      event_language_show: ref(null),
      about_host: ref(null),
      terms_condition: ref(null),
      status: ref(1),
    })
    const btnclass = ref('btn4')
    const start_date_show = ref(null)
    const start_time_show = ref(null)
    const end_date_show = ref(null)
    const end_time_show = ref(null)
    const isDisableEnd =  ref(true)
    const isDisableStart = ref(true)
    watch(
      () =>
        _.cloneDeep([
          formData.value,
          step.value,
          start_date.value,
          end_date.value,
          cover_image.value,
          isDisableEnd.value

        ]),
      (currentValue, oldValue) => {
        // console.log(currentValue);
        // console.log(formData.value.);
        const form = currentValue[0]
        const stp = currentValue[1]
        if (stp == 1) {
          if (
            form.name &&
            form.event_type &&
            form.description &&
            cover_image.value &&
            form.name !== '' &&
            form.event_type !== '' &&
            form.description !== '' &&
            cover_image.value !== ''
          ) {
            btnclass.value = 'btn1'
          } else {
            btnclass.value = 'btn4'
          }
        } else if (stp == 2) {

          if (
            form.start_date &&
            form.end_date &&
            form.event_language &&
            form.about_host &&
            form.terms_condition &&
            form.start_date !== '' &&
            form.end_date !== '' &&
            form.event_language !== '' &&
            form.about_host !== '' &&
            form.terms_condition !== ''
          ) {
            btnclass.value = 'btn1'
          } else {
            btnclass.value = 'btn4'
          }
        } else {
          btnclass.value = 'btn1'
        }
        // Start date formation
        start_date_show.value = date.formatDate(currentValue[2], 'DD-MM-YYYY')
        start_time_show.value = date.formatDate(currentValue[2], 'HH:mm')
        // Start date formation
        end_date_show.value = date.formatDate(currentValue[3], 'DD-MM-YYYY')
        end_time_show.value = date.formatDate(currentValue[3], 'HH:mm')
      }
    )
    const currentDateTime = new Date(new Date().getTime() + 60 * 60 * 48 * 1000)
    console.log(currentDateTime)
    return {
      isDisableEnd,
      isDisableStart,
      currentDateTime,
      user: computed(() => {
        return store.getters['auth/getUser']
      }),
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
      $q,
      activeClass: ref('q-form-height'),
      store,
      isEdit,
      editId,
      slug,
      textArea: ref('textArea'),
      stepOne,
      stepTwo,
      step,
      done1,
      done2,
      stateform1,
      stateform2,
      btnclass,
      submitting: ref(false),
      nameRef,
      slider_images,
      cover_image,
      imgErr: ref(''),
      start_date_show,
      start_time_show,
      end_date_show,
      end_time_show,
      formData,
      optionsFn(d) {
        const { addToDate } = date
        const newDate = addToDate(new Date(), { days: 90 })
        const stdate = addToDate(new Date(), { days: 2 })
        return (
          d >= date.formatDate(stdate, 'YYYY/MM/DD') &&
          d <= date.formatDate(newDate, 'YYYY/MM/DD')
        )
      },
      optionsFnTime(hr, min, sec) {
        const dateHr = date.formatDate(currentDateTime, 'HH')
        const dateMin = date.formatDate(currentDateTime, 'mm')
        if (
          date.isSameDate(
            date.formatDate(currentDateTime, 'YYYY/MM/DD'),
            date.formatDate(start_date.value, 'YYYY/MM/DD')
          )
        ) {
          if (hr < dateHr) {
            return false
          }
          if (min !== null && min <= dateMin) {
            return false
          }
        }
        return true
      },
      optionsEndFn(d) {

        const { addToDate } = date
        const newDate = addToDate(new Date(), { days: 90 })

        return (

          d >= date.formatDate(start_date.value, 'YYYY/MM/DD') &&
          d >= date.formatDate(new Date(), 'YYYY/MM/DD') &&
          d <= date.formatDate(newDate, 'YYYY/MM/DD')
        )
      },
      optionsFnTime2(hr, min, sec) {
        const dateHr = date.formatDate(start_date.value, 'HH')
        const dateMin = date.formatDate(start_date.value, 'mm')
        if (
          date.isSameDate(
            date.formatDate(start_date.value, 'YYYY/MM/DD'),
            date.formatDate(end_date.value, 'YYYY/MM/DD')
          )
        ) {
          if (hr < dateHr) {
            return false
          }
          if (hr == dateHr && min !== null && min <= dateMin) {
            return false
          }
        }
        return true
      },
      scrollhere(ele) {
        // var x = window.scrollX, y = window.scrollY;
        // ele.focus();
        // window.scrollTo(x, y);
        ele.target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      },
      showCoverImage: computed(() => {
        if (typeof cover_image.value == 'object') {
          // console.log(cover_image);
          return getServerImageUrl(cover_image.value.image)
        } else if (typeof cover_image.value == 'string') {
          return cover_image.value
        } else {
          return null
        }
      }),
    }
  },
  async created() {
    if (this.slug) {
      this.isEdit = true
      await api.get(`/event/${this.slug}`).then((res) => {
        if (res.success) {
          const languages = this.store.getters['master/getLanguages']
          this.store.commit('home/setEvent', res.data)
          const data = res.data
          this.cover_image = this.store.getters['home/getCoverImage']

          this.slider_images =
            this.store.getters['home/getEditGalleryImages'] ?? []
          console.log(this.slider_images);
          this.editId = data.id
          this.formData.name = data.name
          this.formData.event_type = data.event_type
          this.formData.description = data.description
          this.formData.online_event_link = data.online_event_link
          this.formData.offline_event_address = data.offline_event_address
          if (data.city_id && data.city) {
            this.formData.city_id = data.city.id
            this.formData.cityShow = data.city.name
          }
          this.formData.event_language = data.event_language
          this.formData.event_language_show = languages.find(
            (it) => it.id == data.event_language
          )?.name
          this.formData.about_host = data.about_host
          this.formData.terms_condition = data.terms_condition
          this.formData.start_date = DateTime.fromISO(data.start_date).toUTC().toFormat(
            'yyyy-MM-dd HH:mm:ss'
          )
          this.formData.end_date = DateTime.fromISO(data.end_date).toUTC().toFormat(
            'yyyy-MM-dd HH:mm:ss'
          )
          this.formData.status = data.status
        }
      })
    }
  },

   mounted() {
    if (!this.slug) {
         this.$refs.refName.focus()
      // this.activeClass
      // this.$refs.refDesc.foucs()
      // this.$refs.refName.focus()
      // this.$refs.message.focus();
        //  this.$refs.refName.focus()
      // setTimeout(() => {
      // }, 200);
            // this.$refs.pageheight.clientHeight
    } else {
      return false
    }
   },

  methods: {
    selected(){
      // alert(this.end_date_show)
      if(this.end_date_show !== undefined){
        this.isDisableEnd = false
      }
      if(this.start_date_show !== undefined){
        this.isDisableStart = false
      }
    },
    showSliderImage(img) {
      if (typeof img == 'object') {
        return getServerImageUrl(img.image)
      } else if (typeof img == 'string') {
        return img
      } else {
        return null
      }
    },
    nextStep() {
      this.$refs.stepper.next()
    },
    previosStep() {
      if (this.step == 1) {
        this.$q
        .dialog({
          title: 'Confirm',
          message: `Are you sure you want to exit? All content will be lost`,
          color: 'negative',
          ok: `Yes, I'm sure`,
          cancel: 'Cancel',
          default: 'cancel',
        })
        .onOk(() => {
          this.$router.push({ name: 'user-home' })
        })
        
      } else {
        this.$refs.stepper.previous()
      }
    },
    validateForms() {
      if (this.$refs.stepOne) {
        // Validate form Step 1 and save data using axios
        if (this.cover_image == '') {
          this.imgErr = 'Please add a Cover-Image'
          return false
        } else {
          this.imgErr = ''
        }
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
    async submitForm() {
      this.submitting = true
      const formData = new FormData()
      if (!this.isEdit) {
        if (this.isBase64(this.cover_image)) {
          const response = await fetch(this.cover_image)
          const blob = await response.blob()
          formData.append('images[0]', blob, this.cover_image) // Convert base64
        } else {
          formData.append('images[0]', this.cover_image)
        }
        for (let index = 0; index < this.slider_images.length; index++) {
          const img = this.slider_images[index]
          if (this.isBase64(this.cover_image)) {
            const response = await fetch(img)
            const blob = await response.blob()
            formData.append(`images[${index + 1}]`, blob, img) // Convert base64
          } else {
            formData.append(`images[${index + 1}]`, img)
          }
        }
      }
      for (const [key, value] of Object.entries(this.formData)) {
        formData.append(key, value)
      }
      if (this.formData.event_type == 'Online') {
        formData.delete('offline_event_address')
        formData.delete('city_id')
        formData.delete('cityShow')
      } else if (this.formData.event_type == 'Offline') {
        formData.delete('online_event_link')
      }
      if (this.isEdit) {
        api
          .put(`/event/${this.editId}/update`, formData)
          .then((result) => {
            if (result.success) {
              // Notify.success(this.$q.lang.general.messages.success);
              this.open('thank-submit', 'Your Event is now under review !')
              // this.$router.push({ name: 'user-home' })
            } else {
              Notify.error(result.message)
            }
            this.submitting = false
          })
          .catch((err) => {
            this.submitting = false
            console.log(err)
          })
      } else {
        api
          .post('/event/create', formData)
          .then((result) => {
            if (result.success) {
              // Notify.success(this.$q.lang.general.messages.success);
              this.open('thank-submit', 'Your Event is now under review !')
              // this.$router.push({ name: 'user-home' })
            } else {
              Notify.error(result.message)
            }
            this.submitting = false
            // console.log("result", result);
          })
          .catch((err) => {
            this.submitting = false
            console.log(err)
          })
      }
    },
    setFieldNull(fieldName) {

      const value = this[`${fieldName}`]
      if (this.isEdit && !isBase64(value)) {
        this.deleteImage(value)
        // console.log(value)
      }
      this[`${fieldName}`] = ''
    },
    setValue(data) {
      this.allpopup = false
      if (data.field.startsWith('step')) {
        const index = parseInt(data.field.split('.')[1])
        this.steps[index].image = data.value
      } else if (data.field == 'slider_images') {
        this.uploadImage(data.value, 0)
        // const img = this.isEdit ?  : data.value
        // this.slider_images.push(img)
      } else if (data.field == 'cover_image') {
        this.uploadImage(data.value, 1)
        // const img = this.isEdit ?  : data.value
        // console.log(img)
        // this.cover_image = img
      } else {
        // console.log(data.value);
        this.formData[`${data.field}`] = data.value
      }
    },
    removeSliderItem(index) {
    //  this.slider_images.splice(index,1)
      if (this.isEdit && !isBase64(this.slider_images[index])) {
        if (this.deleteImage(this.slider_images[index])) {
          this.slider_images = this.removeItem(this.slider_images, index)
        }
      }
    },
    async deleteImage(value) {
      console.log(value?.id)
      const DELETE_IMAGE = '/event/image/delete'
      await api
        .delete(DELETE_IMAGE, {
          event_id: this.editId,
          image_id: value.id, // get image id to delete
        })
        .then((result) => {
          // console.log("result", result);
          if (result.success) {
            Notify.success(this.$q.lang.general.messages.success)
            return true
          } else {
            Notify.error(result.message)
            return false
          }
        })
        .catch((err) => {
          this.submitting = false
          console.log(err)
          return false
        })
    },
    uploadImage(data, isCover = 0) {
      return new Promise(async (resolve, reject) => {
        if (this.isEdit && isBase64(data)) {
          const formData = new FormData()
          formData.append('event_id', this.editId)
          formData.append('is_cover_page', isCover)
          const response = await fetch(data)
          const blob = await response.blob()
          formData.append('image', blob, data) // Convert base64
          const UPLOAD_IMAGE = '/event/image/upload'
          api
            .post(UPLOAD_IMAGE, formData)
            .then((result) => {
              if (result.success) {
                if (isCover) {
                  this.cover_image = result.data
                } else {
                  this.slider_images.push(result.data)
                }
                resolve(result.data)
              } else {
                Notify.error(result.message)
                reject(false)
              }
              console.log('result', result)
            })
            .catch((err) => {
              this.submitting = false
              console.log(err)
              reject(err)
            })
        } else {
          if (isCover) {
            this.cover_image = data
          } else {
            this.slider_images.push(data)
          }
          resolve(data)
        }
      })
    },
  },
})
</script>
<style lang="scss">
// $
@import '../../css/page/host-event.scss';
.q-form-height{
  height: 1000px !important;
}
</style>
