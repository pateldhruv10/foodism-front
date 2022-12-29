<template>
  <div class="user-box">
    <div class="user-head flex items-center">
      <div class="user-head-left">
        <div class="user-img">
          <router-link
            :to="{ name: 'profile-view', params: { slug: user?.id } }"
          >
            <user-image v-if="user" :user_image="user.id" />
          </router-link>
        </div>

        <div class="user-detail">
          <p class="user-name">
            <router-link
              :to="{ name: 'profile-view', params: { slug: user?.id } }"
            >
              {{ user.name }}
            </router-link>
          </p>
          <p v-if="time" class="post-time">{{ getHumanReadable(time) }}</p>
        </div>
      </div>
      <div class="user-head-right">
        <ul>
          <li v-if="currentUser && currentUser.id !== user.id">
            <q-btn
              v-if="!isfollow()"
              class="btn2 text-capitalize"
              label="Follow"
              @click="!isLoggedIn ? open('is-logout') : followUser()"
            />
          </li>
          <li v-else>
            <q-btn
              v-if="!isLoggedIn"
              class="btn2 text-capitalize"
              label="Follow"
              @click="!isLoggedIn ? open('is-logout') : followUser()"
            />
          </li>

          <li v-if="currentUser && currentUser.id == user.id && editLink" class="de-btn q-mr-sm">
            <!-- <routlink :to="editLink"><i class="las la-pen"></i></routlink> -->
            <q-btn

              class="text-capitalize"
              icon="edit"
              :to="editLink"
            />
          </li>

          <!-- Delete button will inject in below element -->
          <!-- <li><routlink :to="editLink"><i class="las la-trash"></i></routlink></li> -->
          <slot name="delete" />
          <!-- <li class="q-mx-sm back-btn"><q-icon name="las la-times-circle"></q-icon>
          </li> -->
          <li>
            <q-icon
              v-if="isLoggedIn && currentUser && currentUser.id !== user.id"
              name="las la-ellipsis-v"
              @click="open('user-option', useroption, user.id)"
            ></q-icon>
          </li>

        </ul>
      </div>
    </div>
  </div>
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
import { useStore } from 'vuex'
import { computed, defineAsyncComponent, ref } from 'vue'
import useDialog from 'src/composable/useDialog'
import api from 'src/apis'

export default {
  name: 'UserHead',
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
    editLink: {
      type: String,
      default: null,
    },
    deleteLink: {
      type: String,
      default: null,
    },
    time: {
      type: String,
      default: null,
    },
  },
  components: {
    'user-option': defineAsyncComponent(() =>
      import('../../components/common/user-option.vue')
    ),
    'user-image': defineAsyncComponent(() => import('./user-image.vue')),
  },
  setup(props) {
    const store = useStore()
    const useroption = ref(false)

    const currentUser = computed(() => {
      return store.getters['auth/getUser']
    })
    const following = computed(() => {
      return store.getters['auth/getFollowing']
    })
    function isfollow() {
      for (var i = 0; i < following.value.length; i++) {
        if (following.value[i].id == props.user.id) {
          return true
        }
      }
    }
    const {
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
    } = useDialog()
    return {
      store,
      followingData: {
        following_id: props.user.id,
      },

      useroption,
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
      setValue(data) {
        allpopup.value = false
        // this[`${data.field}`] = data.value
      },
      currentUser,
      isfollow,
      isLoggedIn: computed(() => {
        return store.getters['auth/isLoggedIn']
      }),
    }
  },
  computed: {
    currentRouteName() {
      return this.$route.name
    },
  },
  methods: {
    goback(){
      history.go(-1)
    },
    followUser() {
      api
        .put('/follow', this.followingData)
        .then((res) => {
          if (this.currentRouteName == 'profile-view') {
            api.get(`/followers/${this.user.id}`).then((res) => {
              this.$store.commit('auth/setUserFollowers', res.data)
              const dataFollowing = {
                id: this.user.id,
                name: this.user.name,
              }
              this.$store.commit('auth/setMyFollowing', dataFollowing)
            })
          } else {
            const dataFollowing = {
              id: this.user.id,
              name: this.user.name,
            }
            this.$store.commit('auth/setMyFollowing', dataFollowing)
            console.log(res)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  created() {
    this.isfollow()
  },
}
</script>
<style lang="scss">
// $
@import '../../css/components/user-box.scss';
</style>
