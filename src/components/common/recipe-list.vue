<template>
  <div class="rc-list col-6">
    <div class="draft-box">
      <q-img
        v-if="item.type == 'Draft'"
        :loading="eager" :decoding="async" fetch-priority="high" no-spinner
        :src="getCoverPhoto(item.cover_photo)"
      ></q-img>
      <router-link
        v-else
        :to="{ name: 'recipe-details', params: { slug: item?.id } }"
      >
        <q-img :src="getCoverPhoto(item.cover_photo)" :loading="eager" :decoding="async" fetch-priority="high" no-spinner></q-img>
        <div v-if="item.recipe_type == 'Video'" class="ply-btn absolute-center">
          <q-img src="~assets/video.svg" :loading="eager" :decoding="async" fetch-priority="high" no-spinner></q-img>
        </div>
      </router-link>

      <div class="rc-title ellipsis-2-lines">{{ item?.name }}</div>
      <slot name="controls"  />
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import shareImage from 'src/composable/shareImage'
import coverImage from 'src/composable/coverPhoto'
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
export default {
  name: 'Recipelist',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { getImg } = shareImage()
    const { getCoverPhoto } = coverImage()
    const store = useStore()
    const currentUser = computed(() => {
      return store.getters['auth/getUser']
    })
    return {
      currentUser,
      getCoverPhoto,
      getImg,
      store,
    }
  },

  methods: {
    removeDraft(item_id) {
      // if(confirm('Are you Sure ?')){
      this.$store.commit('recipe/removeRecipeDraft', item_id)
      //}
    },
  },
}
</script>
<style lang="scss">
// $
.rc-grid {
  padding: 0 10px;
  .rc-list {
    position: relative;
    .draft-box {
      background: $bg7;
      display: flex;
      flex-direction: column;
      @extend .border-radius2;
      .q-img {
        height: 150px;
        @extend .border-radius2;
      }
      .ply-btn{
            width: 55px;
            background: rgba(0,0,0,0.6);
            padding: 8px;
            @extend .border-radius3;
             position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%) !important;
            .q-img{
              height: 100%;
            }
          }
      .rc-title {
        padding: 10px 10px;
        @extend .primary-font-semibold;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: inline-block;
        height: 40px;
        // text-align: center;
      }
    }
    .draft-box>a {
      position: relative;
    }
  }
  .rc-list.video {
    .q-icon {
      background: rgba(0, 0, 0, 0.6);
      font-size: 26px;
      padding: 5px;
      @extend .border-radius2;
      color: $whight;
    }
  }
}
/***  media query  ***/
@media only screen and (max-width: 479px) {
  .rc-grid.op1 {
    .rc-list {
      a {
        .q-img {
          height: 120px;
        }
      }
    }
  }
}
</style>
