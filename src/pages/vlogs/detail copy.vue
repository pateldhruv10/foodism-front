<template>
  <q-page class="bites-detail">
    <div class="">
      <vlog-post />
    </div>

  </q-page>
</template>

<script>
import { defineAsyncComponent, ref } from 'vue'

export default {
  name: 'vlogdetail',
  components: {
    'vlog-post': defineAsyncComponent(() => import('../../components/home/vlog-post.vue')),
  },
}
</script>
<style lang="scss">
// $
.bites-detail{
  padding: 20px;
  .bites-dis{
    p{
      display: inherit;
    }
  }
}
.bites-detail::before{
  background: $bg4;
  width: 100%;
  height: 200px;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  // z-index: -1;
}
</style>
