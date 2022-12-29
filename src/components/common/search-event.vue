<template>
  <div class="search-contest-box">
    <div class="contest-img">
      <router-link :to="{ name: 'event-details', params: { slug: item.slug } }">
        <q-img :src="getImg(item.images[0])" :loading="eager" :decoding="async" fetch-priority="high" no-spinner></q-img>
      </router-link>
      <div class="search-contest-details">
        <router-link
          :to="{ name: 'event-details', params: { slug: item.slug } }"
        >
          <div class="name">
            {{ item.name }}
          </div>
          <div class="view">
            <span>
              <b>Participant: {{ item.participant.length }}</b>
            </span>
            <span class="pr-money">
              <!-- <b>Price: 10000/-</b> -->
            </span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import shareImage from 'src/composable/shareImage'
export default defineComponent({
  name: 'SearchEventComponent',
  props: {
    item: {
      type: Object || Array,
    },
  },
  setup() {
    const { getImg, showImage } = shareImage()
    return {
      getImg,
      showImage,
    }
  },
})
</script>

<style lang="scss">
// $
.search-contest-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid $bg5;
  .contest-img {
    width: 100%;
    display: flex;
    align-items: center;
    .q-img {
      width: 150px;
      max-height: 100px;
      @extend .border-radius2;
    }
  }
  .search-contest-details {
    padding-left: 15px;
    min-width: calc(100% - 150px);
    // width: calc(100% - 150px);

    .name {
      font-size: 18px;
      @extend .primary-font-semibold;
      line-height: 1.2;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .view {
      font-size: 14px;
      color: $text-color2;
      span {
        display: block;
      }
      .pr-money {
        color: $primary;
      }
    }
  }
}
.search-contest-box:last-child {
  // border-bottom: 0px;
}
</style>
