<template>
  <q-page v-if="loaded" class="recipe-detail recipe-form">
    <div class="common-head">
      <div class="ch-left">
        <span @click="previosStep()">
          <i class="fas fa-arrow-left"></i>
        </span>
        Add Recipe
      </div>
      <div class="ch-right">
        <a href="javascript:history.go(-1)">{{ $q.lang.label.close }}</a>
      </div>
    </div>
    <q-form ref="recipeForm" @submit="validate()">
      <div class="recipe-box">
        <div class="recipe-head">
          <user-head :user="user" />
        </div>
        <div class="recipe-title">
          <h5 v-show="!editName" @click="editName = true">
            {{ name ? name : 'Recipe Name' }}
            <i class="las la-pen"></i>
          </h5>
          <q-input
            v-if="editName"
            ref="refName"
            :autofocus="true"
            v-model="name"
            class="label-none"
            :label="$q.lang.addRecipes.stepOne.fields.recipeName.label"
            :placeholder="
              $q.lang.addRecipes.stepOne.fields.recipeName.placeHolder
            "
            :dense="dense"
            :rules="[(val) => required(val, 'name')]"
            @blur="editName = false"
          />
          <span v-if="clientError.name" id="clientError" class="error">
            {{ clientError.name }}</span
          >
        </div>
        <slot name="progress" />
        <div class="recipe-img">
          <div class="col-12 form-group">
            <div class="row items-start cus-uplode">
              <div v-if="cover_photo" class="img-after-upload">
                <div class="img-control">
                  <q-btn
                    icon="las la-trash"
                    title="Remove"
                    @click="setFieldNull('cover_photo')"
                  />
                </div>
                <q-img
                  class="q-mr-md upload-img"
                  :src="cover_photo"
                  alt="image"
                />
              </div>

              <div
                v-else
                class="upload-option"
                @click="open('upload-option', folderName, 'cover_photo')"
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
      </div>
      <div class="recipe-description">
        <h5>{{ $q.lang.addRecipes.stepOne.title }}</h5>
        <div class="rcp-des q-pb-md q-mt-md">
          <div class="row">
            <div class="col-12">
              <p class="detail-title">Recipe Description</p>
              <q-input v-model="desc" placeholder="Enter your text here" type="textarea" />
            </div>
          </div>
        </div>
        <div class="cat-qun q-pt-sm q-pb-lg">
          <div class="row q-col-gutter-x-lg">
            <div class="col-6">
              <div
                class="relative-position"
                @click="
                  open(
                    'diet-category',
                    diet_category,
                    'diet_category',
                    'diet_category_show'
                  )
                "
              >
                <p class="detail-title">
                  {{ $q.lang.addRecipes.stepOne.fields.dietCategory.label }}
                </p>
                <div class="absolute-right edit-option">
                  <i class="las la-pen"></i>
                </div>
              </div>
              <h6>{{ diet_category_show }}</h6>
              <span
                v-if="diet_category_show == null"
                id="clientError"
                class="error"
              >
                {{ clientError.diet_category_show }}</span
              >
            </div>
            <div class="col-6">
              <div
                class="relative-position"
                @click="
                  open(
                    'portion-quantity',
                    portion_quantity,
                    'portion_quantity',
                    'portion_quantity_show'
                  )
                "
              >
                <p class="detail-title">
                  {{ $q.lang.addRecipes.stepOne.fields.portionQuantity.label }}
                </p>
                <div class="absolute-right edit-option">
                  <i class="las la-pen"></i>
                </div>
              </div>
              <h6 v-if="portion_quantity[0]">{{ portion_quantity_show }}</h6>
              <span
                v-if="portion_quantity_show == null"
                id="clientError"
                class="error"
              >
                {{ clientError.portion_quantity_show }}</span
              >
            </div>
          </div>
        </div>

        <div class="recipe-time q-pb-lg">
          <div class="relative-position">
            <p class="detail-title">
              {{ $q.lang.addRecipes.stepOne.fields.recipePrepareTime }}
            </p>
          </div>
          <div class="prepar-box">
            <div class="box-cus">
              <div
                class="box-cus-effect"
                @click="
                  open(
                    'time-selector',
                    preparation_time,
                    'preparation_time',
                    'preparation_time_show'
                  )
                "
              >
                <p class="">
                  <span>{{ preparation_time_show }}</span> mins
                </p>
              </div>
              <p>
                {{ $q.lang.addRecipes.stepOne.fields.preParationTime.label }}
              </p>
            </div>
            <div class="box-cus">
              <div
                class="box-cus-effect"
                @click="
                  open(
                    'time-selector',
                    cookingTime,
                    'cookingTime',
                    'cookingTime_show'
                  )
                "
              >
                <p class="">
                  <span>{{ cookingTime_show }}</span> mins
                </p>
              </div>
              <p>{{ $q.lang.addRecipes.stepOne.fields.cookingTime.label }}</p>
            </div>
            <div class="box-cus">
              <div
                class="box-cus-effect"
                @click="
                  open(
                    'time-selector',
                    bakingTime,
                    'bakingTime',
                    'bakingTime_show'
                  )
                "
              >
                <p class="">
                  <span>{{ bakingTime_show }}</span> mins
                </p>
              </div>
              <p>{{ $q.lang.addRecipes.stepOne.fields.bakingTime.label }}</p>
            </div>
            <div class="box-cus">
              <div
                class="box-cus-effect"
                @click="
                  open(
                    'time-selector',
                    restingTime,
                    'restingTime',
                    'restingTime_show'
                  )
                "
              >
                <p class="">
                  <span>{{ restingTime_show }}</span> mins
                </p>
              </div>
              <p>{{ $q.lang.addRecipes.stepOne.fields.restingTime.label }}</p>
            </div>


          </div>
          <span class="error" v-if="cookingTime == 0 || cookingTime == null">{{
              clientError.cookingTime
            }}</span>
        </div>

        <div class="ingredient-list q-pb-lg">
          <div
            class="relative-position"
            @click="open('add-ingredient', ingredients, 'ingredients')"
          >
            <p class="detail-title">
              {{ $q.lang.addRecipes.stepTwo.fields.ingredient.label }}
            </p>
            <div class="absolute-right edit-option">
              <i class="las la-pen"></i>
            </div>
          </div>
          <ul>
            <li v-for="(item, index) in getFiltered(ingredients)" :key="index">
              <b v-if="item.ingredient !== null">
                {{ item.ingredient }}
              </b>
              <span v-if="item !== null"
                >{{ item.quantity }} {{ item.unitName
                }}<span
                  v-if="ingredients.length > 3"
                  class="material-icons"
                  @click="ingredients = removeItem(ingredients, index)"
                  >remove_circle</span
                ></span
              >
            </li>
            <span class="error" v-if="ingredients.length < 3">{{
              clientError.ingredients
            }}</span>
          </ul>
        </div>

        <div class="utensil-list q-pb-lg">
          <div class="relative-position" @click="open('add-utensil', utensils)">
            <p class="detail-title">
              {{ $q.lang.addRecipes.stepTwo.fields.utensil.label }}
            </p>
            <div class="absolute-right edit-option">
              <i class="las la-pen"></i>
            </div>
          </div>
          <div class="taglist">
            <ul>
              <li v-for="(item, index) in getFiltered(utensils)" :key="index">
                <q-btn
                  icon-right="close"
                  :label="item"
                  @click="utensils = removeItem(utensils, index)"
                />
              </li>
            </ul>
          </div>
        </div>

        <div class="dish-type q-pb-lg">
          <div
            class="relative-position"
            @click="open('dish-type', dishType, 'dishType', 'dishType_show')"
          >
            <p class="detail-title">
              {{ $q.lang.addRecipes.stepOne.fields.dishType.label }}
            </p>
            <div class="absolute-right edit-option">
              <i class="las la-pen"></i>
            </div>
          </div>
          <div class="taglist">
            <ul v-if="dishType">
              <li>
                <q-btn
                  icon-right="close"
                  :label="dishType_show"
                  @click=";(dishType = null), (dishType_show = null)"
                />
              </li>
            </ul>
          </div>
          <span v-if="clientError.dishType" id="clientError" class="error">
            {{ clientError.dishType }}</span
          >
        </div>

        <div class="cusine-type q-pb-lg">
          <div
            class="relative-position"
            @click="
              open(
                'cuisine-type',
                cuisinetype,
                'cuisinetype',
                'cuisinetype_show'
              )
            "
          >
            <p class="detail-title">
              {{ $q.lang.addRecipes.stepOne.fields.cuisineType.label }}
            </p>
            <div class="absolute-right edit-option">
              <i class="las la-pen"></i>
            </div>
          </div>
          <div class="taglist">
            <ul v-if="cuisinetype">
              <li>
                <q-btn
                  icon-right="close"
                  :label="cuisinetype_show"
                  @click=";(cuisinetype = null), (cuisinetype_show = null)"
                />
              </li>
            </ul>
          </div>
          <span v-if="clientError.cuisineType" id="clientError" class="error">
            {{ clientError.cuisineType }}</span
          >
        </div>

        <div class="utensil-list q-pb-lg">
          <div
            class="relative-position"
            @click="open('add-brand', brands, 'brands')"
          >
            <p class="detail-title">
              {{ $q.lang.addRecipes.stepOne.fields.brand.label }}
            </p>
            <div class="absolute-right edit-option">
              <i class="las la-pen"></i>
            </div>
          </div>
          <div class="taglist">
            <ul>
              <li v-for="(item, index) in getFiltered(brands)" :key="index">
                <q-btn
                  icon-right="close"
                  v-if="item !== ''"
                  :label="item"
                  @click="brands = removeItem(brands, index)"
                />
              </li>
            </ul>
          </div>
        </div>

        <div class="col-12 form-group">
          <div class="switch-cus">
            <q-toggle
              v-model="toggleswitchVideo"
              label="Upload full video of your recipe using upload video recipes"
              color="green"
              left-label
            />
          </div>
        </div>

        <template v-if="toggleswitchVideo">
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
          <div class="col-12 form-group">
            <q-input
              v-model="videodescription"
              type="textarea"
              :label="$q.lang.addRecipes.stepThree.fields.fullVideoDes.label"
            />
          </div>
        </template>

        <div class="step-list-view q-mb-md" v-else>
          <h6 class="q-mb-md">If you have written recipes add steps</h6>
          <div class="recipe-step-dis">
            <draggable
              v-model="steps"
              @start="dragging = true"
              @end="dragging = false"
              :options="dragOptions"
              handle=".handle"
              filter="input"
              :preventOnFilter="false"
            >
              <template #item="{ element, index }">
                <div>
                  <div class="step-title">
                    {{ $q.lang.addRecipes.stepNo }} {{ index + 1 }}
                    <div class="step-title-right">
                      <span @click="editStep = element.id"
                        ><i class="las la-pen"></i
                      ></span>
                      <span
                        v-if="index !== 0"
                        @click="steps = removeItem(steps, element.id)"
                        ><i class="las la-trash"></i
                      ></span>
                      <span class="handle"
                        ><i class="las la-arrows-alt"></i
                      ></span>
                    </div>
                  </div>
                  <div v-if="element.id == editStep">
                    <div class="col-12 form-group">
                      <q-input
                        v-model="steps[index].description"
                        ref="textArea"
                        type="textarea"
                        :label="
                          $q.lang.addRecipes.stepThree.fields.StepDes.label
                        "
                        :placeholder="
                          $q.lang.addRecipes.stepThree.fields.StepDes
                            .placeHolder
                        "
                        :rules="[(val) => required(val, 'Description')]"
                      />
                      <!-- <span
                        v-if="clientError.stepDisc"
                        id="clientError"
                        class="error"
                      >
                        {{ clientError.stepDisc }}</span
                      > -->
                    </div>
                    <div class="col-12 form-group">
                      <div class="row items-start cus-uplode">
                        <div v-if="element.image" class="img-after-upload">
                          <div class="img-control">
                            <q-btn
                              icon="las la-trash"
                              title="Remove"
                              @click="element.image = null"
                            />
                          </div>
                          <q-img
                            class="q-mr-md upload-img"
                            :src="element.image"
                            alt="image"
                            accept="image/x-png,image/gif,image/jpeg"
                          />
                        </div>

                        <div
                          v-else
                          class="upload-option"
                          @click="
                            open(
                              'upload-option',
                              folderName,
                              'step.' + element.id
                            )
                          "
                        >
                          <div class="icon">
                            <i class="las la-camera-retro"></i>
                            <span>{{
                              $q.lang.addRecipes.stepOne.fields.photo.label
                            }}</span>
                          </div>
                        </div>
                      </div>
                      <span class="error" v-if="element.image == null">
                        {{ imgErr }}</span
                      >
                      <!-- <span class="ch-limit q-pt-sm">{{
                        $q.lang.addRecipes.stepOne.fields.photo.maxSize
                      }}</span> -->
                    </div>
                  </div>
                  <div v-else>
                    <p>{{ element.description }}</p>
                    <q-input
                      v-if="!element.description"
                      v-model="element.description"
                      ref="textArea"
                      type="hidden"
                      :rules="[(val) => required(val, 'Description')]"
                    />
                    <div v-if="element.image" class="img-after-upload">
                      <div class="img-control">
                        <q-btn
                          icon="las la-trash"
                          title="Remove"
                          @click="setFieldNull('uploadoption')"
                        />
                      </div>
                      <q-img
                        class="q-mr-md upload-img"
                        :src="element.image"
                        alt="image"
                        accept="image/x-png,image/gif,image/jpeg"
                      />
                    </div>
                  </div>
                </div>
              </template>
              <template #footer>
                <div class="">
                  <q-btn
                    class="btn btn2 full-width"
                    icon="add"
                    @click="addMoreStep(steps.length)"
                    :label="
                      $q.lang.addRecipes.stepTwo.fields.stepDescription.addMore
                    "
                  />
                </div>
              </template>
            </draggable>
          </div>
        </div>
        <div class="">
          <div class="col-12 form-group">
            <q-input
              v-model="final_note"
              :maxlength="maxCount"
              type="textarea"
              :label="$q.lang.addRecipes.stepThree.fields.finalNote.label"
              :placeholder="
                $q.lang.addRecipes.stepThree.fields.finalNote.placeHolder
              "
            />

            <span class="ch-limit"
              >{{ final_note?.length ?? 0 }} / 500
              {{ $q.lang.common.subLabel.characters }}
            </span>
          </div>
        </div>
      </div>

      <div class="add-rcp-btm box-shadow-cus">
        <q-btn
          v-if="submitted"
          class="btn btn2"
          label="Close"
          @click="close()"
        />
        <q-btn
          v-if="!submitted"
          class="btn btn2"
          :label="
            cover_photo == null || name === null
              ? 'Close'
              : $q.lang.label.saveDraft
          "
          @click="cover_photo == null || name === null ? close() : draft()"
        />
        <q-btn
          :disabled="disableOn"
          :class="
            cover_photo == null || name === null
              ? 'btn btn4 float-right'
              : 'btn btn1 float-right'
          "
          :label="$q.lang.label.submit"
          type="submit"
        />
        <!-- class="btn float-right"
          v-bind:class="btnclass" -->
      </div>
    </q-form>

    <q-dialog v-model="allpopup" position="bottom" :class="dialogClass">
      <component
        :is="currentFrom"
        :sendValue="sendValue"
        :fieldName="currentField"
        :sendDisplayField="sendDisplayField"
        :sendOptions="sendOptions"
        v-on:selectValue="setValue"
        v-on:closePopup="closepopup"
      >
      </component>
    </q-dialog>
  </q-page>
</template>

<script>
  import {
    computed,
    defineAsyncComponent,
    onBeforeMount,
    ref,
    watch,
  } from 'vue'
  import { mapGetters } from 'vuex'
  import api from '../../apis/index'
  import draggable from 'vuedraggable'
  import Notify from 'boot/notification'
  import uuid from '../../composable/uuid'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  import useDialog from 'src/composable/useDialog'
  import { LocalStorage } from 'quasar'
  import coverImage from 'src/composable/coverPhoto'
  import { Loading } from 'quasar'
  import { getServerImageUrl } from '../../utils/server-asset'
  import { myrecipes } from 'src/store/recipe/getters'
  export default {
    name: 'AddWrittenRecipes',
    components: {
      draggable,
      'portion-quantity': defineAsyncComponent(() =>
        import('../../components/common/portion-quantity.vue')
      ),
      'diet-category': defineAsyncComponent(() =>
        import('../../components/common/diet-category.vue')
      ),
      'time-selector': defineAsyncComponent(() =>
        import('../../components/common/time-selector.vue')
      ),
      'upload-option': defineAsyncComponent(() =>
        import('../../components/common/all-upload/upload-option.vue')
      ),
      'dish-type': defineAsyncComponent(() =>
        import('../../components/common/all-upload/dish-type.vue')
      ),
      'cuisine-type': defineAsyncComponent(() =>
        import('../../components/common/all-upload/cuisine-type.vue')
      ),
      'save-draft': defineAsyncComponent(() =>
        import('../../components/common/all-upload/save-draft.vue')
      ),
      'add-ingredient': defineAsyncComponent(() =>
        import('../../components/common/all-upload/add-ingredient.vue')
      ),
      'add-utensil': defineAsyncComponent(() =>
        import('../../components/common/all-upload/add-utensil.vue')
      ),
      'add-brand': defineAsyncComponent(() =>
        import('../../components/common/all-upload/add-brand.vue')
      ),
      'final-note': defineAsyncComponent(() =>
        import('../../components/common/all-upload/final-note.vue')
      ),
      'thank-submit': defineAsyncComponent(() =>
        import('../../components/common/thank-submit.vue')
      ),
      'upload-video': defineAsyncComponent(() =>
        import('../../components/common/all-upload/upload-video-option.vue')
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
        sendOptions,
        open,
      } = useDialog()
      const route = useRoute()
      const uid = uuid()
      const btnclass = ref('btn4')
      const { getCoverPhoto } = coverImage()
      const step = ref('stepOne')
      const store = useStore()
      const recipeForm = ref(null)
      const loaded = ref(false)
      const slug = route.params.slug ?? null
      const isEdit = ref(false)
      // const myRecipe = store.getters['recipe/getRecipeData']
      const myRecipe = ref([])
      // const myRecipes = store.getters['recipe/getDetailedRecipes']
      //   const myRecipes = computed(() => {
      //   return store.getters['recipe/getDetailedRecipes']
      // })
      const myRecipes = ref([])
      // const myRecipes = LocalStorage.getItem('editRecipeData')
      const editName = ref(false)
      //Mark is
      const done1 = ref(false)
      const done2 = ref(false)
      const done3 = ref(false)
      const done4 = ref(false)
      const done5 = ref(false)
      const disableOn = ref(true)
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
      const steps = ref([
        {
          id: 0,
          description: '',
          image: '',
        },
      ])
      const dietCat = computed(() => {
        return store.getters['master/getDietCategory']
      })
      const getdishType = computed(() => {
        return store.getters['master/getdishTypes']
      })
      const getCuisineType = computed(() => {
        return store.getters['master/getPreferredCuisine']
      })
      const getServingTypes = computed(() => {
        return store.getters['master/getServingTypes']
      })
      const getUnit = computed(() => {
        return store.getters['master/getUnits']
      })
      Loading.show()

      //   if(slug){
      //   store.dispatch('recipe/detailedRecipe', slug).then((res) => {
      //       myRecipes.value = store.getters['recipe/getDetailedRecipes']
      //       console.log(myRecipes.value)
      //     // alert(res.data.name)
      //     Loading.hide()
      //     loaded.value = true
      //     // $refs.refName.focus()
      //   })
      // }else{
      //   Loading.hide()
      //     loaded.value = true
      // }
      const cover_photo = ref(null)
      //  watch(
      //   () =>
      //     _.cloneDeep([
      //       cover_photo.value,
      //     ])),
      //     (currentValue, oldValue) => {

      //       alert('ff')
      //       if(cover_photo.value === null){
      //         btnclass.value = 'btn1'
      //       }else {

      //         btnclass.value = 'btn4'
      //       }
      //     }

      const video = ref('')
      return {
        user: computed(() => {
          return store.getters['auth/getUser']
        }),
        getServingTypes,
        getCuisineType,
        getdishType,
        dietCat,
        getUnit,
        getServerImageUrl,
        getCoverPhoto,
        disableOn,
        loaded,
        btnclass,
        allpopup,
        currentFrom,
        currentField,
        sendValue,
        sendDisplayField,
        dialogClass,
        sendOptions,
        open,
        isDraft: ref(false),
        folderName: 'recipes',
        myRecipe,
        myRecipes,
        slug,
        isEdit,
        uid,
        maxCount: ref(500),
        drag: ref(true),
        editStep: ref(0),
        refName: ref('name'),
        textArea: ref('textArea'),
        recipeForm,
        editName,
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
        addrcpw,
        locdialog,
        tcdialog,
        submitted: false,
        dietCategoryError: ref(''),
        imgErr: ref(''),
        dense: ref(false),
        // Step 1 Fields
        name: ref(null),
        desc: ref(null),
        portion_quantity: ref([]),
        portion_quantity_show: ref(null),
        portion_type: ref(null),
        diet_category: ref(null),
        diet_category_show: ref(null),
        cover_photo,
        // Step 2 Fields
        toggleswitch: ref(false),
        preparation_time: ref(null),
        preparation_time_show: ref(0),
        cookingTime: ref(null),
        cookingTime_show: ref(0),
        bakingTime: ref(null),
        bakingTime_show: ref(0),
        restingTime: ref(null),
        restingTime_show: ref(0),
        dishcategory: ref(null),
        dishType: ref(null),
        dishType_show: ref(null),
        cuisinetype: ref(null),
        cuisinetype_show: ref(null),
        brands_show: ref([]),
        ingredients: ref([]),
        utensils: ref([]),
        brands: ref([]),
        steps,
        final_note: ref(''),
        video,
        toggleswitchVideo: ref(false),
        videodescription: ref(null),
        dragOptions: {
          handle: '.handle',
          options: {
            animation: 200,
          },
        },
        clientError: ref({
          name: null,
          cuisineType: null,
          dishType: null,
          diet_category_show: null,
          portion_quantity_show: null,
          stepDisc: null,
          ingredients: null,
          cookingTime: null,
        }),
        accept: ref('video/mp4*'),
        uploadPercentage: ref(0),
        viewPercentage: ref(false),
      }
    },
    mounted() {
      if (!this.slug) {
        this.$refs.refName.focus()
      } else {
        return false
      }
    },
    computed: {
      ...mapGetters({
        categories: 'master/getCategories',
        user: 'auth/getUser',
        profilePicture: 'auth/getUserProfilePicture',
      }),
      totalMinutesInNumber() {
        let total = 0
        total +=
          this.preparation_time !== null
            ? this.preparation_time.split(',')[0] * 60 +
              parseInt(this.preparation_time.split(',')[1])
            : 0
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
      },
    },

    created() {
      this.editName = true

      if (this.name !== null && this.cover_photo !== null) {
        this.disableOn = false
        console.log(this.disableOn)
      }
      console.log(this.myRecipes)
      if (this.slug) {
        this.$store.dispatch('recipe/detailedRecipe', this.slug).then((res) => {
          this.myRecipes = this.$store.getters['recipe/getDetailedRecipes']
          // this.myRecipes = res.data
          this.myRecipe = this.$store.getters['recipe/getRecipeData']
          Loading.hide()
          this.loaded = true

          this.isEdit = true
          this.disableOn = false
          // if (this.video == null) {
          //   this.toggleswitchVideo = false
          // }else{
          //   this.toggleswitch = true
          // }
          console.log(this.myRecipes)
          if (this.myRecipes == '') {
            var getdata = this.myRecipe.find((item) => item.id == this.slug)
          } else {
            var getdata = this.myRecipes
            this.submitted = true
          }
          console.log(getdata)
          console.log(getdata?.name)
          //IMPORTENT :start (Edit Draft & posted recipe)
          this.name = getdata?.name ?? ''
          this.cover_photo = this.getCoverPhoto(getdata?.cover_photo) ?? ''
          this.desc = getdata?.description ?? ''
          this.diet_category = getdata?.diet_category
          this.diet_category_show = this.getDiet(getdata?.diet_category) ?? ''
          this.portion_quantity[0] = getdata?.portion_qty ?? ''
          this.portion_quantity[1] = getdata?.portion_type ?? ''
          this.portion_quantity_show =
            getdata?.portion_qty +
              ' ' +
              this.get_serving_types(getdata?.portion_type) ?? ''
          this.preparation_time_show =
            getdata?.recipes_cooking_time.preparation_time ?? ''
          this.cookingTime_show =
            getdata?.recipes_cooking_time.cooking_time ?? ''
          this.bakingTime_show = getdata?.recipes_cooking_time.baking_time ?? ''
          this.restingTime_show =
            getdata?.recipes_cooking_time.resting_time ?? ''
          this.utensils = getdata?.utensil ?? ''
          this.dishType = getdata?.dish_type ?? ''
          this.dishType_show = this.get_dish_type(getdata?.dish_type) ?? ''
          this.cuisinetype = getdata?.cuisine_type ?? ''
          this.cuisinetype_show =
            this.get_cuisine_type(getdata?.cuisine_type) ?? ''
          this.brands = getdata?.recipes_brand ?? ''
          this.final_note = getdata?.notes ?? ''
          this.ingredients = getdata?.recipes_ingredients.map((item) => {
            return {
              quantity: item.qty,
              ingredient: item.ingredient,
              unitName: this.get_units(item.unit_id),
              unit: item.unit_id,
            }
          })

          if (getdata?.recipe_type == 'Written')
            this.steps = getdata.recipes_steps.map((item, index) => {
              // data = {
              //   value: item.file,
              //   field : 'step'+index
              // }
              // this.setValue(data)
              return {
                description: item.description === null ? '' : item.description,
                image:
                  item.file == ''
                    ? null
                    : item.file === 'null'
                    ? null
                    : this.getCoverPhoto(item.file),
                id: index,
              }
            })
          if (getdata?.recipe_type == 'Video') {
            this.toggleswitchVideo = true
            this.video = getdata.recipes_steps.map(
              (item) => process.env.TEMP_ASSET_ENDPOINT + item.file.substring(1)
            )

            this.videodescription = getdata.recipes_steps.map(
              (item) => item.description
            )
          }
          //IMPORTENT:end
        })
      } else {
        Loading.hide()
        this.loaded = true
      }
    },

    methods: {
      previosStep(){
        history.go(-1)
      },
      closepopup() {
        this.allpopup = false
      },
      getDiet(id) {
        return this.dietCat.find((item) => item.id === id)?.name
      },
      get_dish_type(id) {
        // alert(this.getdishType.find((item) => item.id === id)?.name)
        return this.getdishType.find((item) => item.id === id)?.name
      },
      get_cuisine_type(id) {
        return this.getCuisineType.find((item) => item.id === id)?.name
      },
      get_serving_types(id) {
        console.log(
          this.getServingTypes.find((item) => item.value === id)?.name
        )
        console.log(this.getServingTypes)
        return this.getServingTypes.find((item) => item.value === id)?.name
      },
      get_units(id) {
        return this.getUnit.find((item) => item.value === id)?.name
      },
      close() {
        // alert('ff')
        this.$router.push({ name: 'user-home' })
        this.$store.commit('recipe/setDetailedRecipes', [])
        // LocalStorage.remove('editRecipeData')
      },
      draft() {
        this.$store.commit('recipe/setDetailedRecipes', [])
        this.isDraft = true
        // alert('draft')

        // LocalStorage.remove('editRecipeData')
        if (isNaN(this.slug)) {
          this.isEdit = true
          if (this.video == null) {
            this.toggleswitchVideo = true
          }
          var data = {
            type: 'Draft',
            id: this.slug,
            name: this.name,
            cover_photo: this.cover_photo,
            description: this.desc,
            diet_category: this.diet_category,
            portion_type: this.portion_quantity[1],
            portion_qty: this.portion_quantity[0],
            recipes_cooking_time: {
              preparation_time: this.preparation_time_show,
              cooking_time: this.cookingTime_show,
              baking_time: this.bakingTime_show,
              resting_time: this.restingTime_show,
            },
            recipes_ingredients: this.ingredients.map((item) => {
              return {
                qty: item.quantity,
                ingredient: item.ingredient,
                unit_id: item.unit,
              }
            }),
            recipe_type: this.toggleswitchVideo ? 'Video' : 'Written',

            recipes_steps: this.steps.map((item) => {
              if (this.toggleswitchVideo) {
                return {
                  description: this.videodescription,
                  file: this.urlPath(this.video),
                  type: 'Video',
                }
              }
              if (this.steps.length > 0) {
                return {
                  description: item.description,
                  file: item.image,
                  type: 'Written',
                }
              }
            }),

            recipes_utensils: this.utensils,
            dish_type: this.dishType,
            cuisine_type: this.cuisinetype,
            recipes_brand: this.brands,
            // video: this.video,
            // videodescription: this.videodescription,
            notes: this.final_note,
          }
          this.$store.commit('recipe/editRecipeDraft', data)
          this.$store.commit('recipe/setDetailedRecipes', [])
          console.log(data)
          console.log('@@  ' + data.portion_qty + ' ' + this.portion_type)
        } else {
          var data = {
            type: 'Draft',
            id: this.uid,
            name: this.name,
            cover_photo: this.cover_photo,
            description: this.desc,
            diet_category: this.diet_category,
            portion_type: this.portion_quantity[1],
            portion_qty: this.portion_quantity[0],
            recipes_cooking_time: {
              preparation_time: this.preparation_time_show,
              cooking_time: this.cookingTime_show,
              baking_time: this.bakingTime_show,
              resting_time: this.restingTime_show,
            },
            recipes_ingredients: this.ingredients.map((item) => {
              return {
                qty: item.quantity,
                ingredient: item.ingredient,
                unit_id: item.unit,
              }
            }),

            recipe_type: this.toggleswitchVideo ? 'Video' : 'Written',

            recipes_steps: this.steps.map((item) => {
              if (this.toggleswitchVideo) {
                return {
                  description: this.videodescription,
                  file: this.urlPath(this.video),
                  type: 'Video',
                }
              }
              if (this.steps.length > 0) {
                return {
                  description: item.description,
                  file: item.image,
                  type: 'Written',
                }
              }
            }),

            recipes_utensils: this.utensils,
            dish_type: this.dishType,
            cuisine_type: this.cuisinetype,
            recipes_brand: this.brands,
            // video: this.video,
            videodescription: this.videodescription,
            notes: this.final_note,
          }
          this.$store.commit('recipe/addRecipeDraft', data)
          console.log(data)
        }
        this.$router.push({ name: 'user-home' })
      },
      getFiltered(array) {
        console.log(array)

        var filtered = array.filter(function (x) {
          if (typeof x == 'object') {
            return x?.ingredient !== null
          }
          return x !== undefined
        })
        return filtered
      },
      customValidation ( ) {
        let error = false;
        if (!this.validateName()) {
          this.clientError.name = 'Recipe Name is required'
          Notify.error(this.clientError.name)
          error = true;
        } else {
          this.clientError.name = null
        }

        if (!this.cuisinetype) {
          this.clientError.cuisineType = 'Cuisine type must be selected'
          Notify.error(this.clientError.cuisineType)
          error = true;
        } else {
          this.clientError.cuisineType = null
        }
        if (!this.dishType) {
          this.clientError.dishType = 'Dish type must be selected'
          Notify.error(this.clientError.dishType)
          error = true;
        } else {
          this.clientError.dishType = null
        }
        if (!this.diet_category) {
          console.log('Diet category is required');
          this.clientError.diet_category_show =
            'Diet Category must be selected'
            error = true;
          // Notify.error(this.clientError.dishType)
        } else {
          this.clientError.diet_category_show = ''
        }

        if (!this.portion_quantity[0]) {
          console.log('Portion Quantity is required');
          this.clientError.portion_quantity_show =
            'Portion Quantity must be selected'
            error = true;
          // Notify.error(this.clientError.dishType)
        } else {
          this.clientError.portion_quantity_show = ''
        }

        if (!this.toggleswitchVideo && !this.steps[0].description) {
          console.log('Description is required');
          this.clientError.stepDisc = 'Please enter a Description'
          error = true;
          // Notify.error(this.clientError.dishType)
        } else {
          this.clientError.stepDisc = ''
        }

        if (this.ingredients.length < 3) {
          console.log('Minimum 3 ingredient required');
          this.clientError.ingredients = 'Minimum 3 ingredient required'
          error = true;
          // Notify.error(this.clientError.dishType)
        } else {
          this.clientError.stepDisc = ''
        }

        // if (this.ingredients < 3) {
        //   console.log('Description is required');
        //   this.clientError.ingredients = 'Minimum 3 ingredient required'
        //   error = true;
        //   // Notify.error(this.clientError.dishType)
        // } else {
        //   this.clientError.stepDisc = ''
        // }

        if (this.cookingTime == 0 || this.cookingTime == null) {
          console.log('Cooking time is required');
          this.clientError.cookingTime = 'Cooking time is required'
          error = true;
          // Notify.error(this.clientError.dishType)
        } else {
          this.clientError.cookingTime = ''
        }

        if(error) {
          Notify.error('Please fill all the required fields')
          return false;
        }

        return true;
      },
      validate() {
        if (
          this.validateName() &&
          this.customValidation() &&
          this.cuisinetype &&
          this.dishType &&
          this.ingredients.length >= 3
        ) {
          this.$refs.recipeForm.validate().then((success) => {
            console.log(success)
            if (success) {
              this.submitForm()
            } else {
              console.log('error')
            }
          })
        }
      },
      validateName() {
        if (this.name === null || this.name === '') {
          this.editName = true
          return false
        } else {
          this.editName = false
          return true
        }
      },
      urlPath(val) {
        if (val == null) {
          return null
          // this.imgErr = 'Please Insert Image'
        } else {
          this.imgErr = ''
        }
        if (val.toString().startsWith('https://')) {
          var z = new URL(val)
          return z.pathname
        } else {
          return null
        }
        //  console.log(z);
      },
      async submitForm() {
        const formData = new FormData()
        if (this.slug) {
          formData.append('id', this.slug)
        }
        formData.append('name', this.name)
        formData.append('cover_photo', this.urlPath(this.cover_photo))
        formData.append('description', this.desc)

        console.log(this.urlPath(this.cover_photo))
        formData.append('diet_category', this.diet_category) // varchar value
        formData.append('dish_type', this.dishType) // Int value
        formData.append('cuisine_type', this.cuisinetype) // Int value
        if (this.utensils.length > 0) {
          this.utensils.forEach((item, index) => {
            formData.append(`recipes_utensil[${index}]`, item)
          })
        }
        if (this.brands.length > 0) {
          this.brands.forEach((item, index) => {
            formData.append(`recipes_brand[${index}]`, item)
          })
        }
        if (this.ingredients.length > 0) {
          this.ingredients.forEach((item, index) => {
            formData.append(`ingredient[${index}][ingredient]`, item.ingredient)
            formData.append(`ingredient[${index}][qty]`, item.quantity)
            formData.append(`ingredient[${index}][unit_id]`, item.unit)
          })
        }
        if (this.toggleswitchVideo) {
          if(this.urlPath(this.video)[0] == '/'){
            formData.append(`video`, this.urlPath(this.video).substring(1))
          }else{
            formData.append(`video`, this.urlPath(this.video))
          }
          console.log(this.urlPath(this.video))
          formData.append(`videodescription`, this.videodescription)
          formData.append('recipe_type', 'Video') // recipetype
        } else if (!this.toggleswitchVideo && this.steps.length > 0) {
          formData.append('recipe_type', 'Written') // recipetype
          for (let index = 0; index < this.steps.length; index++) {
            const element = this.steps[index]
            console.log(element.image)
            formData.append(
              `recipes_step[${index}][description]`,
              element.description
            )
            formData.append(
              `recipes_step[${index}][file]`,
              this.urlPath(element.image)
            )
            console.log(this.urlPath(element.image))
          }
        }
        formData.append(
          'portion_qty',
          this.portion_quantity.length ? this.portion_quantity[0] : null
        ) // integer value of quantity
        formData.append(
          'portion_type',
          this.portion_quantity.length ? this.portion_quantity[1] : null
        ) // integer value of portion_type from serving type table
        formData.append('notes', this.final_note) // Int value
        // if(this.video !== ''){
        //   }else if(this.step){
        //   formData.append('recipe_type', 'Written') // recipetype
        //   }
        formData.append('baking_time', this.bakingTime_show) // Int value
        formData.append('cooking_time', this.cookingTime_show) // Int value
        formData.append('preparation_time', this.preparation_time_show) // Int value
        formData.append('resting_time', this.restingTime_show) // Int value
        // formData.append('recipes_step', this.steps) // Int value
        //  if (this.steps.length > 0) {
        //   this.steps.forEach((item, index) => {
        //     formData.append(`recipes_step[${index}]` , item.description )
        //     formData.append(`file[${index}]` , item.image )
        //   })
        // }
        // console.log(formData);

        // this.uploadData(formData);
        // if(this.isDraft){
        //   alert('work')
        // //  console.log( Object.fromEntries(formData))
        //  for(var pair of formData.entries()) {
        // 	console.log(pair[0]+ ', '+ pair[1]);
        // }
        //   this.$store.commit('recipe/addRecipeDraft', Object.fromEntries(formData))
        // }else{

        api
          .post('/recipe/create-update', formData)
          .then((result) => {
            if (this.isEdit == true && this.submitted == false) {
              this.$store.commit('recipe/removeRecipeDraft', this.slug)
            }
            console.log('result', result)
            this.open('thank-submit', 'THANK YOU') // Open Thank you pop
          })
          .catch((err) => {
            console.log(err)
          })
        // }
      },
      async readBase64FileToBlob(base64) {
        const response = await fetch(base64)
        const blob = await response.blob()
        return blob
      },
      addMoreStep(index) {
        this.steps.push({
          id: index,
          description: '',
          image: '',
        })
        this.editStep = index++
      },
      setFieldNull(fieldName) {
        this[`${fieldName}`] = null
      },
      setValue(data) {
        console.log(data.value)
        console.log(data)

        if (data.value === 'draft') {
          this.draft()
          this.close()
        }
        if (data.value !== null) {
          // alert(data)
          this.disableOn = false
          console.log(this.disableOn)
        }
        this.allpopup = false
        if (data == Number) {
          this.steps[data].image = data.value
        }
        if (data.field?.startsWith('step')) {
          const index = parseInt(data.field.split('.')[1])
          this.steps[index].image = data.value
        } else {
          this[`${data.field}`] = data.value
          if (data.field == 'dishType' && data.value) {
            this.clientError.dishType = null
          } else if (data.field == 'cuisinetype' && data.value) {
            this.clientError.cuisineType = null
          }
        }
      },
    },
    beforeRouteLeave() {
      this.$store.commit[('recipe/setDetailedRecipes', [])]
      console.log('Leaving Recipe Create Page')
    },
  }
</script>
<style lang="scss">
  // $
  @import '../../css/components/recipe-cards.scss';
  @import '../../css/page/recipe-details.scss';
</style>
