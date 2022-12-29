<template>
  <q-page class="profile-view">
    <div class="profile-view-top">
      <a href="javascript:history.go(-1)">
        <i class="fas fa-arrow-left"></i>
      </a>
      <h5>{{ user.name }}</h5>
      <div
        v-if="isLoggedIn && slug == currentUser.id"
        class="absolute-right sidebar-option"
      >
        <span
          @click="$store.commit('master/toggleDrawer')"
          class="material-icons"
          >menu</span
        >
      </div>
    </div>
    <div class="profile-head">
      <div class="up-details">
        <div class="up-info">
          <!-- <h5> -->
          <!-- {{ user?.name }} -->
          <!-- <q-img
              class="verified-account"
              src="~assets/verified-full.svg"
            ></q-img> -->
          <!-- </h5> -->
          <span v-if="!readMoreActivated"> {{ longText.slice(0, 70) }}</span>
          <span v-if="readMoreActivated">{{ longText }}</span>
          <label
            v-if="showReadMore && !readMoreActivated"
            @click="activateReadMore"
          >
            Read more...
          </label>
          <label
            v-if="showReadMore && readMoreActivated"
            @click="deactivateReadMore"
          >
            Show less
          </label>

          <!-- <div>{{ user.about }}</div> -->

          <div class="fl-counter" v-if="user && user.id">
            <ul>
              <li>
                <router-link
                  v-if="followers.length"
                  :to="{
                    name: 'subscribers-list',
                    params: { slug: user.id },
                  }"
                >
                  <b>
                    {{ followers.length || '0' }}
                  </b>
                  {{ $q.lang.follow.subscriber }}
                </router-link>

                <template v-else>
                  <b>
                    {{ followers.length || '0' }}
                  </b>
                  {{ $q.lang.follow.subscriber }}
                </template>
              </li>

              <li>
                <router-link
                  v-if="following.length"
                  :to="{ name: 'following-list', params: { slug: user.id } }"
                >
                  <b>
                    {{ following.length || '0' }}
                  </b>
                  {{ $q.lang.follow.following }}
                </router-link>
                <template v-else>
                  <b>
                    {{ following.length || '0' }}
                  </b>
                  {{ $q.lang.follow.following }}
                </template>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="up-img"
          v-if="image_src && image_src[0] !== null"
          v-bind:class="{ 'default-profile-img': !image_src[0] }"
        >
          <q-img
            :loading="eager"
            :decoding="async"
            fetchpriority="high"
            :src="image_src[0] ?? require('assets/images/profile-new.png')"
          />
        </div>
      </div>

      <!-- Below buttons will be changed when api is ready -->
      <div class="up-btns">
        <!-- <q-btn
          v-if="currentUser && currentUser.id !== user.id"
          label="message"
          :to="{ name: '' }"
          class="btn5 q-mb-md text-capitalize"
        /> -->
        <span v-if="currentUser && currentUser.id !== user.id">
          <q-btn
            v-if="!isfollow()"
            class="btn3 q-mb-md text-capitalize"
            label="Follow"
            @click="!isLoggedIn ? open('is-logout') : followUser()"
          />
          <q-btn
            v-else
            class="btn3 text-capitalize"
            label="Unfollow"
            @click="!isLoggedIn ? open('is-logout') : UnFollowUser()"
          />
        </span>
        <q-btn
          label="more info"
          :to="{ name: 'user-detail', params: { slug: user?.id } }"
          class="btn5 q-mb-md text-capitalize"
        />
      </div>
    </div>

    <div class="up-all btm-shadow">
      <div class="">
        <q-card
          class="no-shadow"
          v-bind:class="{ 'fix-top': scrollPosition > 250 }"
        >
          <q-tabs
            :model-value="tab"
            @update:model-value="setTab"
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            narrow-indicator
          >
            <q-tab name="recipes" :to="{ query: { tab: 'recipes' } }">
              <q-img src="~assets/recipes.svg"></q-img>
            </q-tab>
            <!-- <q-route-tab name="vlogs" :to="{ query: { tab: 'vlogs' } }">
              <q-img src="~assets/vlog.svg"></q-img>
            </q-route-tab> -->

            <q-tab name="events" :to="{ query: { tab: 'events' } }"
              ><q-img src="~assets/contest.svg"></q-img
            ></q-tab>
            <!-- <q-tab name="activity"><q-img src="~assets/refer-earn.svg"></q-img></q-tab> -->
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated keep-alive>
            <q-tab-panel name="recipes">
              <div class="full-width scroll" ref="scrollTargetRecipes">
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
                    <div
                      class="rc-grid row q-col-gutter-sm"
                      v-if="writtenRecipe.length"
                    >
                      <recipe-list
                        v-for="(recipe, index) in writtenRecipe"
                        :key="index"
                        :item="recipe"
                      >
                        <template
                          v-slot:controls
                          v-if="recipe?.user_id == currentUser?.id"
                        >
                          <div class="rcp-control">
                            <router-link
                              :to="{
                                name: 'written-recipe',
                                params: { slug: recipe.id },
                              }"
                            >
                              <i
                                class="las la-pen"
                                @click="editRecipe(recipe.id)"
                              ></i>
                            </router-link>
                            <i
                              class="las la-trash"
                              @click="removeRecipeList(recipe.id)"
                            ></i>
                            <!-- removeRecipeList(item.id) -->
                          </div>
                        </template>
                        <template v-slot:loading>
                          <div class="row justify-center q-my-md">
                            <q-spinner-dots
                              v-if="loading"
                              color="primary"
                              size="40px"
                            />
                            <!-- <span v-else color="primary" size="40px" >No More Data</span> -->
                          </div>
                        </template>
                      </recipe-list>
                    </div>
                    <not-added
                      v-if="!loading && writtenRecipe.length == 0"
                      :item="'Recipe'"
                    />
                  </q-infinite-scroll>
                </q-pull-to-refresh>
              </div>
            </q-tab-panel>

            <q-tab-panel name="vlogs">
              <div class="rc-grid row q-col-gutter-sm">
                <vlog-list v-for="item in vlogList" :key="item" :item="item">
                </vlog-list>
                <not-added :item="'Vlog'" v-if="vlogList.length == 0" />
              </div>
            </q-tab-panel>

            <q-tab-panel name="events" class="event-panel">
              <keep-alive>
                <q-card>
                  <q-tabs
                    v-model="eventtab"
                    dense
                    class="rcp-tab"
                    active-color="primary"
                    indicator-color="primary"
                    align="left"
                    narrow-indicator
                    @update:model-value="changeEventTab"
                  >
                    <!-- <div class="flex"> -->
                    <div class="profile_tab_pill">
                      <q-tab name="host" label="Host" />
                      <q-tab name="intrested" label="Interested" />
                    </div>

                    <!-- </div> -->
                  </q-tabs>

                  <q-separator />
                  <q-tab-panels v-model="eventtab" infinite animated>
                    <q-tab-panel name="host">
                      <q-pull-to-refresh
                        @refresh="refresh"
                        scroll-target="body"
                        draggable="false"
                      >
                        <q-infinite-scroll
                          @load="getEvent"
                          :offset="350"
                          scroll-target="body"
                          ref="scrollEvent"
                        >
                          <host-event-box
                            v-for="event in events"
                            :key="event.slug"
                            :item="event"
                          />
                          <not-added
                            :item="'Event'"
                            v-if="!loading && events.length == 0"
                          />
                          <template v-slot:loading>
                            <div class="row justify-center q-my-md">
                              <q-spinner-dots
                                v-if="loading"
                                color="primary"
                                size="40px"
                              />
                              <!-- <span v-else color="primary" size="40px" >No More Data</span> -->
                            </div>
                          </template>
                        </q-infinite-scroll>
                      </q-pull-to-refresh>
                    </q-tab-panel>

                    <q-tab-panel name="intrested">
                      <keep-alive>
                        <q-pull-to-refresh
                          @refresh="refresh"
                          scroll-target="body"
                          draggable="false"
                        >
                          <q-infinite-scroll
                            @load="getEvent"
                            :offset="350"
                            scroll-target="body"
                          >
                            <host-event-box
                              v-for="event in events"
                              :key="event.slug"
                              :item="event"
                            />
                            <not-added
                              :item="'Event'"
                              v-if="!loading && events.length == 0"
                            />
                            <template v-slot:loading>
                              <div class="row justify-center q-my-md">
                                <q-spinner-dots
                                  v-if="loading"
                                  color="primary"
                                  size="40px"
                                />
                                <!-- <span v-else color="primary" size="40px" >No More Data</span> -->
                              </div>
                            </template>
                          </q-infinite-scroll>
                        </q-pull-to-refresh>
                      </keep-alive>
                    </q-tab-panel>
                  </q-tab-panels>
                </q-card>
              </keep-alive>
              <!-- <div class="full-width scroll-y" ref="scrollTargetEvents"> -->

              <!-- </div> -->
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
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
  import {
    computed,
    defineAsyncComponent,
    defineComponent,
    ref,
    watch,
  } from 'vue'
  import { useStore, mapGetters } from 'vuex'
  import { LocalStorage, useQuasar } from 'quasar'
  import VLOGS from 'src/content/vlogs.json'
  import api from '../../apis/index'
  import { onBeforeRouteUpdate, useRoute } from 'vue-router'
  import shareImage from 'src/composable/shareImage'
  import useDialog from 'src/composable/useDialog'
  import { getServerImageUrl } from 'src/utils/server-asset'
  import { Loading } from 'quasar'
  // import { log } from 'video.js'

  export default defineComponent({
    name: 'ProfileIndex',
    setup() {
      Loading.show()

      const $q = useQuasar()
      const store = useStore()
      const route = useRoute()
      const {
        allpopup,
        currentFrom,
        currentField,
        sendValue,
        sendDisplayField,
        dialogClass,
        open,
      } = useDialog()

      const { getProfileImage } = shareImage()

      const slug = ref(route.params.slug ?? null)

      const tab = ref(LocalStorage.getItem('profileViewTabs') ?? 'recipes')

      store.commit('home/setEvents', [])

      const loaded = ref(false)

      const currentUser = computed(() => {
        return store.getters['auth/getUser']
      })

      const user = computed(() => {
        if (slug.value && parseInt(slug.value) !== parseInt(currentUser.value.id)) {
          // console.log('slug', slug, currentUser.value.id);
          return store.getters['auth/getUserData']
        }
        return store.getters['auth/getUser']
      })

      const readMoreActivated = ref(false)
      const showReadMore = ref(false)
      const longText = computed(() => {
        return user.value.about ?? $q.lang.userProfile.view.noAbout;
      });

      if (longText.value.length > 70) {
        showReadMore.value = true
      }

      const isLoggedIn = computed(() => {
        return store.getters['auth/isLoggedIn']
      })

      const currentPage = ref(1)
      const currentRecipePage = ref(1)
      const limit = ref(5)
      const loading = ref(false)
      const eventtab = ref('host')

      const scrollRecipe = ref('body')
      const scrollEvent = ref('body')

      function fetchEvent() {
        if (slug.value == currentUser.value?.id) {
          var myevent = ''
          var myinterestedevent = ''
          if (eventtab.value === 'host') {
            myevent = 'myevent'
          } else {
            myinterestedevent = 'myinterestedevent'
          }

          const postData = {
            page: currentPage.value,
            limit: limit.value,
            myevent: myevent || [],
            myinterestedevent: myinterestedevent || [],
            order: 'u2c',
          }
          return store.dispatch('home/fetchEvents', postData)
        } else {
          var user_id = ''
          var userInterestedEvent = ''
          if (eventtab.value === 'host') {
            user_id = slug.value
          } else {
            userInterestedEvent = slug.value
          }

          const postData = {
            page: currentPage.value,
            limit: limit.value,
            user_id: user_id || [],
            userInterestedEvent: userInterestedEvent || [],
            order: 'u2c',
          }
          return store.dispatch('home/fetchEvents', postData)
        }
      }

      function fetchRecipe() {
        if (slug.value == currentUser.value.id) {
          const data = {
            myrecipe: 'myrecipe',
            page: currentRecipePage.value,
            limit: 6,
          }
          return store.dispatch('recipe/fetchMyRecipe', data)
        } else {
          const data = {
            user_id: slug.value,
            page: currentRecipePage.value,
            limit: 6,
          }
          return store.dispatch('recipe/fetchMyRecipe', data)
        }
      }

      async function getUserData(ini = false) {
        Loading.show()

        // slug = route.params.slug

        currentPage.value = 1
        currentRecipePage.value = 1

        if (!ini) {
          if (tab.value == 'recipes') {
            store.commit('recipe/setMyRecipe', [])
            scrollRecipe.value.stop()
            scrollRecipe.value.reset()
            scrollRecipe.value.resume()
          } else if (tab.value == 'events') {
            store.commit('home/setEvents', [])
            scrollEvent.value.stop()
            scrollEvent.value.reset()
            scrollEvent.value.resume()
          }
        }

        if (currentUser.value?.id == slug.value && isLoggedIn) {
          store.commit('auth/setUserData', [])
          store.commit('auth/setUserFollowers', [])
          store.commit('auth/setUserFollowing', [])

          await api.get(`/followers`).then((res) => {
            store.commit('auth/setFollowers', res.data)
          })
          await api.get(`/following`).then((res) => {
            store.commit('auth/setFollowing', res.data)
          })

          Loading.hide()
        } else {
          store.commit('auth/setUserData', [])

          store.dispatch('auth/userFollowing', slug.value)
          store.dispatch('auth/userFollowers', slug.value)

          await api.get(`/profile/${slug.value}`).then((res) => {
            store.commit('auth/setUserData', res.data)

            user.value = computed(() => {
              if (slug.value && parseInt(slug) !== parseInt(currentUser.value.id)) {
                // console.log('slug', slug, currentUser.value.id);
                return store.getters['auth/getUserData']
              }
              return store.getters['auth/getUser']
            })
            Loading.hide()
          })
        }
      }

      onBeforeRouteUpdate((to, from, next) => {
        console.log('onBeforeRouteUpdate', to, from);
        if (to.name == 'profile-view' && parseInt(to.params.slug) !== parseInt(from.params.slug)) {
          slug.value = to.params.slug
          getUserData()
        }
        next()
      });

      return {
        image_src : computed(() => {
          return getProfileImage(user.value?.images)
        }),
        route,
        allpopup,
        currentFrom,
        currentField,
        sendValue,
        sendDisplayField,
        dialogClass,
        open,
        currentUser,
        getServerImageUrl,
        getProfileImage,
        slug,
        followingData: {
          following_id: slug,
        },

        followers: computed(() => {
          if (currentUser.value?.id == slug.value && isLoggedIn) {
            return store.getters['auth/getFollowers']
          }
          else {
            return store.getters['auth/getUserFollowers']
          }
        }),
        following: computed(() => {
          if (currentUser.value?.id == slug.value && isLoggedIn) {
            return store.getters['auth/getFollowing']
          }
          else {
            return store.getters['auth/getUserFollowing']
          }
        }),
        // vlogList: VLOGS,
        writtenRecipe: computed(() => {
          return store.getters['recipe/myrecipes']
        }),
        recipe: ref([]),

        user,
        loaded,
        tab,
        longText,
        showReadMore,
        readMoreActivated,
        activateReadMore() {
          readMoreActivated.value = true
        },
        deactivateReadMore() {
          readMoreActivated.value = false
        },

        eventtab,
        eventTab: ref('host'),
        getUserProfilePicture: computed(() => {
          return store.getters['auth/getUserProfilePicture']
        }),
        scrollTargetEvent: ref(null),
        scrollTargetRecipes: ref(null),
        loading,
        currentPage,
        currentRecipePage,
        limit,
        fetchEvent,
        fetchRecipe,
        refresh(done) {
          store.commit('home/setEvents', [])
          currentPage.value = 1
          fetchEvent().then((res) => {
            if (res.success && res.data.data.length > 0) {
              loading.value = false
              done()
            } else {
              loading.value = false
            }
          })
        },
        refreshRecipe(done) {
          // store.commit('recipe/setMyRecipe', [])
          // currentRecipePage.value = 1
          // fetchRecipe()
          // fetchRecipe().then((res) => {
          //   if (res.success && res.data.length > 0) {
          //     loading.value = false
          //     done()
          //   } else {
          //     loading.value = false
          //   }
          // })
          done()
        },
        scrollRecipe,
        scrollEvent,

        setTab(val) {
          LocalStorage.set('profileViewTabs', val)
          tab.value = val
        },
        events: computed(() => {
          return store.getters['home/events']
        }),
        myInterested: computed(() => {
          return store.getters['home/getMyInterestedEvent']
        }),
        isLoggedIn,
        isLoggedInUser: computed(() => {
          return (
            user.value && user.value.id === store.getters['auth/getUser']?.id
          )
        }),
        scrollPosition: ref(null),
        getUserData,
      }
    },
    components: {
      'recipe-list': defineAsyncComponent(() =>
        import('src/components/common/recipe-list.vue')
      ),
      'vlog-list': defineAsyncComponent(() =>
        import('src/components/common/vlog-list.vue')
      ),
      'host-event-box': defineAsyncComponent(() =>
        import('src/components/home/host-event-box.vue')
      ),
      'not-added': defineAsyncComponent(() =>
        import('src/components/common/notAddedYet.vue')
      ),
    },
    methods: {
      async changeEventTab() {
        this.currentPage = 1
        await this.$store.commit('home/setEvents', [])
      },

      // refreshRecipe(done) {
      //   this.$store.commit('recipe/setMyRecipe', [])
      //   done()
      // },

      async getEvent(index, done) {
        // console.log('Getting event')
        this.loading = true
        this.fetchEvent().then((res) => {
          if (res.success && res.data.data.length > 0) {
            this.currentPage = this.currentPage + 1
            this.loading = false
            done()
          } else {
            this.loading = false
          }
        })
      },

      async getRecipe(index, done) {
        // console.log('Getting recipe')
        // this.$store.commit('recipe/setMyRecipe', [])
        // this.$store.commit('recipe/setMyRecipes', [])

        this.loading = true
        this.fetchRecipe().then((res) => {
          if (res.success && res.data.length > 0) {
            this.currentRecipePage = this.currentRecipePage + 1
            this.loading = false
            done()
          } else {
            this.loading = false
          }
        })
      },

      updateScroll() {
        this.scrollPosition = window.scrollY
      },

      editRecipe(id) {
        this.$store.dispatch('recipe/detailedRecipe', id).then((res) => {})
      },

      removeRecipeList(id) {
        this.$q
          .dialog({
            title: 'Confirm',
            message: `Are you sure you want to delete this recipe...?`,
            color: 'negative',
            ok: `Yes, I'm sure`,
            cancel: 'Cancel',
            default: 'cancel',
          })
          .onOk(() => {
            this.$store.dispatch('recipe/removeMyRecipe', id)
            api.delete(`/recipe/${id}`).then(() => {})
          })
      },

      followUser() {
        api
          .put('/follow', this.followingData)
          .then((res) => {
            api.get(`/followers/${this.slug}`).then((res) => {
              this.$store.commit('auth/setUserFollowers', res.data)
              const dataFollowing = {
                id: this.user.id,
                name: this.user.name,
              }
              this.$store.commit('auth/setMyFollowing', dataFollowing)
            })
          })
          .catch((err) => {})
      },
      UnFollowUser() {
        api
          .delete('/unfollow', this.followingData)
          .then((res) => {
            api.get(`/followers/${this.slug}`).then((res) => {
              this.$store.commit('auth/setUserFollowers', res.data)
              this.$store.commit('auth/setUnfollow', this.slug)
            })
          })
          .catch((err) => {})
      },
      isfollow() {
        for (var i = 0; i < this.followers.length; i++) {
          if (this.followers[i].id == this.currentUser.id) {
            return true
          }
        }
      },
    },
    created() {
      this.getUserData(true)

      window.addEventListener('scroll', this.updateScroll)
    },
    unmounted() {
      window.removeEventListener('scroll', this.updateScroll)
    },
    beforeRouteLeave() {
      this.$store.commit('recipe/recipeRefresh', [])
      this.$store.commit('recipe/setMyRecipe', [])
      this.$store.commit('recipe/setMyRecipes', [])
      this.$store.commit('recipe/setDetailedRecipes', [])
      this.$store.dispatch('recipe/resetRecipes', [])
      this.$store.dispatch('event/resetEvents')
      this.$store.dispatch('recipe/resetRecipes')
    },
  })
</script>
<style lang="scss">
  // $
  @import '../../css/profile.scss';

  .rcp-control {
    position: absolute;
    top: 10px;
    right: 0;
    display: block;
    i {
      margin-right: 5px;
      font-size: 16px;
      background: rgba(0, 0, 0, 0.5);
      @extend .border-radius;
      padding: 5px;
      color: $whight;
    }
  }

  .scrollY {
    overflow: scroll;
    height: 650px;
  }
  .event-panel {
    .q-tab {
      min-width: 100px;
    }
    .rcp-tab {
      margin-bottom: 0;
    }
  }
  .q-tab-panel {
    padding-top: 0;
  }
  .profile_tab_pill {
    padding: 15px 15px;
    display: flex;
    width: 100%;
  }
  .profile_tab_pill .q-tab {
    margin: 0 2% 0 0 !important;
    width: 48%;
  }
  .profile_tab_pill .q-tab:last-child {
    margin-right: 0 !important;
  }

  .q-tab-panel {
    padding-top: 0;
  }
  .profile_tab_pill {
    padding: 15px 15px;
    display: flex;
    width: 100%;
  }
  .profile_tab_pill .q-tab {
    margin: 0 2% 0 0 !important;
    width: 48%;
  }
  .profile_tab_pill .q-tab:last-child {
    margin-right: 0 !important;
  }
  .profile-view-top {
    display: flex;
    @extend .background1;
    align-items: center;
    padding: 15px 20px 25px;
    position: relative;
    i {
      font-size: 22px;
      margin-right: 15px;
    }
    h5 {
      text-transform: capitalize;
    }
    .sidebar-option {
      font-size: 30px;
      padding-top: 5px;
      padding-right: 15px;
    }
  }
  .profile-head {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    margin-top: -15px;
    background: #fff;
    position: relative;
  }
</style>
