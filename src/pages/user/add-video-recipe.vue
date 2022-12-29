<template>
  <q-page class="add-recipes">
    <!-- start show steps count  -->
    <div class="form-head fixed-top st1">
      <div class="bsp-top">
        <h5>
          <span @click="previosStep()"><i class="fas fa-arrow-left"></i></span>
          Recipe Card
        </h5>
      </div>
    </div>
    <!-- ends show steps count  -->

    <q-stepper
      class="no-shadow add-recipe-step"
      v-model="step"
      ref="stepper"
      color="primary"
      animated
    >
      <q-step :name="1" :done="done1" :error="stateform1">
        <div class="form-md">
          <q-form ref="formStep1">
            <div class="row q-col-gutter-x-lg">
              <div class="col-12 form-group">
                <q-input
                  v-model="name"
                  :label="$q.lang.addRecipes.stepOne.fields.recipeName.label"
                  :placeholder="
                    $q.lang.addRecipes.stepOne.fields.recipeName.placeHolder
                  "
                  :rules="[
                    (val) =>
                      required(
                        val,
                        $q.lang.addRecipes.stepOne.fields.recipeName.label
                      ),
                  ]"
                />
                <span class="ch-limit">0/500 characters</span>
              </div>
              <div class="col-6 form-group">
                <div
                  class="select-cus"
                  @click="open('portion-quantity', portionQuantity)"
                >
                  <q-input
                    v-model="portionQuantity"
                    :label="
                      $q.lang.addRecipes.stepOne.fields.portionQuantity.label
                    "
                  />
                  <q-icon name="expand_more" />
                </div>
              </div>
              <div class="col-6 form-group">
                <div
                  class="select-cus"
                  @click="open('portion-type', portionType)"
                >
                  <q-input
                    v-model="portionType"
                    :label="$q.lang.addRecipes.stepOne.fields.portionType.label"
                  />
                  <q-icon name="expand_more" />
                </div>
              </div>
              <div class="col-12 form-group">
                <div
                  class="select-cus"
                  @click="open('diet-category', dietCategory)"
                >
                  <q-input
                    v-model="dietCategory"
                    :label="
                      $q.lang.addRecipes.stepOne.fields.dietCategory.label
                    "
                  />
                  <q-icon name="expand_more" />
                </div>
              </div>
              <div class="col-12 form-group q-pt-md">
                <div class="row items-start cus-uplode">
                  <div
                    class="upload-option"
                    @click="open('upload-option', uploadoption)"
                  >
                    <div class="icon">
                      <i class="las la-camera-retro"></i>
                      <span>Add Video Cover Photo</span>
                    </div>
                  </div>
                </div>
                <span class="ch-limit q-pt-sm">Max.imgage size:00x00</span>
              </div>
            </div>
          </q-form>
        </div>
      </q-step>

      <q-step :name="2" :done="done2" :error="stateform2">
        <div class="form-md">
          <q-form>
            <div class="row q-col-gutter-x-lg">
              <div class="col-12 form-group q-pt-md">
                <div class="row items-start cus-uplode">
                  <div
                    class="upload-option"
                    @click="open('upload-option', uploadoption)"
                  >
                    <div class="icon">
                      <i class="las la-camera-retro"></i>
                      <span>Add Full Video</span>
                    </div>
                  </div>
                </div>
                <span class="ch-limit q-pt-sm">Max.video size:00x00</span>
              </div>

              <div class="col-12 form-group">
                <div
                  class="select-cus"
                  @click="open('time-selector', totalPreTime)"
                >
                  <q-input
                    v-model="totalPreTime"
                    :label="$q.lang.addRecipes.stepTwo.fields.totaltime.label"
                  />
                  <q-icon name="expand_more" />
                </div>
              </div>
            </div>
            <div class="or-separator">
              <span>Or</span>
            </div>
            <div class="row q-col-gutter-x-lg">
              <div class="col-12 form-group">
                <div class="switch-cus">
                  <q-toggle
                    v-model="toggleswitch"
                    label="I have cooking time, baking time and resting time separately."
                    color="green"
                    left-label
                  />
                </div>
              </div>
            </div>
            <div class="row q-col-gutter-x-lg">
              <div class="col-12 form-group">
                <div
                  class="select-cus"
                  @click="open('time-selector', totalPreTime)"
                >
                  <q-input
                    v-model="totalPreTime"
                    :label="$q.lang.addRecipes.stepTwo.fields.cookingTime.label"
                  />
                  <q-icon name="expand_more" />
                </div>
              </div>
              <div class="col-12 form-group">
                <div
                  class="select-cus"
                  @click="open('time-selector', totalPreTime)"
                >
                  <q-input
                    v-model="totalPreTime"
                    :label="$q.lang.addRecipes.stepTwo.fields.bakingTime.label"
                  />
                  <q-icon name="expand_more" />
                </div>
              </div>
              <div class="col-12 form-group">
                <div
                  class="select-cus"
                  @click="open('time-selector', totalPreTime)"
                >
                  <q-input
                    v-model="totalPreTime"
                    :label="$q.lang.addRecipes.stepTwo.fields.restingTime.label"
                  />
                  <q-icon name="expand_more" />
                </div>
              </div>
              <div class="col-12 form-group">
                <div class="total-time">
                  <P>Toal Preparation time for this recipe is</P>
                  <p><b>50 min</b></p>
                </div>
              </div>
            </div>
          </q-form>
        </div>
      </q-step>

      <q-step :name="3" :done="done3" :error="stateform3">
        <div class="form-md">
          <q-form ref="formStep3">
            <div class="row q-col-gutter-x-lg">
              <div class="col-12 form-group">
                <q-input
                  v-model="name"
                  type="textarea"
                  :label="$q.lang.addRecipes.stepfour.fields.shortDis.label"
                  :placeholder="
                    $q.lang.addRecipes.stepfour.fields.shortDis.placeHolder
                  "
                />
              </div>
              <div class="col-12 form-group q-pt-md">
                <div class="st-tag q-pt-sm q-pb-sm">
                  <span class="error">*</span><b>3 ingredients</b> were
                  auto-added from the description. Please tap below on
                  ingredient to view and add quantity.
                </div>
                <q-btn
                  class="btn btn2 full-width"
                  icon="add"
                  label="add ingredients"
                  @click="open('add-ingredient', ingredient)"
                />
              </div>
              <div class="col-12 form-group">
                <div class="st-tag q-pt-sm q-pb-sm">
                  <span class="error">*</span><b>1 utensil</b> were auto-added
                  from the description.
                </div>
                <q-btn
                  class="btn btn2 full-width"
                  icon="add"
                  label="add utensils"
                  @click="open('add-utensil', utensil)"
                />
              </div>
            </div>
          </q-form>
        </div>
      </q-step>
      <q-step :name="4" :done="done4" :error="stateform4">
        <div class="form-md q-pa-lg">
          <q-form ref="formStep4">
            <div class="row q-col-gutter-x-lg">
              <div class="col-12 form-group">
                <div class="select-cus" @click="open('dish-type', dishType)">
                  <q-input
                    v-model="dishType"
                    :label="$q.lang.addRecipes.stepfour.fields.dishType.label"
                  />
                  <q-icon name="expand_more" />
                </div>
              </div>
              <div class="col-12 form-group">
                <div
                  class="select-cus"
                  @click="open('cusine-type', cuisineType)"
                >
                  <q-input
                    v-model="cuisineType"
                    :label="
                      $q.lang.addRecipes.stepfour.fields.cuisineType.label
                    "
                  />
                  <q-icon name="expand_more" />
                </div>
              </div>
              <div class="col-12 form-group">
                <q-input
                  v-model="name"
                  :label="$q.lang.addRecipes.stepfour.fields.finalNote.label"
                  :placeholder="
                    $q.lang.addRecipes.stepfour.fields.finalNote.placeHolder
                  "
                />
                <span class="ch-limit">0/500 characters</span>
              </div>
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
            <div class="row q-col-gutter-x-lg">

            </div>
          </q-form>
        </div>
      </q-step> -->

      <!-- Start Next and Submit Button using slots -->
      <template v-slot:navigation>
        <div class="fixed-bottom add-rcp-btm box-shadow-cus">
          <q-stepper-navigation>
            <q-btn @click="previosStep()" class="btn btn2" label="Back" />
            <q-btn
              @click="validateForms()"
              class="btn btn4 float-right"
              :label="step === 4 ? 'Submit' : 'Next'"
            />
            <!-- <q-btn v-if="step == 5" @click="$router.push('thank-apply')" class="btn full-width btn4" :label="step === 5 ? 'Submit' : 'Next'" /> -->
          </q-stepper-navigation>
        </div>
      </template>
      <!-- End Next and Submit Button using slots -->
    </q-stepper>

    <q-dialog v-model="allpopup" position="bottom" :class="dialogClass">
      <component
        :is="currentFrom"
        :sendValue="sendValue"
        :fieldName="currentField"
        v-on:selectValue="setValue"
      ></component>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref } from 'vue'
import { mapGetters } from 'vuex'
import { useQuasar } from 'quasar'

export default {
  name: 'AddVideoRecipes',
  components: {
    'portion-quantity': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "portion-quantity" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/portion-quantity.vue'
      )
    ),
    'portion-type': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "portion-type" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/portion-type.vue'
      )
    ),
    'diet-category': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "diet-category" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/diet-category.vue'
      )
    ),
    'time-selector': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "time-selector" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/time-selector.vue'
      )
    ),
    'add-rcp-step': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "add-rcp-step" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/all-upload/add-rcp-step.vue'
      )
    ),
    'upload-option': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "upload-option" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/all-upload/upload-option.vue'
      )
    ),
    'dish-type': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "dish-type" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/all-upload/dish-type.vue'
      )
    ),
    'cusine-type': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "cusine-type" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/all-upload/cuisine-type.vue'
      )
    ),
    'add-ingredient': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "add-ingredient" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/all-upload/add-ingredient.vue'
      )
    ),
    'add-utensil': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "add-utensil" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/all-upload/add-utensil.vue'
      )
    ),
    'qty-missing': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "qty-missing" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/all-upload/qty-missing.vue'
      )
    ),
    'upload-option': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "upload-option" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/all-upload/upload-option.vue'
      )
    ),
  },
  setup() {
    const $q = useQuasar()
    const allpopup = ref(false)
    const step = ref(3)

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
    const addrcpw = ref(false)
    const totalSteps = 4
    const $lang = $q.lang.seller.becomeSeller.form
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
      allpopup,
      addrcpw,

      totalSteps,
      locdialog,
      tcdialog,

      name: ref(null),
      username: ref(null),
      email: ref(null),
      countrycode: ref('+91'),
      phone: ref(null),
      otp: ref(null),
      currentFrom: ref(null),
      selectedCategory: ref([false]),
      socialLink: ref([null]),
      gstno: ref(null),
      fssailicense: ref(null),
      termscheck: ref(false),
      portionQuantity: ref(null),
      portionType: ref(null),
      dishcategory: ref(null),
      totalPreTime: ref(null),
      toggleswitch: ref(false),

      options: ['+91', '+1', '+6'],
      reset() {
        done1.value = false
        done2.value = false
        done3.value = false
        done4.value = false
        done5.value = false
        step.value = 1
      },
    }
  },
  data: () => ({
    addotherlink: [
      {
        label: 'Business website',
        placeholder: 'Business website link',
      },
      {
        label: 'Facebook',
        placeholder: 'Facebook link',
      },
      {
        label: 'Instagram',
        placeholder: 'Instagram link',
      },
      {
        label: 'LinkedIn',
        placeholder: 'Linkedin link',
      },
      {
        label: 'Youtube',
        placeholder: 'Youtube link',
      },
    ],
  }),
  created() {
    for (let i = 0; i <= this.categories.length; i++) {
      this.selectedCategory[i] = false
    }
    for (let i = 0; i <= this.categories.length; i++) {
      this.socialLink[i] = null
    }
  },
  computed: {
    ...mapGetters({
      categories: 'master/getCategories',
    }),
  },
  methods: {
    open(ele, val, fieldName) {
      this.allpopup = true
      this.currentFrom = ele
      this.currentField = fieldName
      this.sendValue = val

      if (ele == 'add-ingredient' || ele == 'add-utensil') {
        this.dialogClass = 'full-popup add-ing'
      } else if (ele == 'qty-missing') {
        this.dialogClass = 'center-popup'
      } else {
        this.dialogClass = ''
      }
    },
    setValue(data) {
      console.log(data)
      this.allpopup = false
      this[`${data.field}`] = data.value
    },
    addOtherlink() {
      this.addotherlink.push({
        label: 'Other Link',
        placeholder: 'Enter link',
      })
    },
    submit() {
      const data = {
        addotherlink: this.addotherlink,
      }
      // alert(JSON.stringify(data, null, 2))
    },
    nextStep() {
      console.log('form validated')
      this.$refs.stepper.next()
    },
    previosStep() {
      if (this.step > 1) {
        this.step = this.step - 1
      } else {
        this.$router.push({ name: 'home' })
      }
    },
    validateForms() {
      this.nextStep()
      let success = true
      // if (this.$refs.formStep1) { // Validate form Step 1 and save data using axios
      //   this.$refs.formStep1.validate().then(success => {
      //     if (success) {
      //       this.stateform1 = false;
      //       this.nextStep();
      //     }
      //     else {
      //       this.stateform1 = true;
      //     }
      //     return success;
      //   });
      // } else if (this.$refs.formStep2) {  // Validate form Step 2 and save data using axios with access token
      //   this.categoryCheckbox = this.selectedCategory.filter(item => item === true)

      //   if (this.categoryCheckbox.length > 0) {
      //     this.stateform2 = false;
      //     this.categoryError = false
      //     this.nextStep();
      //   }
      //   else {
      //     this.stateform2 = true;
      //     this.categoryError = true;
      //   }
      // } else if (this.$refs.formStep3) {  // Validate form Step 3 and save data using axios with access token
      //   this.$refs.formStep3.validate().then(success => {
      //     if (success) {
      //       this.stateform3 = false;
      //       this.nextStep();
      //     }
      //     else {
      //       this.stateform3 = true;
      //     }
      //   });
      // } else if (this.$refs.formStep4) {  // Validate form Step 4 and save data using axios with access token
      //   this.$refs.formStep4.validate().then(success => {
      //     if (success) {
      //       this.stateform4 = false;
      //       this.nextStep();
      //     }
      //     else {
      //       this.stateform4 = true;
      //     }
      //   });
      // } else if (this.$refs.formStep5) {  // Validate form Step 5 and save data using axios with access token
      //   this.$refs.formStep5.validate().then(success => {
      //     if (success) {
      //       this.stateform5 = false;
      //       this.$router.push({ 'name': 'thank-apply' })
      //     }
      //     else {
      //       this.stateform5 = true;
      //     }
      //   });
      // }
      return success
    },
  },
}
</script>

<style lang="scss">
// $
@import '../../css/page/add-recipes.scss';
</style>
