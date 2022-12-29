<template>
  <router-link :to="{ name: 'recipe-details', params: { slug: item.id } }">
    <div class="search-recipe-box">
      <div class="recipe-img">
        <router-link
          :to="{ name: 'recipe-details', params: { slug: item.id } }"
        >
          <q-img :src="getCoverPhoto(item.cover_photo)" :loading="eager" :decoding="async" fetch-priority="high" no-spinner></q-img>
        </router-link>

        <div class="search-rcp-details">
          <div class="name ellipsis-2-lines">
            <router-link
              :to="{ name: 'recipe-details', params: { slug: item.id } }"
              >{{ item.name }}</router-link
            >
          </div>
          <div class="view">
            <!-- <span> {{ item.views || 0 }} Views</span> -->
            <span>{{ item.cookingTime || 0 }} min</span>
          </div>
          <div class="recipe-control">
            <q-btn class="btn3" label="edit" />
            <q-btn class="btn3" label="delete" />
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import coverImage from 'src/composable/coverPhoto'
const { getCoverPhoto } = coverImage()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>
<style lang="scss">
// $
.search-recipe-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid $bg5;
  .recipe-img {
    display: flex;
    align-items: center;
    .q-img {
      width: 150px;
      max-height: 80px;
      @extend .border-radius2;
    }
  }
  .search-rcp-details {
    margin-left: 15px;
    .name {
      font-size: 18px;
      @extend .primary-font-semibold;
      line-height: 1.2;
    }
    .view {
      font-size: 14px;
      color: $text-color2;
      display: flex;
      // justify-content: space-between;
      span {
        margin-right: 15px;
      }
    }
  }
}
@media only screen and (max-width: 479px) {
  .search-recipe-box {
    .recipe-img {
      .q-img {
        width: 120px;
      }
    }
    .search-rcp-details {
      .name {
        font-size: 16px;
      }
      .view {
        font-size: 14px;
      }
    }
  }
}
</style>
