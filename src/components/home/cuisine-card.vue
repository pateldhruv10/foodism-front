<template>
  <div class="cui-box">
    <div class="cui-img">
      <router-link :to="item.slug">
        <q-img :src="getImage('../../assets/img1.jpg')" :loading="eager" :decoding="async" :crossorigin="anonymous"></q-img>
      </router-link>
    </div>
    <p><router-link :to="item.slug">{{ item.title }}</router-link></p>
  </div>
</template>

<script>
export default {
  name: "CuisineHomeCard",
  props: {
    item: {
      type: Object,
      defaults: {}
    }
  },
  methods: {
    getImage() {
      return require(`../../assets/img1.jpg`);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
