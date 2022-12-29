<template>
  <div class="top-picks-box">
    <div class="top-picks-img">
      <router-link to="">
        <q-img src="~assets/img1.jpg"></q-img>
        <div class="veg-box">
          <div class="veg-box-circle"></div>
        </div>
        <div class="offer-sceam">{{ item.discount }}</div>
      </router-link>
    </div>
    <div class="top-picks-dis">
      <span class="rcn">{{ item.tag }}</span>
      <h6><router-link to="">{{ item.title }}</router-link></h6>
      <span class="price">₹ {{ item.price }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopPickHomeCard",
  props: {
    item: {
      type: Object,
      defaults: {}
    }
  },
}
</script>
