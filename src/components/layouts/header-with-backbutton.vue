<template>
  <div class="common-head" v-bind:class="extraClass">
    <div class="ch-left">
      <a href="javascript:history.go(-1)">
        <i class="fas fa-arrow-left"></i>
      </a>
      <template v-if="title">
        {{ title }}
      </template>
    </div>
    <div class="ch-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeaderWithBackButton',
  props: {
    title: {
      type: String,
      default: () => null,
    },
    extraClass: {
      type: String,
      default: () => null,
    },
  },
})
</script>
