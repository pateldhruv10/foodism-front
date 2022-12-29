<template>
  <div class="full-h event-participant-list">
    <q-card-section class="row items-center pop-head">
      <h6>{{ $q.lang.event.fields.participantList.label }}</h6>
      <q-space />
      <!-- <q-btn class="q-pa-none" flat
        ><q-img
          v-if="isUserProfile()"
          src="~assets/file-dwonload.svg"
          @click="download"
        ></q-img>
      </q-btn> -->
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <div class="common-inner">
      <div class="block-profile-box" v-for="n in data" :key="`${n}`">
        <div class="profile-left">
          <router-link
            :to="{ name: 'profile-view', params: { slug: n.user_id } }"
          >
            <user-image :user_image="n.user_id" />
          </router-link>
          <div class="profile-details">
            <div class="name ellipsis">
              <router-link
                :to="{ name: 'profile-view', params: { slug: n.user_id } }"
                >{{ n.full_name }}
              </router-link>
            </div>
            <!-- <div v-if="isUserProfile()" class="phno">{{ n.phone }}</div>
            <div v-if="isUserProfile()" class="email">{{ n.email }}</div> -->
          </div>
        </div>
        <div class="profile-right" v-if="user.id != n.user_id">
          <q-btn
            v-if="!isfollow(n.user_id)"
            class="btn2 text-capitalize"
            label="Follow"
            @click="!isLoggedIn ? open('is-logout') : followUser(n)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, defineAsyncComponent, computed } from 'vue'
import api from '../../apis/index'
import { Device } from '@capacitor/device'
import useDownload from 'src/composable/download'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'EventParticipants',
  props: {
    sendValue: {
      type: String,
      default: '',
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
    const { fileWrite } = useDownload()
    const data = ref([])
    const store = useStore()
    api
      .get(`event/${props.sendValue.participant[0].event_id}/participant`)
      .then((res) => {
        data.value = res.data
        console.log(data.value)
      })
      .catch((err) => {
        console.log(err)
      })

    const following = computed(() => {
      return store.getters['auth/getFollowing']
    })
    function isfollow(id) {
      for (var i = 0; i < following.value.length; i++) {
        if (following.value[i].id == id) {
          return true
        }
      }
    }
    return {
      data,
      user: computed(() => {
        return store.getters['auth/getUser']
      }),
      fileWrite,
      isfollow,
      isLoggedIn: computed(() => {
        return store.getters['auth/isLoggedIn']
      }),
    }
  },
  created() {
    this.isfollow()
  },
  methods: {
    followUser(n) {
      const followingData = {
        following_id: n.user_id,
      }
      api
        .put('/follow', followingData)
        .then((res) => {
          const dataFollowing = {
            id: n.user_id,
            name: n.full_name,
          }
          this.$store.commit('auth/setMyFollowing', dataFollowing)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async download() {
      const info = await Device.getInfo()
      return await api
        .get(
          `event/${this.sendValue.participant[0].event_id}/participant/download`
        )
        .then((res) => {
          var fileURL = window.URL.createObjectURL(new Blob([res]))
          var fileLink = document.createElement('a')

          fileLink.href = fileURL
          var today = new Date().getTime()
          const fileName = 'file_' + today + '.csv'
          fileLink.setAttribute('download', fileName)
          if (info && ['android', 'ios'].includes(info.platform)) {
            this.fileWrite(res, fileName)
          } else {
            document.body.appendChild(fileLink)
            fileLink.click()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    isUserProfile() {
      if (this.user.id == this.sendValue.createdBy.id) {
        return true
      } else {
        return false
      }
    },
  },
})
</script>

<style lang="scss">
// $
.event-participant-list {
  .pop-head {
    // background: #d1fad7;
    border-radius: 0;
    padding-bottom: 30px;
    .q-img {
      width: 30px;
    }
  }
  .pop-head::after {
    background: #ffffff;
    height: 15px;
    width: 100%;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .common-inner {
    padding: 100px 20px 0;
  }
  .block-profile-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 0 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid $bg5;
    .profile-left {
      display: flex;
      align-items: center;
      width: calc(100% - 100px);
      .q-img {
        width: 60px;
        height: 60px;
        @extend .border-radius2;
        img{
          object-fit: fill !important;
        }
      }
      .profile-details {
        margin-left: 15px;
        width: 80%;
        .name {
          font-size: 16px;
          @extend .primary-font-semibold;
          line-height: 1;
          padding-bottom: 5px;
        }
        .phno {
          font-size: 15px;
          color: $text-color2;
          line-height: 1;
          padding-bottom: 5px;
        }
        .email {
          font-size: 15px;
          color: $text-color2;
          line-height: 1;
          max-width: 175px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .profile-right {
      .q-btn {
        @extend .border-radius2;
        @extend .primary-font-semibold;
      }
    }
  }
}
</style>
