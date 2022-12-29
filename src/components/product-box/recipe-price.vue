<template>
    <div class="rc-price">
      <span class="pr-left">
        <span class="pr1">₹ {{ item.originalPrice }}</span> ₹ {{ item.sellingPrice }} <span class="rc-unit">per kg</span>
      </span>
      <div class="offer-sceam">{{ item.discount }}</div>
    </div>
</template>
<script>
export default {
  name: "RecipePriceCard",
  props: {
    item: {
      type: Object,
      defaults: {}
    }
  },
}
</script>
