<template>
  <router-link :to="to">{{ $q.lang.label.seeAll }}</router-link>
</template>

<script>
export default {
  name: "SeeAllLink",
  props: {
    to: {
      type: String,
      defaults: "/"
    }
  },
}
</script>
