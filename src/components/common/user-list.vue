<template>
  <div class="user-list" v-for="item in userList" :key="item">
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
      </div>
    </div>
    <div class="profile-right" v-if="currentUser && currentUser.id == user">
      <q-btn
        v-if="currentRouteName === 'subscribers-list'"
        class="btn2 text-capitalize"
        label="Remove"
        @click="removeSubscriber(item.id)"
      />
      <q-btn
        v-if="currentRouteName === 'following-list'"
        class="btn2 text-capitalize"
        label="Unfollow"
        @click="UnFollowUser(item.id)"
      />
    </div>
    <div class="profile-right" v-else>
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
import api from '../../apis/index'
import { defineComponent, defineAsyncComponent, computed, watch } from 'vue'
import { useStore } from 'vuex'
import useDialog from 'src/composable/useDialog'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'

export default defineComponent({
  props: {
    user: {
      type: Number,
      default: null,
    },
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
  setup(props) {
    const $q = useQuasar()
    const store = useStore()
    const route = useRoute()

    const {
      allpopup,
      currentFrom,
      currentField,
      dialogClass,
      open
    } = useDialog()

    const currentUser = computed(() => {
      return store.getters['auth/getUser']
    })

    const following = computed(() => {
      return store.getters['auth/getFollowing']
    })

    const subscribers = computed(() => {
      return store.getters['auth/getFollowers']
    })

    const currentRouteName = computed(() => {
      return route.name
    })

    const userList = computed(() => {
      console.log("Computed", currentRouteName.value);
      if (currentRouteName.value === 'following-list') {
        if (parseInt(currentUser.value.id) !== parseInt(props.user)) {
          return store.getters['auth/getUserFollowing']
        }
        return store.getters['auth/getFollowing'];
      } else {
        if (parseInt(currentUser.value.id) !== parseInt(props.user)) {
          return store.getters['auth/getUserFollowers']
        }
        return store.getters['auth/getFollowers']
      }
    });

    return {
      allpopup,
      currentFrom,
      currentField,
      dialogClass,
      open,
      following,
      currentUser,
      userList,
      subscribers,
      isLoggedIn: computed(() => {
        return store.getters['auth/isLoggedIn']
      }),
    }
  },
  methods: {
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
    removeSubscriber(id) {
      this.$q
        .dialog({
          title: 'Confirm',
          message: `Are you sure you want to remove this Subscribers...?`,
          color: 'negative',
          ok: `Yes, I'm sure`,
          cancel: 'Cancel',
          default: 'cancel',
        })
        .onOk(() => {
          this.$store.commit('auth/setUserListFollowers', id)
          api.delete(`/followers/remove/${id}`).then(() => {})
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
.user-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 0 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid $bg5;
  .profile-left {
    display: flex;
    align-items: center;
    .q-img {
      width: 60px;
      max-height: 60px;
      @extend .border-radius2;
    }
    .default-profile-img{
      .q-img{
        .q-img__container{
          display: flex;
          @extend .background1;
          justify-content: center;
          align-items: center;
          img{
            width: auto;
            height: 66%;
            border-radius: 0;
          }
        }
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
      @extend .primary-font-semibold;
      min-width: 100px;
    }
  }
}
</style>
