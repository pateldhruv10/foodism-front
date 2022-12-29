<template>
  <div class="pls-btn">
            <i class="las la-plus"></i>
        </div>
        <q-tabs no-caps active-color="primary" indicator-color="transparent" class="text-grey" v-model="tab">
          <q-tab name="home" @click="redirectToHome()" >Products</q-tab>
          <q-tab class="search-cus" name="search">Services</q-tab>
          <q-tab name="videos" @click="redirectToVideo()">Inquiry</q-tab>
          <q-tab @click="toggleLeftDrawer" name="Profile">Insights</q-tab>
        </q-tabs>
</template>

<script>
export default {
  name: "Footer",
  methods: {
    redirectToVideo() {
      this.$router.push('/videos')
    },
    redirectToSearch() {
      this.$router.push('/search')
    },
    redirectToHome() {
      this.$router.push('/')
    }
  },
}
</script>
<style lang="scss">
// $
  @import '../../css/layout/footer-business.scss';
</style>
