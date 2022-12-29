<template>
  <div class="search-bites-box">
    <div class="bites-img">
      <div class="video-box">
        <router-link to="">
          <q-img src="~assets/c9.jpg" :loading="eager" :decoding="async" fetch-priority="high" no-spinner></q-img>
          <div class="ply-btn absolute-center">
            <q-img src="~assets/video.svg" :loading="eager" :decoding="async" fetch-priority="high" no-spinner></q-img>
          </div>
        </router-link>
      </div>
      <div class="bites-details">
        <div class="name">
          <router-link to="">{{ item.name }}</router-link>
        </div>
        <div class="view">
          <span> {{ item.views || 0 }} Views</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>
<style lang="scss">
// $
.search-bites-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid $bg5;
  .bites-img {
    display: flex;
    align-items: center;
    .video-box {
      position: relative;
      .q-img {
        width: 150px;
        max-height: 100px;
        @extend .border-radius2;
      }
      .ply-btn {
        width: 40px;
        background: rgba(0, 0, 0, 0.6);
        padding: 5px;
        @extend .border-radius3;
        .q-img {
          height: 100%;
          width: 30px;
        }
      }
    }
  }
  .bites-details {
    margin-left: 15px;
    .name {
      font-size: 18px;
      @extend .primary-font-semibold;
      line-height: 1.2;
    }
    .view {
      font-size: 16px;
      color: $text-color2;
      display: flex;
      justify-content: space-between;
    }
  }
}
@media only screen and (max-width: 479px) {
  .search-bites-box {
    .bites-img {
      .q-img {
        width: 120px;
      }
    }
    .bites-details {
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
