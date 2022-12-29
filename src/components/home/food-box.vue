<template>
  <div class="food-box">
    <div class="food-img">
      <router-link to="/buyer-view-recipe-detail">
        <q-img src="../../assets/fd1.jpg"></q-img>
      </router-link>
      <div class="veg-box"><div class="veg-box-circle"></div></div>
      <div class="avlaible-box">{{ item.tag }}</div>
    </div>
    <div class="food-dis">
      <p class="kt-name">
        <span class="f-b">by {{ item.kitchenTitle }}</span>
        <span class="f-rating">
          <q-img src="../../assets/rating.png"></q-img> {{ item.kitchenRating }}
        </span>
      </p>
      <p class="recipe-name"><router-link :to="item.slug">{{ item.title }}</router-link></p>
      <recipe-price :item="item" />
    </div>
  </div>
</template>
<script>
import { defineAsyncComponent } from 'vue'
export default {
  name: "FoodCard",
  props: {
    item: {
      type: Object,
      defaults: {}
    }
  },
  components:{
    'recipe-price' : defineAsyncComponent(() => import('components/product-box/recipe-price.vue'))
  },
}
</script>
