<template>
  <q-page class="" v-touch-swipe.mouse="swipePage">
    <!-- <submenu /> -->
    <q-card>
      <!-- <q-separator /> -->
      <q-tab-panels class="home-tab" v-model="tab" animated>
        <q-tab-panel name="recipes">
          <!-- <category-box-list /> -->
          <q-card>
            <q-tabs
              v-model="recipetab"
              dense
              class="rcp-tab"
              active-color="primary"
              indicator-color="primary"
              align="left"
              narrow-indicator
              @update:model-value="changeRecipeTab"
            >
              <div class="flex">
                <q-tab name="allrcp" :label="$q.lang.home.tab.recipe.all" />
                <q-tab name="Video" :label="$q.lang.home.tab.recipe.video" />
              </div>
              <div
                class="recipe-filter"
                @click="open('search-filter', 'recipes')"
              >
                <q-btn icon="las la-filter"></q-btn>
              </div>
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="recipetab" animated>
              <q-tab-panel name="allrcp">
                <q-pull-to-refresh
                  @refresh="refreshRecipe"
                  scroll-target="body"
                  draggable="false"
                >
                  <q-infinite-scroll
                    @load="getRecipe"
                    :offset="5050"
                    scroll-target="body"
                    ref="scrollRecipe"
                  >
                    <recipe-box
                      v-for="item in Recipes"
                      :key="item.id"
                      :item="item"
                    />

                    <template v-slot:loading>
                      <div class="row justify-center q-my-md">
                        <q-spinner-dots
                          v-if="loading"
                          color="primary"
                          size="40px"
                        />
                        <span v-else color="primary" size="40px"
                          >No More Data</span
                        >
                      </div>
                    </template>
                  </q-infinite-scroll>
                </q-pull-to-refresh>
              </q-tab-panel>

              <q-tab-panel name="Video">
                <q-pull-to-refresh
                  @refresh="refreshRecipe"
                  scroll-target="body"
                  draggable="false"
                >
                  <q-infinite-scroll
                    @load="getRecipe"
                    :offset="350"
                    scroll-target="body"
                    ref="scrollRecipe"
                  >
                    <recipe-box
                      v-for="item in Recipes"
                      :key="item.id"
                      :item="item"
                    />

                    <template v-slot:loading>
                      <div class="row justify-center q-my-md">
                        <q-spinner-dots
                          v-if="loading"
                          color="primary"
                          size="40px"
                        />
                        <span v-else color="primary" size="40px"
                          >No More Data</span
                        >
                      </div>
                    </template>
                  </q-infinite-scroll>
                </q-pull-to-refresh>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </q-tab-panel>
        <q-tab-panel name="events">
          <q-card>
            <q-tabs
              v-model="eventtab"
              dense
              class="event-sec"
              active-color="primary"
              indicator-color="primary"
              align="left"
              narrow-indicator
              @update:model-value="changeEventTab"
            >
              <div class="event-tab">
                <q-tab
                  name="upcoming"
                  :label="$q.lang.home.tab.event.upcoming"
                />
                <q-tab name="current" :label="$q.lang.home.tab.event.current" />
              </div>
              <div class="event-filter" @click="open('search-filter', 'event')">
                <q-btn icon="las la-filter"></q-btn>
              </div>
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="eventTab" swipeable infinite animated>
              <q-tab-panel name="current">
                <!-- make this bellow code dynamic and use. -->
                <event-list ref="eventList" />
              </q-tab-panel>

              <q-tab-panel name="upcoming">
                <event-list ref="eventList" />
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </q-tab-panel>
        <q-tab-panel name="vlog" animated>
          <q-pull-to-refresh @refresh="refresh">
            <q-infinite-scroll
              @load="getEvent"
              :offset="650"
              :scroll-target="$refs.scrollTargetEvent"
              class="scroll-y"
            >
              <!-- <category-box-list /> -->
              <!-- <div class="q-pa-sm extra-class"></div> -->
              <div class="bites-list">
                <vlog-post v-for="item in vlogList" :key="item" :item="item" />
              </div>
              <template v-slot:loading>
                <div class="row justify-center q-my-md">
                  <q-spinner-dots v-if="loading" color="primary" size="40px" />
                  <span v-else color="primary" size="40px">No More Data</span>
                </div>
              </template>
            </q-infinite-scroll>
          </q-pull-to-refresh>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
  <q-dialog v-model="allpopup" position="bottom" :class="dialogClass">
    <component
      :is="currentFrom"
      :sendValue="sendValue"
      :fieldName="currentField"
      :sendDisplayField="sendDisplayField"
      v-on:selectValue="setValue"
      v-on:filterApplied="filterApplied"
    ></component>
  </q-dialog>
</template>

<script>
  import { defineAsyncComponent, ref, computed, watch } from 'vue'
  import { useStore } from 'vuex'
  import useDialog from 'src/composable/useDialog'
  // import VLOGS from 'src/content/vlogs.json'
  export default {
    name: 'UserHome',
    components: {
      'category-box-list': defineAsyncComponent(() =>
        import(
          /* webpackChunkName: "category-box-list" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          'src/components/home/category-box-list.vue'
        )
      ),
      'event-list': defineAsyncComponent(() =>
        import(
          /* webpackChunkName: "event-list" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          'src/components/home/event-list.vue'
        )
      ),
      'recipe-box': defineAsyncComponent(() =>
        import(
          /* webpackChunkName: "recipe-component" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          'src/components/home/recipe-box.vue'
        )
      ),
      'recipe-box-foodism': defineAsyncComponent(() =>
        import(
          /* webpackChunkName: "recipe-component" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          'src/components/home/recipe-box-foodism.vue'
        )
      ),
      'video-recipe-box': defineAsyncComponent(() =>
        import(
          /* webpackChunkName: "video-recipe-component" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          'src/components/home/video-recipe-box.vue'
        )
      ),
      // 'contest-box': defineAsyncComponent(() => import('src/components/home/contest-box.vue')),
      // 'contest-winner': defineAsyncComponent(() => import('src/components/home/contest-winner.vue')),
      // 'vlog-post': defineAsyncComponent(() =>
      //   import(
      //     /* webpackChunkName: "vlog-component" */
      //     /* webpackMode: "lazy" */
      //     /* webpackInclude: /\.vue$/ */
      //     'src/components/home/vlog-post.vue'
      //   )
      // ),
      // 'submenu': defineAsyncComponent(() => import('src/components/layouts/submenu.vue')),
      search: defineAsyncComponent(() =>
        import(
          /* webpackChunkName: "search-component" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          './Search.vue'
        )
      ),
      'event-filter-tabs': defineAsyncComponent(() =>
        import(
          /* webpackChunkName: "event-filter-tabs" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          'src/components/tabbing/event-filter-tabs.vue'
        )
      ),
      'search-filter': defineAsyncComponent(() =>
        import(
          /* webpackChunkName: "search-filter" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          'src/components/popups/search-filter.vue'
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
      const store = useStore()
      const loading = ref(true)
      const currentPage = ref(1)
      const limit = ref(5)
      const eventTab = computed(() => store.state.home.eventTab)
      const eventType = computed(() => store.state.home.eventType)
      const recipetab = ref(store.state.home.recipeTab)
      const eventList = ref(null)
      const scrollRecipe = ref(null)
      const tab = computed(() => {
        return store.getters['home/currentHomeTab']
      })
      console.log('-> ' + tab.value)
      function fetchRecipes() {
        var recipeTab = []
        if (recipetab.value === 'Video') {
          recipeTab.push(recipetab.value)
        }
        const postData = {
          diet_category: store.getters['recipe/getSearchDietCategory'] || [],
          cookingTime: store.getters['recipe/getSearchCookingTime'] || [],
          cuisine_type: store.getters['recipe/getSearchCuisineType'] || [],
          dish_type: store.getters['recipe/getSearchDishType'] || [],
          recipe_type: recipeTab || [],
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

      watch(tab, async (newTabValue) => {
        currentPage.value = 1
        console.log(tab.value)
        scrollRecipe.value.stop()

        if (newTabValue === 'recipes') {
          scrollRecipe.value.reset()
          scrollRecipe.value.resume()
          scrollRecipe.value.trigger()
        } else if (newTabValue === 'events') {
          eventList.value.applyFilter()
        }
      })

      return {
        // vlogList: VLOGS,
        Recipes: computed(() => {
          return store.getters['recipe/recipes']
        }),
        eventTab,
        eventType,
        tab,
        recipetab,
        eventtab: ref(eventTab.value),
        scrollTargetEvent: ref(null),
        scrollTargetEvents: ref(null),
        scrollTargetRecipes: ref(null),
        loading,
        currentPage,
        limit,
        allpopup,
        currentFrom,
        currentField,
        sendValue,
        sendDisplayField,
        dialogClass,
        open,
        fetchRecipes,
        scrollRecipe,
        async refreshRecipe(done) {
          store.commit('recipe/setMyRecipes', [])
          currentPage.value = 1
          // store.commit('recipe/setMyRecipes', [])
          await fetchRecipes().then((res) => {
            if (res.success && res.data.length > 0) {
              done()
            } else {
              loading.value = false
              done(true)
            }
          })
        },
        async getRecipe(index, done) {
          await fetchRecipes().then((res) => {
            if (res.success && res.data.length > 0) {
              currentPage.value = currentPage.value + 1
              done()
            } else {
              loading.value = false
              done(true)
            }
          })
        },
      }
    },
    methods: {
      filterApplied(data) {
        console.log('Top Parent')
        if (data == 'event') {
          this.$store.commit('home/setEvents', [])
          this.$refs.eventList.applyFilter()
        }
        if (data == 'recipes') {
          this.currentPage = 1
          this.$store.commit('recipe/setMyRecipes', [])
          this.$refs.scrollRecipe.reset()
          this.$refs.scrollRecipe.resume()
          this.$refs.scrollRecipe.trigger()
        }
      },
      async changeEventTab() {
        console.log('Changing events tab')
        await this.$store.dispatch('event/resetEvents')
        await this.$store.commit('home/setEvents', [])
        this.$store.commit('home/changeEventTab', this.eventtab)
        if (this.$store.getters['event/getEventCityOption'] === 0) {
          this.$store.dispatch('event/getEventCitiesApi')
        }
        this.currentPage = 1
      },
      async changeRecipeTab() {
        console.log('Changing recipe tab')
        this.$store.commit('recipe/setMyRecipes', [])
        this.currentPage = 1
      },
    },
    beforeRouteLeave() {
      this.$store.dispatch('recipe/resetRecipes')
      this.$store.dispatch('event/resetEvents')
      this.$store.commit('recipe/recipeRefresh', [])
      this.$store.commit('recipe/setMyRecipe', [])
      this.$store.commit('recipe/setMyRecipes', [])
    },
  }
</script>
<style lang="scss">
  // $
  @import '../css/page/home.scss';
</style>
