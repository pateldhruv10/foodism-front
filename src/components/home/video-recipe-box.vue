<template>
  <div class="recipe-box">
    <div class="recipe-head">
      <user-head
        :user="item?.createdBy"
        :time="item?.created_at"
      >
        <template v-slot:delete>
          <li
            v-if="
              user &&
              item?.createdBy &&
              item?.createdBy.id == user?.id &&
              deleteLink
            "
            class="de-btn"
          >
            <q-btn
              class="text-capitalize"
              icon="delete"
              @click="deleteItem()"
            />
          </li>
        </template>
      </user-head>
    </div>
    <div class="video-cus">
      <div class="video-recipes">
        <video-player
          ref="videoPlayer"
          class="vjs-custom-skin"
          :options="playerOptions"
          @play="onPlayerPlay($event)"
          @ready="onPlayerReady($event)"
        ></video-player>
      </div>
      <!-- <div class="user-view">
        <div class="view-count">320 views</div>
        <div class="time-count">125 min</div>
      </div> -->
    </div>
    <reaction-box :item="reactionBox" />
    <div class="recipe-bottom">
      <post-bottom>
        <template v-slot:left>
          <li
            @click="
              !isLoggedIn ? open('is-logout') : open('emoji-selection', item)
            "
          >
            <img
              v-if="
                isLoggedIn &&
                reactionBox.recipeReaction &&
                reactionBox.recipeReaction.reaction &&
                reactionBox.recipeReaction.reaction !== 'Clear'
              "
              src="~assets/like_colour.svg"
            />

            <img
              v-else-if="
                isLoggedIn &&
                !reactionBox.recipeReaction &&
                reactionBox.reaction &&
                reactionBox.reaction !== 'Clear'
              "
              src="~assets/likeRed.png"
            />
            <img v-else src="~assets/likeThick.png" />
          </li>
          <li
            @click="
              !isLoggedIn ? open('is-logout') : open('share-popup', share)
            "
          >
            <img src="~assets/share.svg" />
          </li>
        </template>

        <template v-slot:right>
          <li v-if="isLoggedIn && item && item?.user_id !== user?.id">
            <img
              v-if="isBookmarked()"
              src="~assets/bookmark-fill.svg"
              @click="removeRecipeBookmark(item.id)"
            />
            <img
              v-else
              src="~assets/bookmark.svg"
              @click="
                !isLoggedIn ? open('is-logout') : bookmarkRecipe(bookmarkData)
              "
            />
          </li>
          <li>
            <img
              v-if="!isLoggedIn"
              src="~assets/bookmark.svg"
              @click="
                !isLoggedIn ? open('is-logout') : bookmarkRecipe(bookmarkData)
              "
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
      v-on:selectReaction="reaction"
      v-on:selectValue="setValue"
    ></component>
  </q-dialog>
</template>
<script>
  import { defineAsyncComponent, ref, computed } from 'vue'
  import useDialog from 'src/composable/useDialog'
  import VideoPlayer from 'src/components/player/video.vue'
  import { mapActions, useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  export default {
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    setup(props, { emit }) {
      const useroption = ref(false)
      const store = useStore()

      const router = useRoute()
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
        recipe: computed(() => {
          return store.getters['recipe/getMyRecipes']
        }),
        playerOptions: {
          autoplay: true,
          controls: true,
          controlBar: {
            timeDivider: false,
            durationDisplay: false,
          },
        },
        useroption,
        setValue(data) {
          console.log(data)
          this.allpopup = false
          this[`${data.field}`] = data.value
        },
        allpopup,
        currentFrom,
        currentField,
        sendValue,
        sendDisplayField,
        dialogClass,
        open,
        isLoggedIn: computed(() => {
          return store.getters['auth/isLoggedIn']
        }),
        bookmarkData: computed(() => {
          // alert(props.item.cover_photo)
          return {
            id: props.item.id,
            name: props.item.name,
            image:
              props.item.cover_photo && props.item.cover_photo
                ? props.item.cover_photo
                : null,
            slug: props.item.slug,
          }
        }),
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
        reactionBox: computed(() => {
          if (router.name == 'recipe-details') {
            return {
              reactionCount: props.item.count.reactionCount ?? 0,
              iMadeItCount: props.item.count.iMadeItCount ?? 0,
              reaction: props.item.recipeReaction?.reaction,
              reactions: props.item.reaction,
            }
          } else {
            return {
              reactionCount:
                props.item.reactionCount ?? props.item.count.reactionCount ?? 0,
              iMadeItCount:
                props.item.iMadeItCount ?? props.item.count.iMadeItCount ?? 0,
              reaction:
                props.item.reaction ?? props.item.recipeReaction?.reaction,
              reactions: props.item.reactions,
            }
          }
        }),
      }
    },
    components: {
      VideoPlayer,
      'reaction-box': defineAsyncComponent(() =>
        import('components/common/reaction-box.vue')
      ),
      'user-option': defineAsyncComponent(() =>
        import('components/common/user-option.vue')
      ),
      'post-bottom': defineAsyncComponent(() =>
        import('components/common/post-bottom.vue')
      ),
      'emoji-selection': defineAsyncComponent(() =>
        import('components/common/emoji-selection.vue')
      ),
      'share-popup': defineAsyncComponent(() =>
        import('components/common/share-popup.vue')
      ),
    },
    name: 'VideoRecipeCards',
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      },
    },
    methods: {
      ...mapActions('recipe', ['bookmarkRecipe', 'removeRecipeBookmark']),
      // detailview(id){
      //   this.$store.dispatch('recipe/detailedRecipe', id)
      // },
      isBookmarked() {
        const ev = this.$store.state.recipe.fev_recipes
        return ev.find((c) => c.id == this.item.id)
      },
      reaction(data) {
        const rectionData = {
          recipe_id: this.item.id,
          reaction: data.value,
        }
        this.allpopup = false
        this.$store.commit('recipe/setReaction', rectionData)
        this.$store.dispatch('recipe/recipeReaction', rectionData)
      },
      onPlayerPlay(player) {
        console.log(player)
        console.log('player play!', player)
      },
      onPlayerReady(player) {
        console.log('player ready!', player)
        // this.player.play()
      },
      playVideo: function (source) {
        const video = {
          withCredentials: false,
          // type: 'application/x-mpegurl',
          type: 'video/mp4',

          src:
            process.env.TEMP_ASSET_ENDPOINT +
            this.item?.recipes_steps[0]?.file.substring(0),
        }
        this.player.reset() // in IE11 (mode IE10) direct usage of src() when <src> is already set, generated errors,
        this.player.src(video)
        // this.player.load()
        // this.player.play()
      },
    },
    mounted(props) {
      // const src =
      //   process.env.TEMP_ASSET_ENDPOINT + this.item?.recipes_steps[0]?.file.substring(1)
      //   alert(src)
      this.playVideo()
    },
  }
</script>
<style lang="scss">
  // $
  .video-recipes {
    .vjs-custom-skin {
      .video-js {
        height: 218px !important;
      }
    }
  }
  @import '../../css/components/recipe-cards.scss';
</style>
