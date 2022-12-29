<template>
  <div class="search-profile-box">
    <router-link  :to="{ name: 'profile-view', params: { slug: item.id } }">
    <div class="profile-left">
      <router-link :to="{ name: 'profile-view', params: { slug: item.id } }">
        <user-image :user_image="item.id" />
      </router-link>
      <div class="profile-details">
        <div class="name">
          <router-link :to="{ name: 'profile-view', params: { slug: item.id } }"
            >{{ item.name }}
          </router-link>
        </div>
        <div class="location">{{getCity(item.city_id)}}</div>
      </div>
    </div>
    </router-link>
    <div class="profile-right">
      <span v-if="currentUser && currentUser.id != item.id">
        <q-btn
          v-if="!isfollow(item.id)"
          class="btn2 text-capitalize"
          label="Follow"
          @click="!isLoggedIn ? open('is-logout') : followUser(item)"
        />
        <q-btn
          v-else
          class="btn3 text-capitalize"
          label="Unfollow"
          @click="!isLoggedIn ? open('is-logout') : UnFollowUser(item.id)"
        />
      </span>
    </div>
  </div>
  <q-dialog v-model="allpopup" position="bottom" :class="dialogClass">
    <component
      :is="currentFrom"
      :sendValue="sendValue"
      :fieldName="currentField"
      v-on:selectValue="setValue"
    ></component>
  </q-dialog>
</template>

<script>
import useDialog from 'src/composable/useDialog'
import api from '../../apis/index'
import { computed, defineAsyncComponent, defineComponent, ref } from 'vue'
import { mapGetters, useStore } from 'vuex'

export default defineComponent({
  name: 'SearchProfile',
  props: {
    item: {
      type: Object || Array,
    },
  },
  setup() {
    const { allpopup, currentFrom, currentField, dialogClass, open } =
      useDialog()
    const store = useStore()
    const currentUser = computed(() => {
      return store.getters['auth/getUser']
    })
    const following = computed(() => {
      return store.getters['auth/getFollowing']
    })
    const userList = computed(() => {
      return this.$store.getters['auth/getFollowing']
    })
    const isLoggedIn = computed(() => {
      return store.getters['auth/isLoggedIn']
    })
    return {
      following,
      currentUser,
      userList,
      isLoggedIn,
      allpopup,
      currentFrom,
      currentField,
      dialogClass,
      open,
    }
  },
    computed:{
    ...mapGetters({
      city: 'master/getCities',
    }),
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
    getCity(id) {
      return this.city.find((item) => item.id === id)?.name
    },
    followUser(item) {
      const followingData = {
        following_id: item.id,
      }
      api
        .put('/follow', followingData)
        .then((res) => {
          const dataFollowing = {
            id: item.id,
            name: item.name,
          }
          this.$store.commit('auth/setMyFollowing', dataFollowing)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    UnFollowUser(id) {
      this.$q
        .dialog({
          title: 'Confirm',
          message: `Are you sure you want to remove this Following...?`,
          color: 'negative',
          ok: `Yes, I'm sure`,
          cancel: 'Cancel',
          default: 'cancel',
        })
        .onOk(() => {
          const followingData = {
            following_id: id,
          }
          api
            .delete('/unfollow', followingData)
            .then((res) => {
              this.$store.commit('auth/setUserListFollowing', id)
              this.$store.commit('auth/setUnfollow', id)
              console.log(res)
            })
            .catch((err) => {
              console.log(err)
            })
        })
    },
    isfollow(id) {
      for (var i = 0; i < this.following.length; i++) {
        if (this.following[i].id == id) {
          return true
        }
        // else if (this.currentUser.id == id) {
        //   return true
        // }
      }
    },
  },
})
</script>
<style lang="scss">
// $
.search-profile-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid $bg5;
  .profile-left {
    display: flex;
    align-items: center;
    .q-img {
      width: 60px;
      max-height: 60px;
      @extend .border-radius2;
      img{
        object-fit:fill !important;
      }
    }
    .profile-details {
      margin-left: 15px;
      .name {
        font-size: 18px;
        @extend .primary-font-semibold;
      }
      .location {
        font-size: 16px;
        color: $text-color2;
      }
    }
  }
  .profile-right {
    .q-btn {
      @extend .border-radius2;
    }
  }
}
</style>
