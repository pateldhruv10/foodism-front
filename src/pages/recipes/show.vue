<template>
  <q-page v-if="loaded" class="recipe-detail recipe-preview">
    <div class="recipe-title-top fixed-top">

        <a href="javascript:history.go(-1)">
          <i class="fas fa-arrow-left"></i>
        </a>
        <h5>{{ recipes.name }}</h5>
        <!-- <router-link
          :to="{ name: 'recipe-details', params: { slug: item?.id } }"
        >
          {{ item?.name }}</router-link
        > -->

    </div>
    <recipe-box v-if="recipes.recipe_type == 'Written' && recipes"  :item="recipes" />
    <video-recipe-box  v-if="recipes.recipe_type == 'Video'" :item="recipes"/>
    <div class="recipe-description">
      <!-- <h5>{{ recipes.name }}</h5> -->
      <h5>Recipe Card</h5>
      <div class="q-pt-md q-pb-sm"  v-if="recipes.description">
        <div class="relative-position">
          <p class="detail-title">Recipe Description</p>
        </div>
        <p>{{recipes.description}}</p>
      </div>
      <div class="cat-qun q-pb-sm">
        <div class="row q-col-gutter-x-lg">
          <div class="col-6">
            <div class="relative-position">
              <p class="detail-title">Diet Category</p>
            </div>
            <p>{{ getDiet(recipes.diet_category) }}</p>
          </div>
          <div class="col-6">
            <div class="relative-position">
              <p class="detail-title">Portion Quantity</p>
            </div>
            <p>
              {{ recipes.portion_qty }}
              {{ get_serving_types(recipes.portion_type) }}
            </p>
          </div>
        </div>
      </div>
      <!-- <div class="recipe-tag q-pb-lg">
        <div class="relative-position">
          <p class="detail-title">Recipe tag</p>
        </div>
        <div class="taglist">
          <ul>
            <li><q-btn label="#FoodismRepublicRewind" /></li>
            <li><q-btn label="#Sweets" /></li>
            <li><q-btn label="#Myrecipe" /></li>
          </ul>
        </div>
      </div> -->
      <div class="recipe-time q-pb-sm"  v-if="recipes.recipes_cooking_time?.preparation_time || recipes.recipes_cooking_time?.cooking_time || recipes.recipes_cooking_time?.baking_time || recipes.recipes_cooking_time?.resting_time">
        <div class="relative-position">
          <p class="detail-title">Recipe Prepation Time</p>
        </div>
        <div class="prepar-box">
          <div class="box-cus" v-if="recipes.recipes_cooking_time?.preparation_time">
            <div class="box-cus-effect">
              <p class="hour-block">
                <span>{{
                  recipes.recipes_cooking_time?.preparation_time
                }}</span>
                mins
              </p>
            </div>
            <p>Preparation</p>
          </div>
          <div class="box-cus" v-if="recipes.recipes_cooking_time?.cooking_time">
            <div class="box-cus-effect">
              <p class="hour-block">
                <span>{{ recipes.recipes_cooking_time?.cooking_time }}</span>
                mins
              </p>
            </div>
            <p>Cooking</p>
          </div>
          <div class="box-cus" v-if="recipes.recipes_cooking_time?.baking_time">
            <div class="box-cus-effect">
              <p class="hour-block">
                <span>{{ recipes.recipes_cooking_time?.baking_time }}</span>
                mins
              </p>
            </div>
            <p>Baking</p>
          </div>
          <div class="box-cus" v-if="recipes.recipes_cooking_time?.resting_time">
            <div class="box-cus-effect">
              <p class="hour-block">
                <span>{{ recipes.recipes_cooking_time?.resting_time }}</span>
                mins
              </p>
            </div>
            <p>Resting</p>
          </div>
        </div>
      </div>
      <div class="ingredient-list q-pb-lg" v-if="recipes.recipes_ingredients?.length != 0">
        <q-list>
          <!-- <q-expansion-item
            group="ingredients"
            label="Ingredients"
            header-class="text-primary"
          > -->
         <p class="detail-title">Ingredients</p>
            <q-card>
              <ul
                v-for="ingredients in recipes.recipes_ingredients"
                :key="ingredients"
              >
                <li>
                  {{ ingredients.ingredient }}
                  <span
                    >{{ ingredients.qty }}
                    {{ get_units(ingredients.unit_id) }}</span
                  >
                </li>
              </ul>
            </q-card>
          <!-- </q-expansion-item> -->
        </q-list>
      </div>
      <div class="utensil-list q-pb-lg" v-if="recipes.utensil?.length != 0">
        <div class="relative-position">
          <p class="detail-title">Utensils</p>
        </div>
        <div class="taglist">
          <ul>
            <li v-for="utensils in recipes.utensil" :key="utensils">
              <q-btn :label="utensils" />
            </li>
          </ul>
        </div>
      </div>
      <div class="dish-type q-pb-lg">
        <div class="relative-position">
          <p class="detail-title">Dish type</p>
        </div>
        <div class="taglist">
          <ul>
            <li><q-btn :label="get_dish_type(recipes.dish_type)" /></li>
            <!-- <li><q-btn label="dessert" /></li>
            <li><q-btn label="starter" /></li> -->
          </ul>
        </div>
      </div>
      <div class="cusine-type q-pb-lg">
        <div class="relative-position">
          <p class="detail-title">Cusine type</p>
        </div>
        <div class="taglist">
          <ul>
            <li><q-btn :label="get_cuisine_type(recipes.cuisine_type)" /></li>
            <!-- <li><q-btn label="chinese" /></li>
            <li><q-btn label="italian" /></li> -->
          </ul>
        </div>
      </div>
      <div class="step-list-view" v-if="recipes.recipe_type == 'Written' && recipes.recipes_steps[0]?.description !== null && recipes.recipes_steps[0]?.file !== null" >
        <div class="relative-position">
          <p class="detail-title" >Steps</p>
        </div>
        <!-- <span>
          <p >
          <b>Recipe Photos ({{ recipes.recipes_steps?.length }})</b>
        </p>
        <div class="recipe-img-list">
          <div
            class="img-list-box"
            v-for="(steps, index) in recipes.recipes_steps"
            :key="index"

          >
            <q-img
            v-if="steps.file !== 'null'"
            :src="getCoverPhoto(steps.file)"></q-img>

          </div>
        </div>
        </span> -->
        <div class="recipe-step-dis" v-if="recipes.recipe_type == 'Written'">
          <q-list v-for="(steps, index) in recipes.recipes_steps" :key="index">
            <q-expansion-item
              group="steplist"
              :label="
                'Step  ' + (index + 1) + '/' + recipes.recipes_steps.length
              "
              default-opened
              header-class="step-title"
            >
              <q-card>
                <p>
                  {{ steps.description }}
                </p>
                <q-img v-if="steps.file !== 'null' " :src="getCoverPhoto(steps.file)"></q-img>
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>

      </div>
        <div class="final-note" v-if="recipes.notes">
          <div class="relative-position">
            <p class="detail-title">Final Note</p>
          </div>
          <p>
            {{ recipes.notes }}
          </p>
        </div>

      <!-- <div class="">
         <q-btn
           v-if="isLoggedIn && recipes.flag == true || make"
         class="btn btn1 full-width"
          icon="restaurant_menu"
          label="I Made It"

        />
        <q-btn
         v-else
           :class="currentUser?.id == recipes.createdBy?.id ?  'none' : 'btn btn2 full-width'  "
          icon="restaurant_menu"
          label="I Made It"
          @click="!isLoggedIn ? open('is-logout') : made()"
        />

      </div> -->
    </div>
  </q-page>
  <q-dialog v-model="allpopup" position="bottom" :class="dialogClass">
    <component
      :is="currentFrom"
      :sendValue="sendValue"
      :fieldName="currentField"
      :sendDisplayField="sendDisplayField"
      v-on:selectValue="setValue"
    ></component>
  </q-dialog>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref, computed } from 'vue'
import VideoPlayer from 'src/components/player/video.vue'
import api from '../../apis/index'
import Notify from 'src/boot/notification'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { Loading } from 'quasar'
import coverImage from 'src/composable/coverPhoto'
import useDialog from 'src/composable/useDialog'
import { useQuasar } from 'quasar'
import { LocalStorage } from 'quasar'

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
    const { getCoverPhoto } = coverImage()
    const loaded = ref(false)
    const route = useRoute()
    const store = useStore()
    const slug = route.params.slug ?? null
    const showcontactsellerform = ref(false)
    const position = ref('top')
    const $q = useQuasar()
    const recipes = computed(() => {
      return store.getters['recipe/getDetailedRecipes']
    })
    const dietCat = computed(() => {
      return store.getters['master/getDietCategory']
    })
    const dishType = computed(() => {
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
     const currentUser = computed(() => {
      return store.getters['auth/getUser']
    })
    Loading.show()
    store.dispatch('recipe/detailedRecipe', slug).then(() => {
      Loading.hide()
      loaded.value = true
    })

    console.log(dishType.value)

    console.log(recipes.value)

    return {
      playerOptions: {
        autoplay: true,
        controls: true,
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
        },
      },
       isLoggedIn: computed(() => {
        return store.getters['auth/isLoggedIn']
      }),
         allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
      getCoverPhoto,
      make: ref(false),
      loaded,
      getUnit,
      dietCat,
      dishType,
      getCuisineType,
      getServingTypes,
      slug,
      recipes,
      recipe_id: ref(slug),
      showcontactsellerform,
      position,
      currentUser,
      // open(pos) {
      //   position.value = pos
      //   showcontactsellerform.value = true
      // },
      user: computed(() => {
        return store.getters['auth/getUser']
      }),

      slide: ref(1),
      autoplay: ref(true),
      small: ref(false),
    }
  },
  created() {
    this.$store.commit('recipe/setMyRecipes', [])
  },
  computed: {
    isDisable() {
      return this.make == true
    },
    player() {
      return this.$refs.videoPlayer.player
    },
  },
  beforeRouteLeave() {
    this.$store.commit('recipe/setDetailedRecipes', [])
    console.log('Leaving Recipe Details Page')
    // Loading.show()
    // setTimeout(() => {
    //   Loading.hide()
    // }, 1000);
  },
  methods: {
    onPlayerPlay(player) {
      console.log(player)
      console.log('player play!', player)
    },
    onPlayerReady(player) {
      console.log('player ready!', player)
      // this.player.play()
    },
    playVideo: function (source) {
      const video = {
        withCredentials: false,
        type: 'application/x-mpegurl',
        src: source,
      }
      this.player.reset() // in IE11 (mode IE10) direct usage of src() when <src> is already set, generated errors,
      this.player.src(video)
      // this.player.load()
      // this.player.play()
    },
    made() {
      this.make = true
      var formData = new FormData()
      formData.append('recipe_id', this.recipe_id)
      this.$store.commit('recipe/setImadeItCount')
      api.put('recipe/imadeit', formData)
    },
    getDiet(id) {
      return this.dietCat.find((item) => item.id === id)?.name
    },
    get_portion_qty() {},
    get_portion_type() {},
    get_dish_type(id) {
      return this.dishType.find((item) => item.id === id)?.name
    },
    get_cuisine_type(id) {
      return this.getCuisineType.find((item) => item.id === id)?.name
    },
    get_serving_types(id) {
      // console.log(this.getServingTypes)
      return this.getServingTypes.find((item) => item.value === id)?.name
    },
    get_units(id) {
      return this.getUnit.find((item) => item.value === id)?.name
    },
  },
  components: {
    'video-recipe-box': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "video-recipe-component" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/home/video-recipe-box.vue'
      )
    ),
    // 'recipe-price' : require('components/product-box/recipe-price.vue').default,
    'recipe-box': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "recipe-box" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/home/recipe-box.vue'
      )
    ),
  },
  data() {
            return {
                timerCount: 6,
            }
        },
        watch: {
            timerCount: {
                handler(value) {

                    if (value > 0) {
                        setTimeout(() => {
                            this.timerCount--;
                        }, 1000);
                    }

                    if(value == 0){
                      console.log(this.currentUser.id);
                      const data = {
                        recipe_id: this.recipe_id,
                        user_id: this.currentUser.id
                      }
                      api.post('/recipe/view-count', data)
                      setTimeout(() => {
                      // this.$q.notify({
                      //   progress: true,
                      //   message: '1 View Completed',
                      //   icon: 'visibility',
                      //   color: 'white',
                      //   textColor: 'primary'
                      // })
                    })
                    }
                },
                immediate: true // This ensures the watcher is triggered upon creation
            }
        },
  name: 'Recipe-details',
})
</script>
<style lang="scss">
// $
@import 'src/css/components/recipe-cards.scss';
@import 'src/css/page/recipe-details.scss';
.none{
  display: none;
}
</style>
