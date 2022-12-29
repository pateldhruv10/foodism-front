<template>
  <q-drawer
    class="sidebar-menu"
    v-model="drawerState"
    overlay
    :width="$q.screen.width"
    :breakpoint="0"
    bordered
  >
    <q-img
      class="absolute-top"
      src="../../assets/dr-bg.png"
      style="height: 250px"
    >
      <div class="absolute-top bg-transparent">
        <div class="sidebar-top flex items-center">
          <q-avatar size="80px" class="user-custom-img q-mb-sm">
           <user-image :user_image="user.id" />
          </q-avatar>
          <div class="user-dt">
            <div class="text-weight-bold user-name">{{ user?.name }}</div>
            <div class="user-lc">{{ user.handler ? `@${user?.handler}` : '-' }}</div>
          </div>
        </div>
        <div class="absolute-right sidebar-option">
          <span
            @click="$store.commit('master/toggleDrawer')"
            class="material-icons"
            >menu</span
          >
        </div>
      </div>
    </q-img>
    <q-scroll-area
      style="
        height: calc(100% - 200px);
        margin-top: 200px;
        border-right: 1px solid #ddd;
      "
    >
      <q-list class="q-pa-md menu-list">
        <!-- <q-item clickable v-ripple>
          <q-item-section>
            <router-link :to="{ name: 'referearn' }">
              <div
                class="sidebar-list"
                @click="$store.commit('master/toggleDrawer')"
              >
                <q-img src="~assets/refer-earn.svg"></q-img>
                <span>{{ $q.lang.common.sidebar.refer }}</span>
              </div>
            </router-link>
          </q-item-section>
        </q-item> -->
        <!-- <q-item clickable v-ripple>
          <q-item-section>
            <router-link :to="{ name: 'rewards' }">
              <div
                class="sidebar-list"
                @click="$store.commit('master/toggleDrawer')"
              >
                <q-img src="~assets/rewards.svg"></q-img>
                <span>{{ $q.lang.common.sidebar.reward }}</span>
              </div>
            </router-link>
          </q-item-section>
        </q-item> -->
        <q-item clickable v-ripple>
          <q-item-section>
            <router-link :to="{ name: 'user-edit' }">
              <div
                class="sidebar-list"
                @click="$store.commit('master/toggleDrawer')"
              >
                <q-img src="~assets/edit-profile.svg"></q-img>
                <span>{{ $q.lang.common.sidebar.editProfile }}</span>
              </div>
            </router-link>
          </q-item-section>
        </q-item>
        <q-item active clickable v-ripple>
          <q-item-section>
            <router-link :to="{ name: 'draft' }">
              <div
                class="sidebar-list"
                @click="$store.commit('master/toggleDrawer')"
              >
                <q-img src="~assets/draft.svg"></q-img>
                <span>{{ $q.lang.common.sidebar.drafts }}</span>
              </div>
            </router-link>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            <router-link :to="{ name: 'myFavourite' }">
              <div
                class="sidebar-list"
                @click="$store.commit('master/toggleDrawer')"
              >
                <q-img src="~assets/bookmark.svg"></q-img>
                <span>{{ $q.lang.common.sidebar.myFavorites }}</span>
              </div>
            </router-link>
          </q-item-section>
        </q-item>
        <!-- <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="person_add_alt" />
          </q-item-section>

          <q-item-section>
            <router-link to=""><span>Create Business Profile</span></router-link>
          </q-item-section>
        </q-item> -->
        <q-item clickable v-ripple>
          <q-item-section>
            <router-link :to="{ name: 'policies' }">
              <div
                class="sidebar-list"
                @click="$store.commit('master/toggleDrawer')"
              >
                <q-img src="~assets/policies.svg"></q-img>
                <span>{{ $q.lang.common.sidebar.policies }}</span>
              </div>
            </router-link>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            <router-link :to="{ name: 'settings' }">
              <div
                class="sidebar-list"
                @click="$store.commit('master/toggleDrawer')"
              >
                <q-img src="~assets/Settings.svg"></q-img>
                <span>{{ $q.lang.common.sidebar.settings }}</span>
              </div>
            </router-link>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            <router-link :to="{ name: 'support' }">
              <div
                class="sidebar-list"
                @click="$store.commit('master/toggleDrawer')"
              >
                <q-img src="~assets/Support-new-black.png"></q-img>
                <span>{{ $q.lang.common.sidebar.support }}</span>
              </div>
            </router-link>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            <router-link :to="{ name: 'eligibility' }">
              <div
                class="sidebar-list"
                @click="$store.commit('master/toggleDrawer')"
              >
                <q-img src="~assets/flp.png"></q-img>
                <span>FLP</span>
              </div>
            </router-link>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            <router-link :to="{ name: 'refer' }">
              <div
                class="sidebar-list"
                @click="$store.commit('master/toggleDrawer')"
              >
                <q-img src="~assets/refer-earn.png"></q-img>
                <span>Refer & Earn</span>
              </div>
            </router-link>
          </q-item-section>
        </q-item>
        <!-- <q-item clickable v-ripple>
          <q-item-section>
            <router-link :to="{ name: 'feedback' }">
              <div
                class="sidebar-list"
                @click="$store.commit('master/toggleDrawer')"
              >
                <q-img src="~assets/Feedback.svg"></q-img>
                <span>{{ $q.lang.common.sidebar.feedback }}</span>
              </div>
            </router-link>
          </q-item-section>
        </q-item> -->
        <q-item clickable v-ripple>
          <q-item-section>
            <div
              class="sidebar-list"
              @click="logout(), $store.commit('master/toggleDrawer')"
            >
              <q-img src="~assets/logout.svg"></q-img>
              <span>{{ $q.lang.common.sidebar.logout }}</span>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
  import {
    computed,
    defineComponent,
    defineAsyncComponent,
    onMounted,
  } from 'vue'
  import { mapGetters, mapActions, useStore } from 'vuex'
  import { openURL } from 'quasar'
  import { App } from '@capacitor/app'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    name: 'Sidebar',
    setup() {
      const store = useStore()

      const lowercase = computed((val) => {
        return val.toLowerCase()
      })

      const router = useRouter()

      const drawer = store.getters['master/drawerState']

      onMounted(() => {
        App.addListener('backButton', (data) => {
          if (data.canGoBack && store.getters['master/drawerState'] == true) {
            store.commit('master/toggleDrawer')
          }
          // else {
          //   router.go(-1)
          // }
        })
      })

      return {
        lowercase,
        gotoURL(url) {
          openURL(url)
        },
      }
    },
    components: {
      'user-image': defineAsyncComponent(() =>
        import(
          /* webpackChunkName: "user-image" */
          /* webpackMode: "lazy" */
          'components/user/user-image.vue'
        )
      ),
    },
    methods: {
      ...mapActions({
        logout: 'auth/logout',
      }),
      goToeditProfile() {
        this.$store.commit('master/toggleDrawer')
        this.$router.push({ name: 'user-edit' })
      },
      onKeyDown(e) {
        this.$store.commit('master/toggleDrawer')
      },
      deviceReady() {
        console.log('ready ready')
        document.addEventListener('backbutton', this.onKeyDown, false)
        return false
      },
    },

    computed: {
      ...mapGetters({
        user: 'auth/getUser',
        profilePicture: 'auth/getUserProfilePicture',
        drawerState: 'master/drawerState',
      }),
    },
  })
</script>
<style lang="scss">
  // $
  .sidebar-menu {
    .sidebar-top {
      padding-left: 15px;
      padding-top: 15px;
      .q-avatar {
        .q-img {
        display: block !important;
          height: 100%;
        }
      }
      .default-profile-img {
        width: 80px;
        height: 80px;
        .q-img {
          .q-img__container {
            img {
              height: auto;
            }
          }
        }
      }
    }
    .user-lc {
      text-transform: lowercase !important;
    }
    .sidebar-option {
      padding: 15px;
      font-size: 30px;
      color: $text-color1;
    }
  }
  .user-custom-img {
    .q-img>div {
      padding-bottom: 0 !important;
    }

    .q-img .q-img__container {
      position: inherit;
    }
  }
</style>
