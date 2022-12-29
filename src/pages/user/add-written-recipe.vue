<template>
  <q-page class="add-recipes">
    <!-- start show steps count  -->
    <div class="form-head fixed-top st1">
      <div class="bsp-top">
        <h5>
          <span @click="previosStep()"><i class="fas fa-arrow-left"></i></span>
          {{ $q.lang.addRecipes[step].title }}
        </h5>
        <router-link @click="open('save-draft', savedraft)" to="">{{
          $q.lang.label.close
        }}</router-link>
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
      <q-step name="stepOne" :done="done1" :error="stateform1">
        <div class="form-md">
          <q-form ref="formStep1">
            <div class="row q-col-gutter-x-lg">
              <div class="col-12 form-group q-pt-md">
                <div class="row items-start cus-uplode">
                  <div v-if="uploadoption">
                    <div class="img-control">
                      <q-btn
                        icon="las la-trash"
                        title="Remove"
                        @click="setFieldNull('uploadoption')"
                      />
                    </div>
                    <q-img
                      class="q-mr-md"
                      :src="uploadoption"
                      width="100"
                      height="100"
                      alt="image"
                    />
                  </div>

                  <div
                    v-else
                    class="upload-option"
                    @click="open('upload-option', uploadoption, 'uploadoption')"
                  >
                    <div class="icon">
                      <i class="las la-camera-retro"></i>
                      <span>{{
                        $q.lang.addRecipes.stepOne.fields.photo.label
                      }}</span>
                    </div>
                  </div>
                </div>
                <span class="ch-limit q-pt-sm">{{
                  $q.lang.addRecipes.stepOne.fields.photo.maxSize
                }}</span>
              </div>
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
                    (val) =>
                      max(
                        val,
                        250,
                        $q.lang.addRecipes.stepOne.fields.recipeName.label
                      ),
                  ]"
                />
                <span class="ch-limit">0/250 characters</span>
              </div>
              <div class="col-12 form-group">
                <div
                  class="select-cus"
                  @click="
                    open(
                      'hashtag-selector',
                      hashtags,
                      'hashtags',
                      'hashtags_show'
                    )
                  "
                >
                  <q-input
                    v-model="hashtags"
                    :label="$q.lang.addRecipes.stepOne.fields.hashtags.label"
                  />
                  <q-icon name="expand_more" />
                </div>
              </div>
              <div class="col-6 form-group">
                <div
                  class="select-cus"
                  @click="
                    open(
                      'portion-quantity',
                      portion_quantity,
                      'portion_quantity'
                    )
                  "
                >
                  <q-input
                    v-model="portion_quantity"
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
                  @click="open('portion-type', portion_type, 'portion_type')"
                >
                  <q-input
                    v-model="portion_type"
                    :label="$q.lang.addRecipes.stepOne.fields.portionType.label"
                  />
                  <q-icon name="expand_more" />
                </div>
              </div>
              <div class="col-12 form-group">
                <div
                  class="select-cus"
                  @click="
                    open(
                      'diet-category',
                      diet_category,
                      'diet_category',
                      'diet_category_show'
                    )
                  "
                >
                  <q-input
                    readonly
                    v-model="diet_category_show"
                    :label="
                      $q.lang.addRecipes.stepOne.fields.dietCategory.label
                    "
                  />
                  <q-icon name="expand_more" />
                </div>
              </div>
              <div class="col-12 form-group">
                <div
                  class="select-cus"
                  @click="
                    open('dish-type', dishType, 'dishType', 'dishType_show')
                  "
                >
                  <q-input
                    v-model="dishType_show"
                    :label="$q.lang.addRecipes.stepOne.fields.dishType.label"
                  />
                  <q-icon name="expand_more" />
                </div>
              </div>
              <div class="col-12 form-group">
                <div
                  class="select-cus"
                  @click="
                    open(
                      'cuisine-type',
                      cuisinetype,
                      'cuisinetype',
                      'cuisinetype_show'
                    )
                  "
                >
                  <q-input
                    v-model="cuisinetype_show"
                    :label="$q.lang.addRecipes.stepOne.fields.cuisineType.label"
                  />
                  <q-icon name="expand_more" />
                </div>
              </div>
            </div>
            <div class="row q-col-gutter-x-lg" v-if="!toggleswitch">
              <div class="col-12 form-group">
                <div
                  class="select-cus"
                  @click="
                    open(
                      'time-selector',
                      totalPreTime,
                      'totalPreTime',
                      'totalPreTime_show'
                    )
                  "
                >
                  <q-input
                    v-model="totalPreTime_show"
                    :label="$q.lang.addRecipes.stepOne.fields.totaltime.label"
                  />
                  <q-icon name="expand_more" />
                </div>
              </div>
            </div>
            <div class="or-separator" v-if="!toggleswitch">
              <span>Or</span>
            </div>
            <div class="row q-col-gutter-x-lg">
              <div class="col-12 form-group">
                <div class="switch-cus">
                  <q-toggle
                    v-model="toggleswitch"
                    :label="$q.lang.addRecipes.stepOne.fields.toggleWith"
                    color="green"
                    left-label
                  />
                </div>
              </div>
            </div>
            <div class="row q-col-gutter-x-lg">
              <div v-if="toggleswitch" class="col-12 form-group">
                <div
                  class="select-cus"
                  @click="
                    open(
                      'time-selector',
                      cookingTime,
                      'cookingTime',
                      'cookingTime_show'
                    )
                  "
                >
                  <q-input
                    v-model="cookingTime_show"
                    :label="$q.lang.addRecipes.stepOne.fields.cookingTime.label"
                  />
                  <q-icon name="expand_more" />
                </div>
              </div>
              <div v-if="toggleswitch" class="col-12 form-group">
                <div
                  class="select-cus"
                  @click="
                    open(
                      'time-selector',
                      bakingTime,
                      'bakingTime',
                      'bakingTime_show'
                    )
                  "
                >
                  <q-input
                    v-model="bakingTime_show"
                    :label="$q.lang.addRecipes.stepOne.fields.bakingTime.label"
                  />
                  <q-icon name="expand_more" />
                </div>
              </div>
              <div v-if="toggleswitch" class="col-12 form-group">
                <div
                  class="select-cus"
                  @click="
                    open(
                      'time-selector',
                      restingTime,
                      'restingTime',
                      'restingTime_show'
                    )
                  "
                >
                  <q-input
                    v-model="restingTime_show"
                    :label="$q.lang.addRecipes.stepOne.fields.restingTime.label"
                  />
                  <q-icon name="expand_more" />
                </div>
              </div>
              <div class="col-12 form-group">
                <div class="total-time">
                  <P>Total Preparation time for this recipe is</P>
                  <p>
                    <b>{{ totalMinutesInNumber }} min</b>
                  </p>
                </div>
              </div>
            </div>
          </q-form>
        </div>
      </q-step>

      <q-step name="stepTwo" :done="done2" :error="stateform2">
        <div class="form-md">
          <q-form>
            <div class="col-12 form-group">
              <div class="st-tag q-pt-sm q-pb-md">
                <span class="error">*</span><b>3 ingredients</b> were auto-added
                from the description. Please tap below on ingredient to view and
                add quantity.
              </div>
              <div class="add-ing-box">
                <div class="form-group border-bottom1">
                  <div class="row q-col-gutter-x-md items-center">
                    <div class="col-3">
                      <label>
                        <b>{{
                          $q.lang.addRecipes.stepTwo.fields.ingredient.quantity
                        }}</b>
                      </label>
                    </div>
                    <div class="col-3">
                      <label>
                        <b>{{
                          $q.lang.addRecipes.stepTwo.fields.ingredient.unit
                        }}</b>
                      </label>
                    </div>
                    <div class="col-5">
                      <label>
                        <b>{{
                          $q.lang.addRecipes.stepTwo.fields.ingredient
                            .ingredient
                        }}</b>
                      </label>
                    </div>
                    <div class="col-1 controll-icon"></div>
                  </div>
                </div>
                <div
                  class="form-group border-bottom1"
                  v-for="(item, index) in ingredients"
                  :key="index"
                >
                  <div class="row q-col-gutter-x-md items-center">
                    <div class="col-3">
                      <div
                        class="select-cus"
                        @click="open('portion-quantity', portionQuantity)"
                      >
                        <q-input
                          class="label-none"
                          v-model="item.quantity"
                          :label="
                            $q.lang.addRecipes.stepTwo.fields.addQuantity.label
                          "
                        />
                        <q-icon name="expand_more" />
                      </div>
                    </div>
                    <div class="col-3">
                      <div
                        class="select-cus"
                        @click="open('qty-unit', quantityUnit)"
                      >
                        <q-input
                          class="label-none"
                          v-model="item.unit"
                          :label="
                            $q.lang.addRecipes.stepTwo.fields.addUnit.label
                          "
                        />
                        <q-icon name="expand_more" />
                      </div>
                    </div>
                    <div class="col-5">
                      <div class="ing-name">
                        {{ item.ingredient }}
                      </div>
                    </div>
                    <div class="col-1 controll-icon" @click="removeItem(index)">
                      <span class="material-icons">remove_circle</span>
                    </div>
                  </div>
                </div>
              </div>

              <q-btn
                class="btn btn2 full-width q-mt-md"
                icon="add"
                label="add ingredients"
                @click="open('add-ingredient', ingredients)"
              />
            </div>
            <div class="add-ing-box">
              <div class="st-tag q-pt-sm q-pb-md">
                <span class="error">*</span><b>1 utensil</b> were auto-added
                from the description.
              </div>
              <div
                class="form-group border-bottom1"
                v-for="(item, index) in utensils"
                :key="index"
              >
                <div class="row q-col-gutter-x-md items-center">
                  <div class="col-10">
                    <div class="ing-name">
                      {{ item.utensil }}
                    </div>
                  </div>
                  <div class="col-2 controll-icon">
                    <span class="material-icons">remove_circle</span>
                  </div>
                </div>
              </div>
              <div class="form-group border-bottom1">
                <div class="row q-col-gutter-x-md items-center">
                  <div class="col-10">
                    <q-input
                      class="label-none"
                      v-model="name"
                      :label="$q.lang.addRecipes.stepTwo.fields.utensil.label"
                    />
                  </div>
                  <div class="col-2 controll-icon">
                    <span class="material-icons">remove_circle</span>
                  </div>
                </div>
              </div>
              <div class="row q-col-gutter-x-lg">
                <div class="col-12 q-mt-md">
                  <q-btn
                    class="btn btn2 full-width"
                    icon="add"
                    label="add utensils"
                    @click="open('add-utensil', utensils)"
                  />
                </div>
              </div>
            </div>
            <div class="add-ing-box">
              <div class="st-tag q-pt-md">
                were auto-added from the description. Please tap below on
                ingredient to view and add quantity.
              </div>
              <div class="row q-col-gutter-x-lg">
                <div class="col-12 q-mt-md">
                  <q-btn
                    class="btn btn2 full-width"
                    icon="add"
                    label="add brand for ingredients"
                    @click="open('add-brand', brands)"
                  />
                </div>
              </div>
            </div>
          </q-form>
        </div>
      </q-step>

      <q-step name="stepThree" :done="done3" :error="stateform3">
        <div class="form-md">
          <q-form ref="formStep4">
            <div class="row">
              <div class="col-12 form-group">
                <div class="switch-cus">
                  <q-toggle
                    v-model="toggleswitch"
                    label="If you have full video upload video recipes."
                    color="green"
                    left-label
                  />
                </div>
              </div>
              <div class="col-12 form-group">
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
                <q-input
                  v-model="name"
                  type="textarea"
                  :label="
                    $q.lang.addRecipes.stepThree.fields.fullVideoDes.label
                  "
                  :placeholder="
                    $q.lang.addRecipes.stepThree.fields.fullVideoDes.placeHolder
                  "
                />
                <span class="ch-limit">0/500 characters</span>
              </div>
              <div class="written-rcp-opt col-12 form-group">
                <h6>If you have written recipes add steps</h6>
                <div class="step-list">
                  <ul>
                    <li class="step-list-box">
                      <h5>
                        <span class="step-no">Step 1</span>
                        <span class="step-delet"
                          ><i class="las la-trash"></i>
                          <i class="las la-arrows-alt"></i
                        ></span>
                      </h5>
                      <div class="panel-body">
                        <div class="step-list-dis">
                          <div class="step-img">
                            <!-- <q-img src="../../assets/fd1.jpg"></q-img> -->
                            <div
                              class="upload-option"
                              @click="open('upload-option', uploadoption)"
                            >
                              <div class="icon">
                                <i class="las la-camera-retro"></i>
                              </div>
                            </div>
                          </div>
                          <div class="step-dis">
                            <q-input
                              v-model="StepDes"
                              type="textarea"
                              :label="
                                $q.lang.addRecipes.stepThree.fields.StepDes
                                  .label
                              "
                              :placeholder="
                                $q.lang.addRecipes.stepThree.fields.StepDes
                                  .placeHolder
                              "
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="step-list-box">
                      <h5>
                        <span class="step-no">Step 2</span>
                        <span class="step-delet"
                          ><i class="las la-trash"></i>
                          <i class="las la-arrows-alt"></i
                        ></span>
                      </h5>
                      <div class="panel-body">
                        <div class="step-list-dis">
                          <div class="step-img">
                            <!-- <q-img src="../../assets/fd1.jpg"></q-img> -->
                            <div
                              class="upload-option"
                              @click="open('upload-option', uploadoption)"
                            >
                              <div class="icon">
                                <i class="las la-camera-retro"></i>
                              </div>
                            </div>
                          </div>
                          <div class="step-dis">
                            <q-input
                              v-model="StepDes"
                              type="textarea"
                              :label="
                                $q.lang.addRecipes.stepThree.fields.StepDes
                                  .label
                              "
                              :placeholder="
                                $q.lang.addRecipes.stepThree.fields.StepDes
                                  .placeHolder
                              "
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="">
                  <q-btn
                    class="btn btn2 full-width"
                    icon="add"
                    label="add new step"
                  />
                </div>
              </div>
            </div>
          </q-form>
        </div>
      </q-step>
      <!-- <q-step
        name="stepThree"
        :done="done4"
        :error="stateform4"
      >
        123
      </q-step> -->
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
              :label="step === 3 ? 'Submit' : 'Next'"
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
        :sendDisplayField="sendDisplayField"
        v-on:selectValue="setValue"
      ></component>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineAsyncComponent, ref } from 'vue'
import { mapGetters } from 'vuex'
import { useQuasar } from 'quasar'
import useDialog from 'src/composable/useDialog'
export default {
  name: 'AddWrittenRecipes',
  components: {
    'portion-quantity': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "PortionQuantity" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/portion-quantity.vue'
      )
    ),
    'portion-type': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "PortionType" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/portion-type.vue'
      )
    ),
    'diet-category': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "DietCategory" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/diet-category.vue'
      )
    ),
    'time-selector': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "TimeSelector" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/time-selector.vue'
      )
    ),
    'add-rcp-step': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "AddRcpStep" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/all-upload/add-rcp-step.vue'
      )
    ),
    'upload-option': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "UploadOption" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/all-upload/upload-option.vue'
      )
    ),
    'dish-type': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "DishType" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/all-upload/dish-type.vue'
      )
    ),
    'cuisine-type': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "CuisineType" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/all-upload/cuisine-type.vue'
      )
    ),
    'hashtag-selector': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "HashtagSelector" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/all-upload/hashtag-selector.vue'
      )
    ),
    'save-draft': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "SaveDraft" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/all-upload/save-draft.vue'
      )
    ),
    'qty-unit': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "QtyUnit" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/qty-unit.vue'
      )
    ),
    'search-ingredient': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "SearchIngredient" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/all-upload/search-ingredient.vue'
      )
    ),
    'edit-delete': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "EditDelete" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/all-upload/edit-delete.vue'
      )
    ),
    'add-ingredient': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "AddIngredient" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/all-upload/add-ingredient.vue'
      )
    ),
    'add-utensil': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "AddUtensil" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/all-upload/add-utensil.vue'
      )
    ),
    'add-brand': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "AddBrand" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/all-upload/add-brand.vue'
      )
    ),
    'final-note': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "FinalNote" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/common/all-upload/final-note.vue'
      )
    ),
  },
  setup() {
    const $q = useQuasar()
    const { allpopup, currentFrom, currentField, dialogClass, open } =
      useDialog()
    const step = ref('stepOne')

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
    const totalSteps = 3
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
      currentFrom,
      currentField,
      dialogClass,
      open,
      addrcpw,

      totalSteps,
      locdialog,
      tcdialog,

      sendValue: ref(null),
      sendDisplayField: ref(null),
      dense: ref(false),

      // Step 1 Fields
      name: ref(null),
      portion_quantity: ref(null),
      portion_type: ref(null),
      diet_category: ref(null),
      diet_category_show: ref(null),
      uploadoption: ref(null),

      // Step 2 Fields
      totalPreTime: ref(null),
      totalPreTime_show: ref(null),

      toggleswitch: ref(false),
      cookingTime: ref(null),
      cookingTime_show: ref(null),
      bakingTime: ref(null),
      bakingTime_show: ref(null),
      restingTime: ref(null),
      restingTime_show: ref(null),

      dishcategory: ref(null),
      dishType: ref(null),
      dishType_show: ref(null),
      cuisinetype: ref(null),
      cuisinetype_show: ref(null),

      ingredients: ref([]),
      utensils: ref([]),
    }
  },
  computed: {
    ...mapGetters({
      categories: 'master/getCategories',
    }),
    totalMinutesInNumber() {
      if (!this.toggleswitch && this.totalPreTime !== null) {
        return (
          this.totalPreTime.split(',')[0] * 60 +
          parseInt(this.totalPreTime.split(',')[1])
        )
      } else if (
        (this.toggleswitch && this.cookingTime !== null) ||
        this.bakingTime !== null ||
        this.restingTime !== null
      ) {
        // return this.cookingTime + this.bakingTime + this.restingTime
        let total = 0
        total +=
          this.cookingTime !== null
            ? this.cookingTime.split(',')[0] * 60 +
              parseInt(this.cookingTime.split(',')[1])
            : 0
        total +=
          this.bakingTime !== null
            ? this.bakingTime.split(',')[0] * 60 +
              parseInt(this.bakingTime.split(',')[1])
            : 0
        total +=
          this.restingTime !== null
            ? this.restingTime.split(',')[0] * 60 +
              parseInt(this.restingTime.split(',')[1])
            : 0

        return total
        // return this.cookingTime.split(',')[0] * 60 + parseInt(this.cookingTime.split(',')[1]) + this.bakingTime.split(',')[0] * 60 + parseInt(this.bakingTime.split(',')[1]) + this.restingTime.split(',')[0] * 60 + parseInt(this.restingTime.split(',')[1])
      } else {
        return 0
      }
    },
  },
  methods: {
    setFieldNull(fieldName) {
      this[`${fieldName}`] = null
    },
    setValue(data) {
      console.log(data)
      this.allpopup = false
      this[`${data.field}`] = data.value
    },
    nextStep() {
      this.$refs.stepper.next()
    },
    previosStep() {
      if (this.step !== 'stepOne') {
        this.$refs.stepper.previous()
      } else {
        this.$router.push({ name: 'home' })
      }
    },
    validateForms() {
      this.nextStep()
      let success = true
      if (this.$refs.formStep4) {
        this.open('final-note', this.finalNote)
      }
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
