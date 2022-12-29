<template>
  <div class="contest-img">
    <q-carousel
      animated
      v-model="slide"
      navigation
      swipeable
      infinite
      transition-prev="slide-right"
      transition-next="slide-left"
    >
      <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
      <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
      <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
      <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
    </q-carousel>
    <!-- <router-link class="flex relative-position" :to="{ 'name': 'recipe-details' }">
      <q-img src="~assets/c7.jpg"></q-img>           
    </router-link> -->
  </div>
</template>
<script>
import { defineAsyncComponent, ref } from 'vue'
export default {

  setup(){
    return {
      slide: ref(1),
      autoplay: ref(true),
    }

  },
  
  name: "Conestslider",
}
</script>
<style lang="scss">
// $

</style>
