<template>
  <div class="event-slider">
    <div class="user-img">
      <q-carousel
        v-if="images.length"
        v-model="slide"
        v-model:fullscreen="fullscreen"
        :autoplay="autoplay"
        :swipeable="images.length > 1"
        animated

        control-color="primary"
        :navigation="images.length > 1"
        padding
        transition-prev="slide-right"
        transition-next="slide-left"
        @click="fullscreen = !fullscreen"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
      >
        <q-carousel-slide
          v-for="(item, index) in images"
          :key="`Image${index}`"
          :name="index"
          :img-src="item"
        />
      </q-carousel>
      <default-img v-else />
    </div>
  </div>
</template>

<script>
import { ref, defineAsyncComponent } from 'vue'

export default {
  name: 'SliderImage',
  props: {
    images: {
      type: Array,
      default: () => [],
    },
    redirectUrl: {
      type: String,
      default: '',
    },
  },
  components: {
    'default-img': defineAsyncComponent(() =>
      import('src/components/common/default-img.vue')
    ),
  },
  setup() {
    const slide = ref(0)
    return {
      slide,
      fullscreen: ref(false),
    }
  },
}
</script>
<style lang="scss">
.q-body--fullscreen-mixin {
  .q-carousel__slide{
      background-repeat: no-repeat !important;
      background-size: contain;
  }
}
</style>
