<template>
  <q-page class="bites-detail">
    <div class="">
      <vlog-post />
    </div>
  </q-page>
</template>
<script>
import { defineAsyncComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import useDialog from 'src/composable/useDialog'

export default {
  name: 'vlogdetail',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    'vlog-post': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "vlog-post" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        '../../components/home/vlog-post.vue'
      )
    ),
  },
}
</script>
<style lang="scss">
// $
.bites-detail {
  padding: 20px;
  .bites-dis {
    p {
      display: inherit;
    }
  }
}
.bites-detail::before {
  background: $bg4;
  width: 100%;
  height: 200px;
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  // z-index: -1;
}
.vlog-detail {
  padding: 20px;
}
.vlog-detail::before {
  background: $catbg1;
  width: 100%;
  height: 200px;
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  // z-index: -1;
}
.vlog-dis {
  font-size: 16px;
  color: $text-color2;
}

@import '../../css/page/vlog.scss';
</style>
