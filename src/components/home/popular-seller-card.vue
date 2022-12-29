<template>
  <div class="p-seller-box">
    <div class="p-seller-img">
      <router-link :to="item.slug">
        <q-img src="~assets/lg1.png"></q-img>
      </router-link>
    </div>
    <p><router-link to="/seller-profile-buyer-view">{{ item.title }}</router-link></p>
  </div>
</template>

<script>
export default {
  name: "PopularHomeCard",
  props: {
    item: {
      type: Object,
      defaults: {}
    }
  },
}
</script>
