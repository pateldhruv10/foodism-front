<template>
  <q-page class="search-page" v-if="!loaded">
    <div class="common-head">
      <div class="search-head">
        <div class="ch-left">
          <a href="javascript:history.go(-1)">
            <i class="fas fa-arrow-left"></i>
          </a>
        </div>
        <q-form @submit.prevent="searchByKeyword(search)">
          <q-input
            :model-value="search"
            type="search"
            placeholder="Search"
            debounce="500"
            @update:model-value="searchByKeyword"
          >
            <q-icon name="search" @click="searchByKeyword(search)"></q-icon>
          </q-input>
        </q-form>

        <div class="search-filter">
          <a href="javascript:void(0)" @click="open('search-filter', tab)"
            ><i class="las la-filter"></i
          ></a>
        </div>
      </div>
    </div>

    <div class="common-inner">
      <q-card>
        <q-tabs
          v-model="tab"
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          v-on:update:model-value="changeSearchTab()"
        >
          <q-tab name="all" >All</q-tab>
          <q-tab name="recipes">Recipes</q-tab>
          <!-- <q-tab name="vlogs" :to="{ query: { tab: 'vlogs' } }"
            >Vlogs</q-tab
          > -->
          <q-tab name="profiles">Profiles</q-tab>
          <q-tab name="event">Event</q-tab>
        </q-tabs>

        <q-tab-panels v-model="tab" animated aliv>
          <q-tab-panel name="all" >
            <div class="search-recipes q-pt-md">
              <div class="search-title">recipes</div>
              <q-infinite-scroll
                @load="getRecipe"
                :offset="350"
                scroll-target="body"
                ref="scrollTargetRecipe"
              >
                <search-recipes
                  v-for="item in recipes.slice(0, 4)"
                  :key="item"
                  :item="item"
                />
                <span v-if="recipes.length == 0">
                  {{ searching ? 'Searching...' : $q.lang.addRecipes.noRecord }}
                </span>
              </q-infinite-scroll>
            </div>
            <!-- <div class="search-profile q-pt-md">
              <div class="search-title">vlogs</div>
              <search-vlog v-for="item in vlogList" :key="item" :item="item" />
            </div>
            <div class="search-profile q-pt-md">
              <div class="search-title">profiles</div>
              <search-profile v-for="item in 5" :key="item" />
            </div> -->
            <div class="search-profile q-pt-md">
              <div class="search-title">profiles</div>
            <q-infinite-scroll
                @load="getProfile"
                :offset="350"
                scroll-target="body"
                ref="scrollTargetProfile"
              >
                <search-profile
                  v-for="item in profile.slice(0, 4)"
                  :key="item"
                  :item="item"
                />
              </q-infinite-scroll>
            </div>
            <div class="search-recipes q-pt-md">
              <div class="search-title">Event</div>
              <q-infinite-scroll
                @load="getEvent"
                :offset="350"
                scroll-target="body"
                ref="scrollTargetEvent"
              >
                <search-event
                  v-for="item in events.slice(0, 4)"
                  :key="item.slug"
                  :item="item"
                />
                <span v-if="events.length == 0">
                  {{ searching ? 'Searching...' : $q.lang.event.noRecord }}
                </span>
              </q-infinite-scroll>
            </div>

            <div
              class="no-search-result"
              v-show="recipes.length == 0 && events.length == 0"
            >
              <q-img src="../assets/no-search.jpg"></q-img>
              <h5>{{ $q.lang.common.searchNotFound.Title }}</h5>
              <p v-html="$q.lang.common.searchNotFound.Description"></p>
            </div>
          </q-tab-panel>

          <q-tab-panel name="recipes">
            <div class="search-recipes q-pt-md">
              <div class="search-title">recipes</div>
              <div class="full-width scroll">
                <q-infinite-scroll
                  @load="getRecipe"
                  :offset="350"
                  scroll-target="body"
                  ref="scrollTargetRecipe"
                >
                  <search-recipes
                    v-for="item in recipes"
                    :key="item"
                    :item="item"
                  />

                  <div class="no-search-result" v-show="recipes.length == 0">
                    <q-img src="../assets/no-search.jpg"></q-img>
                    <h5>{{ $q.lang.common.searchNotFound.Title }}</h5>
                    <p v-html="$q.lang.common.searchNotFound.Description"></p>
                  </div>
                  <template v-slot:loading>
                    <div class="row justify-center q-my-md">
                      <q-spinner-dots
                        v-if="!stopRecipeData && !loading"
                        color="primary"
                        size="40px"
                      />
                    </div>
                  </template>
                </q-infinite-scroll>
              </div>
            </div>
          </q-tab-panel>
          <!-- <q-tab-panel name="vlogs">
            <div class="">
              <div class="search-recipes q-pt-md">
                <div class="search-title">vlogs</div>
                <search-vlog
                  v-for="item in vlogList"
                  :key="item"
                  :item="item"
                />
              </div>
            </div>
          </q-tab-panel> -->

          <q-tab-panel name="profiles">
            <div class="search-profile q-pt-md">
              <div class="search-title">profiles</div>
              <q-infinite-scroll
                @load="getProfile"
                :offset="350"
                scroll-target="body"
                ref="scrollTargetProfile"
              >
                <search-profile
                  v-for="item in profile"
                  :key="item"
                  :item="item"
                />
                <div class="no-search-result" v-show="profile.length == 0">
                    <q-img src="../assets/no-search.jpg"></q-img>
                    <h5>{{ $q.lang.common.searchNotFound.Title }}</h5>
                    <p v-html="$q.lang.common.searchNotFound.Description"></p>
                  </div>
              </q-infinite-scroll>
            </div>
          </q-tab-panel>

          <q-tab-panel name="event">
            <div class="search-recipes q-pt-md">
              <div class="search-title">Event</div>
              <div class="full-width scroll">
                <q-infinite-scroll
                  @load="getEvent"
                  :offset="350"
                  scroll-target="body"
                  ref="scrollTargetEvent"
                >
                  <search-event
                    v-for="item in events"
                    :key="item.slug"
                    :item="item"
                  />
                  <span
                    class="no-event"
                    v-if="events.length == 0"
                    color="primary"
                    size="40px"
                  >
                    <q-img src="~assets/no-event.png"></q-img>
                    {{ searching ? 'Searching...' : $q.lang.event.noRecord }}
                  </span>
                  <template v-slot:loading>
                    <div class="row justify-center q-my-md">
                      <q-spinner-dots
                        v-if="!stopEventData && !loading"
                        color="primary"
                        size="40px"
                      />
                    </div>
                  </template>
                </q-infinite-scroll>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>

    <q-dialog v-model="allpopup" position="bottom" :class="dialogClass">
      <component
        :is="currentFrom"
        :sendValue="sendValue"
        :fieldName="currentField"
        :sendDisplayField="sendDisplayField"
        :sendOptions="sendOptions"
        v-on:selectValue="setValue"
        v-on:filterApplied="filterApplied"
        v-on:tabApplied="tabApplied"
      >
      </component>
    </q-dialog>
  </q-page>
</template>

<script>
import { useRoute } from 'vue-router'
import {
  defineComponent,
  ref,
  defineAsyncComponent,
  computed,
} from 'vue'
import { useStore } from 'vuex'
import useDialog from 'src/composable/useDialog'

import coverImage from 'src/composable/coverPhoto'
import { Loading } from 'quasar'
import _ from 'lodash'

export default defineComponent({
  name: 'SearchIndex',
  components: {
    'search-profile': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "search-profile" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/common/search-profile.vue'
      )
    ),
    'search-recipes': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "search-recipes" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/common/search-recipes.vue'
      )
    ),
    'search-vlog': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "search-vlog" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/common/search-vlog.vue'
      )
    ),
    'search-event': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "search-event" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/common/search-event.vue'
      )
    ),
    'cuisine-type': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "cuisine-type" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/common/all-upload/cuisine-type.vue'
      )
    ),
    'search-filter': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "search-filter" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'components/popups/search-filter.vue'
      )
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
    const tab = ref(route.query.tab || 'all')

    const search = computed(() => {
      return store.getters['master/getSearch']
    })
    const currentPage = ref(1)
    const currentPageEvent = ref(1)
    const currentPageProfile = ref(1)
    const limit = ref(4)
    Loading.show()

    function fetchEvent() {
      console.log('fetch event');
      const postData = {
        event_list: null,
        event_type: store.getters['event/getSearchMode'] || [],
        city_id: store.getters['event/getSearchCity'] || [],
        q: store.getters['master/getSearch'],
        page: currentPageEvent.value,
        limit: limit.value,
        order: 'u2c',
      }
      if (store.getters['event/getSearchType'].length == 1) {
        postData.event_list = store.getters['event/getSearchType'][0]
      }

      return store.dispatch('home/fetchEvents', postData)
    }

    function fetchRecipes() {
      console.log('Fetching Recipe list')
      const postData = {
        q: store.getters['master/getSearch'] || [],
        diet_category: store.getters['recipe/getSearchDietCategory'] || [],
        cookingTime: store.getters['recipe/getSearchCookingTime'] || [],
        cuisine_type: store.getters['recipe/getSearchCuisineType'] || [],
        dish_type: store.getters['recipe/getSearchDishType'] || [],

        recipeIngredientCount:
          store.getters['recipe/getSearchIngredientsUsed'] || [],
        recipeStepCount: store.getters['recipe/getSearchSteps'] || [],
        order_diraction:
          store.getters['recipe/getSearchSort'] == 'popular'
            ? 'desc'
            : store.getters['recipe/getSearchSort'] || [],
        page: currentPage.value,
        limit: limit.value,
        order:
          store.getters['recipe/getSearchSort'] == 'popular'
            ? 'reaction'
            : 'created_at',
      }

      return store.dispatch('recipe/fetchMyRecipes', postData)
    }

    function fetchProfile() {
        console.log('Fetching profile list')
      var filter = store.getters['home/getFilterOption']
      console.log(filter)

        const postData = {
        q: store.getters['master/getSearch'],
        city_id: store.getters['home/getSearchCity'] || [],
        mutual_following: filter.find(item => item == 'mutual_following'),
        cuisine_preferences: filter.find(item => item == 'cuisine_preferences'),
        diet_preference: filter.find(item => item == 'diet_preference'),
        page: currentPageProfile.value,
        limit:2,
      }
      console.log(postData)
      return store.dispatch('home/fetchProfile',postData)
    }

    const recipes = computed(() => {
      return store.getters['recipe/recipes']
    })

    // watch(route, (newVal, oldVal) => {
    // if (recipes.value.length == 0) {
    //   currentPage.value = 1
    // }
    // if (newVal.query.tab === 'all') {
    //   fetchEvent()
    //   fetchRecipes()
    // }
    // })
    // watch(route, (newVal, oldVal) => {
    //   console.log(newVal.query.tab)

    //   if (newVal.query.tab === 'all' || newVal.query.tab === 'recipes') {

    //     store.dispatch('recipe/resetRecipes').then(()=>{
    //     currentPage.value = 1
    //     fetchRecipes()
    //   })
    //   store.dispatch('event/resetEvents').then(() => {
    //     currentPage.value = 1
    //     fetchEvent()
    //   })
    //     // if (recipes.value.length == 0) {
    //     //   fetchRecipes()
    //     //   currentPage.value = 1
    //     // }
    //   }
    //   tab.value = newVal.query.tab
    //   // ;async (newVal) => {
    //   //   console.log('Route changed')
    //   //   // console.log(newVal)
    //   //   tab.value = await newVal
    //   // }
    // })
    const scrollTargetEvent = ref(null)
    const scrollTargetRecipe = ref(null)
    const scrollTargetProfile = ref(null)

    const stopEventData = ref(false)
    const stopRecipeData = ref(false)
    const stopProfileData = ref(false)
    const searching = ref(true)

    function searchByKeyword(keyword) {
      Loading.show()
      searching.value = true
      store.commit('master/saveSearch', keyword)
      if (tab.value == 'recipes') {
        store.commit('recipe/setMyRecipes', [])
        currentPage.value = 1
        stopRecipeData.value = false
        scrollTargetRecipe.value.reset()
        scrollTargetRecipe.value.resume()
        scrollTargetRecipe.value.trigger()

        searching.value = false
        Loading.hide()
      } else if (tab.value == 'event') {
        store.commit('home/setEvents', [])
        currentPageEvent.value = 1
        stopEventData.value = false
        scrollTargetEvent.value.reset()
        scrollTargetEvent.value.resume()
        scrollTargetEvent.value.trigger()

        searching.value = false
        Loading.hide()
      } else if (tab.value == 'profiles') {
        store.commit('home/setProfile', [])
        fetchProfile()
        currentPageProfile.value = 1
        stopProfileData.value = false
        scrollTargetProfile.value.reset()
        scrollTargetProfile.value.resume()
        scrollTargetProfile.value.trigger()

        searching.value = false
        Loading.hide()
      } else if (tab.value == 'all') {
        store.commit('recipe/setMyRecipes', [])
        store.commit('home/setProfile', [])
        store.commit('home/setEvents', [])

        currentPage.value = 1
        currentPageEvent.value = 1
        currentPageProfile.value = 1

        stopEventData.value = false
        stopRecipeData.value = false
        stopProfileData.value = false
        scrollTargetRecipe.value.stop()
        scrollTargetEvent.value.stop()
        scrollTargetProfile.value.stop()

        setTimeout(() => {
          scrollTargetRecipe.value.reset()
          scrollTargetRecipe.value.resume()
          scrollTargetRecipe.value.trigger()
          scrollTargetEvent.value.reset()
          scrollTargetEvent.value.resume()
          scrollTargetEvent.value.trigger()
          scrollTargetProfile.value.reset()
          scrollTargetProfile.value.resume()
          scrollTargetProfile.value.trigger()

          searching.value = false
        }, 1000)
        console.log('Searching in All tab')
        Loading.hide()
      }
    }

    return {
      searching,
      getCoverPhoto,
      stopEventData,
      stopRecipeData,
      stopProfileData,
      // vlogList: VLOGS,
      store,
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
      currentPage,
      currentPageEvent,
      currentPageProfile,
      limit,
      loaded,
      tab,
      search,
      scrollTargetEvent,
      scrollTargetProfile,
      scrollTargetRecipe,

      recipes,
      events: computed(() => {
        return store.getters['home/events']
      }),
      profile: computed(() => {
        return store.getters['home/getProfile']
      }),
      fetchEvent,
      fetchRecipes,
      fetchProfile,
      searchByKeyword,
      loading: true,
      noEventFound: false,
      setTab(value) {
        // this.$store.commit('recipe/setMyRecipes', [])
        // alert(value);
        tab.value = value
      },
      noRecipeFound: false,
    }
  },

  methods: {
    changeSearchTab() {
      // this.$store.dispatch('recipe/resetRecipes')
      // this.$store.dispatch('event/resetEvents')
      // // this.$store.commit('recipe/setMyRecipes', [])
      // if (this.recipes.length == 0 || this.recipes.length == 4) {
      //   this.$store.dispatch('recipe/resetRecipes')
      //   this.fetchRecipes()
      //   this.currentPage = 1
      // }
      // if (this.events.length == 0 || this.events.length == 4) {
      //   this.$store.dispatch('event/resetEvents')
      //   this.fetchEvent()
      //   this.currentPage = 1
      // }
      // if (this.tab == 'all') {
      //   this.fetchEvent()
      //   this.fetchRecipes()
      // }
    },
    setValue(data) {
      this.allpopup = false
      this[`${data.field}`] = data.value
    },

    async getEvent(index, done) {
      if (this.stopEventData) {
        return
      }
      this.fetchEvent().then((res) => {
        this.loaded = false
        Loading.hide()
        if (res.success && res.data.data.length > 0) {
          this.currentPageEvent = this.currentPageEvent + 1
          this.loading = false
          done()
        } else {
          if (this.currentPageEvent == 1) {
            this.noEventFound = true
          } else {
            this.noEventFound = false
          }
          this.stopEventData = true
          this.loading = false
          done(true)
        }
      })
    },
    async getRecipe(index, done) {
      if (this.stopRecipeData) {
        return
      }

      this.fetchRecipes().then((res) => {
        this.loaded = false
        Loading.hide()

        if (res.success && res.data.length > 0) {
          this.currentPage = this.currentPage + 1
          this.loading = false
          done()
        } else {
          if (this.currentPage == 1) {
            this.noRecipeFound = true
          } else {
            this.noRecipeFound = false
          }
          this.stopRecipeData = true
          this.loading = false
          done(true)
        }
      })
    },
    async getProfile(index, done) {
      if (this.stopRecipeData) {
        return
      }
      this.fetchProfile().then((res) => {
        this.loaded = false
        Loading.hide()
        if (res.success && res.data.length > 0) {
          this.currentPageProfile = this.currentPageProfile + 1
          this.loading = false
          done()
        } else {
          if (this.currentPageProfile == 1) {
            this.noRecipeFound = true
          } else {
            this.noRecipeFound = false
          }
          this.stopRecipeData = true
          this.loading = false
          done(true)
        }
      })
    },
    filterApplied(data) {
      console.log('Top Parent')
      if (data == 'recipes') {
        this.tab = 'recipes'
        this.currentPage = 1
        this.$store.commit('recipe/setMyRecipes', [])
        this.stopRecipeData = false
        this.$refs.scrollTargetRecipe.reset()
        this.$refs.scrollTargetRecipe.resume()
        this.$refs.scrollTargetRecipe.trigger()
        console.log('Recipe trigged')
      } else if (data == 'event') {
        this.tab = 'event'
        this.currentPageEvent = 1
        this.$store.commit('home/setEvents', [])
        this.stopEventData = false
        this.$refs.scrollTargetEvent.reset()
        this.$refs.scrollTargetEvent.resume()
        this.$refs.scrollTargetEvent.trigger()
        console.log('Event trigged')
      } else if (data == 'vlogs') {
        this.tab = 'vlogs'
      } else if (data == 'profiles') {
        this.tab = 'profiles'
        this.fetchProfile()
        this.currentPageProfile = 1
        this.$store.commit('home/setProfile', [])
        this.stopProfileData = false
        this.$refs.scrollTargetProfile.reset()
        this.$refs.scrollTargetProfile.resume()
        this.$refs.scrollTargetProfile.trigger()
      }
    },
  },
  created() {
    this.store.commit('home/setEvents', [])
    this.store.commit('recipe/setMyRecipes', [])
  },
  beforeRouteLeave() {
    this.store.commit('recipe/setMyRecipes', [])
    this.store.commit('home/setEvents', [])
    this.store.dispatch('event/resetEvents')
    this.store.dispatch('recipe/resetRecipes')
  },
})
</script>
<style lang="scss">
// $
@import '../css/page/search.scss';
.recipe-control {
  display: none;
}
</style>
