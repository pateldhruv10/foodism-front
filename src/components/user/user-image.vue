<template>
  <!-- <st-cached-image :src="image"></st-cached-image> -->
  <div v-bind:class="{ 'default-profile-img' : defaultImage }">
    <q-img :loading="eager" :decoding="async" :crossorigin="anonymous" fetch-priority="high" no-spinner :src="image" />
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue'
import profile from 'src/composable/profile'

import 'st-cached-image/dist/cached-image'

const props = defineProps({
  user_image: {
    type: Object,
  },
})

const { image, defaultImage,  getProfilePic } = profile()

onBeforeMount(() => {
  getProfilePic(props.user_image)
})
</script>
