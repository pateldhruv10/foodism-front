<template>
  <div class="recipe-box">
    <div class="recipe-head flex items-center">
      <div class="rec-user-img">
        <router-link to="">
          <user-image :user_image="item.user_id" />
          ></router-link
        >
      </div>
      <div class="rec-user-detail">
        <p class="user-name">
          <router-link to=""
            >{{ item.createdBy.name }}
            <q-img
              class="verified-account"
              src="~assets/verified-full.svg"
            ></q-img
          ></router-link>
          <!-- <router-link to="">{{ item?.createdBy?.name }}</router-link> -->
        </p>
        <p class="post-time">{{ getHumanReadable(item.created_at) }}</p>
      </div>
      <div class="recipe-head-right">
        <ul>
          <li><q-btn class="btn3 text-capitalize" label="Follow" /></li>
          <li>
            <q-icon
              name="las la-ellipsis-v"
              @click="open('user-option', useroption)"
            ></q-icon>
          </li>
        </ul>
      </div>
    </div>
    <div class="recipe-title">
      <h5>
        <router-link :to="{ name: 'recipe-details' }">
          {{ item.name }}</router-link
        >
      </h5>
    </div>
    <div class="recipe-img">
      <router-link
        class="flex relative-position"
        :to="{ name: 'recipe-details' }"
      >
        <q-img :src="getImg(item.cover_photo)" :loading="eager" :decoding="async" :crossorigin="anonymous"></q-img>
        <div class="user-view">
          <div class="view-count">320 views</div>
          <div class="time-count">{{ item.cookingTime }} min</div>
        </div>
      </router-link>
    </div>
    <reaction-box />
    <div class="recipe-bottom">
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
          <li v-if="item && item.user_id !== user.id">
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
import { defineAsyncComponent, ref, computed } from 'vue'
import useDialog from 'src/composable/useDialog'
import { useStore } from 'vuex'
import shareImage from 'src/composable/shareImage'
export default {
  name: 'RecipeCardBox',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    'reaction-box': defineAsyncComponent(() =>
      import('components/common/reaction-box.vue')
    ),
    'user-option': defineAsyncComponent(() =>
      import('../common/user-option.vue')
    ),
    'post-bottom': defineAsyncComponent(() =>
      import('components/common/post-bottom.vue')
    ),
    'emoji-selection': defineAsyncComponent(() =>
      import('../common/emoji-selection.vue')
    ),
    'share-popup': defineAsyncComponent(() =>
      import('../common/share-popup.vue')
    ),
    'user-image': defineAsyncComponent(() =>
      import('src/components/user/user-image.vue')
    ),
  },
  setup(props) {
    const { showImage, GetUrl, getImg } = shareImage()

    const {
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
    } = useDialog()
    const useroption = ref(false)
    const store = useStore()
    return {
      showImage,
      GetUrl,
      getImg,
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
      useroption,
      setValue(data) {
        console.log(data)
        this.allpopup = false
        this[`${data.field}`] = data.value
      },
      share: computed(() => {
        return {
          type: 'recipe-details',
          title: props.item.name,
          images: props.item.cover_photo,
          date: props.item.created_at,
          slug: props.item.id,
        }
      }),
      user: computed(() => {
        return store.getters['auth/getUser']
      }),
    }
  },
  methods: {
    isBookmarked() {
      const ev = this.$store.state.event.fev_events
      return ev.find((c) => c.id == this.item.id)
    },
  },

  name: 'RecipeCards',
}
</script>
<style lang="scss">
// $
@import '../../css/components/recipe-cards.scss';
</style>
