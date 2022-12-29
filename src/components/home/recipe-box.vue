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

    <div class="recipe-title">
      <h5>
        <router-link
          :to="{ name: 'recipe-details', params: { slug: item?.id } }"
        >
          {{ item?.name }}</router-link
        >
      </h5>
    </div>
    <div class="recipe-img">
      <router-link
        class="flex relative-position"
        :to="{ name: 'recipe-details', params: { slug: item?.id } }"
      >
        <q-img :src="getCoverPhoto(item.cover_photo)" :loading="eager" :decoding="async" :crossorigin="anonymous"></q-img>
        <div v-if="item.recipe_type == 'Video'" class="ply-btn absolute-center">
          <q-img src="~assets/video.svg"></q-img>
        </div>
        <div class="user-view">
          <div
            class="time-count"
          >
            {{ typeof item.cookingTime == 'object' ? getTotalTime(item) : item.cookingTime }}
            min
          </div>
          <div class="view-count" v-if="item.recipeViewCount <= 1">{{item.recipeViewCount}} view</div>
          <div class="view-count" v-if="item.recipeViewCount > 1">{{item.recipeViewCount}} views</div>
        </div>
      </router-link>
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
  import { mapActions, useStore } from 'vuex'
  import coverImage from 'src/composable/coverPhoto'
  import { useRoute } from 'vue-router'

  export default {
    name: 'RecipeCardBox',
    props: {
      item: {
        type: Object,
        required: true,
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
    },
    setup(props) {
      const {
        allpopup,
        currentFrom,
        currentField,
        sendValue,
        sendDisplayField,
        dialogClass,
        open,
      } = useDialog()
      const user = computed(() => {
        return store.getters['auth/getUser']
      })

      const router = useRoute()

      const { getCoverPhoto } = coverImage()
      const useroption = ref(false)
      const store = useStore()

      return {
        getCoverPhoto,

        isLoggedIn: computed(() => {
          return store.getters['auth/isLoggedIn']
        }),
        recipe: computed(() => {
          return store.getters['recipe/getMyRecipes']
        }),
        allpopup,
        currentFrom,
        currentField,
        sendValue,
        sendDisplayField,
        dialogClass,
        open,
        useroption,
        user,
        setValue(data) {
          console.log(data)
          this.allpopup = false
          this[`${data.field}`] = data.value
        },
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
        // recipeReaction,

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
        getTotalTime(item) {
          return item.recipes_cooking_time.baking_time + item.recipes_cooking_time.cooking_time + item.recipes_cooking_time.preparation_time + item.recipes_cooking_time.resting_time;
        }
      }
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
    },

    name: 'RecipeCards',
  }
</script>
<style lang="scss">
  // $
  .reaction-box {
    padding: 5px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ul {
      // background: $light-orange;
      margin: 0;
      padding: 5px 0px;
      @extend .border-radius2;
      display: flex;
      border-top-left-radius: 0;
      li {
        list-style-type: none;
        padding: 0 10px 0 5px;
        display: flex;
        align-items: center;
        @extend .primary-font-semibold;
        .q-img {
          width: 20px;
          height: 20px;
          margin-right: 2px;
          .q-img__container {
            img {
              object-fit: inherit !important;
            }
          }
        }
        .ply-btn {
          width: 55px;
          background: rgba(0, 0, 0, 0.6);
          padding: 10px;
          @extend .border-radius3;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) !important;
          .q-img {
            height: 100%;
          }
        }
        span {
          margin-left: 5px;
          display: flex;
          line-height: 1;
          margin-top: 3px;
        }
      }
    }
  }
  @import '../../css/components/recipe-cards.scss';
</style>
