<template>
  <div class="bites-post">
    <!-- <user-head  /> (as of now this component not working so i put static code)-->
    <div class="user-box">
        <div class="user-head flex items-center">
          <div class="user-head-left">
            <div class="user-img">
              <router-link to=""><q-img src="~assets/pr-pic.svg"></q-img></router-link>
            </div>
            <div class="user-detail">
              <p class="user-name">
                <router-link to="">
                  sameeksha joshi
                </router-link>
                <!-- at <span>{{ user.city_id.name }}</span> -->
              </p>
              <p class="post-time">15 hours ago</p>
            </div>
          </div>
          <div class="user-head-right">
            <ul>
              <li>
                <q-btn class="btn3 text-capitalize" label="Follow" />
              </li>
              <li>
                <q-icon
                  name="las la-ellipsis-v"
                  @click="open('user-option', useroption)"
                ></q-icon>
              </li>
            </ul>
          </div>
        </div>
      </div>
    <div class="bites-title">
      <h5>{{ item?.name }}</h5>
    </div>
    <div class="bites-thumb">
      <router-link :to="{ name: 'vlog-detail'}">
        <div v-if="item.image" class="img-after-upload">
          <q-img class="upload-img" :src="item?.image" alt="image" />
        </div>
        <div class="video-btn">
          <q-img src="~assets/video.svg"></q-img>
          <!-- <img src="" /> -->
        </div>
      </router-link>
    </div>
    <!-- <div class="bites-video">
      <router-link class="flex relative-position" to="">
        <video class="video-cus" style="width: 100%" controls>
          <source type="video/mp4" :src="item?.video" />
        </video>
      </router-link>
    </div> -->
    <reaction-box />
    <post-bottom>
      <template v-slot:left>
        <li @click="open('emoji-selection', emojiselection)">
          <img src="~assets/like.svg" />
        </li>
        <li @click="open('share-popup', share)">
          <img src="~assets/share.svg" />
        </li>
      </template>

      <template v-slot:right>
        <li v-if="item && item.user_id !== user?.id">
          <img
            v-if="isBookmarked()"
            src="~assets/bookmark-fill.svg"
            @click="removeBookmark(item.id)"
          />
          <img
            v-else
            src="~assets/bookmark.svg"
            @click="bookmarkEvent(bookmarkData)"
          />
        </li>
      </template>
    </post-bottom>
    <div class="col-12 q-pt-lg">
      <div class="relative-position">
        <p class="detail-title">
          {{ $q.lang.vlog.fields.videoCategory.label }}
        </p>
      </div>
      <div class="taglist">
        <ul>
          <li v-for="item in item.video_category" :key="item">
            <q-btn :label="item" />
          </li>
        </ul>
      </div>
    </div>
    <!-- <div class="col-12 bites-dis">
      <p>{{ item.desc }}</p>
      <div v-if="item.image" class="img-after-upload">
        <q-img class="upload-img" :src="item?.image" alt="image" />
      </div>
    </div> -->
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
import { defineAsyncComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import useDialog from 'src/composable/useDialog'

export default {
  name: 'VlogCardBox',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    'post-bottom': defineAsyncComponent(() =>
      import('components/common/post-bottom.vue')
    ),
    'reaction-box': defineAsyncComponent(() =>
      import('components/common/reaction-box.vue')
    ),
    'user-option': defineAsyncComponent(() =>
      import('../common/user-option.vue')
    ),
    'emoji-selection': defineAsyncComponent(() =>
      import('../common/emoji-selection.vue')
    ),
    'share-popup': defineAsyncComponent(() =>
      import('../common/share-popup.vue')
    ),
  },
  setup() {
    const useroption = ref(false)
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
    return {
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
      user: computed(() => {
        return store.getters['auth/getUser']
      }),
      useroption,
      setValue(data) {
        console.log(data)
        this.allpopup = false
        this[`${data.field}`] = data.value
      },
    }
  },
  methods: {
    bookmarkEvent() {
      this.isBookmarked()
    },
    isBookmarked() {
      const ev = this.$store.state.event.fev_events
      return ev && ev.find((c) => c.id == this.item.id)
    },
  },
}
</script>
<style lang="scss">
// $
.bites-post {
  .bites-title {
    h5 {
      font-size: 20px;
      padding-bottom: 5px;
      position: relative;
    }
  }
  .bites-video {
    video {
      @extend .border-radius3;
    }
  }
  .reaction-box {
    padding: 5px 0px;
  }
  .bites-thumb{
    position: relative;
    .video-btn{
      width: 100%;
      position: absolute;
      display: flex;
      top: 0;
      height: 100%;
      justify-content: center;
      align-items: center;
      .q-img{
        width: 50px;
        height: 50px;
        img{
          width: 50px;
          height: 50px;
        }
      }
    }
  }
}
@import '../../css/page/vlog.scss';
</style>
