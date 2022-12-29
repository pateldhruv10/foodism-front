<template>
  <q-page class="block-ac head-fix" v-if="!loaded">
    <header-with-backbutton :title="$q.lang.common.title.blockAccount " extraClass="fixed-top" />
    <div class="common-inner" >
      <block-profile v-for="item in blockedAcc" :key="item" :item=" item" />

    </div>
  </q-page>
</template>

<script>
import { ref, defineComponent, defineAsyncComponent } from 'vue';

import api from '../../apis/index'
import { Loading } from 'quasar'

export default defineComponent({
  name: 'blockAccountcountIndex',
  components:{
    'block-profile' : defineAsyncComponent(() => import(
      /* webpackChunkName: "block-profile" */
      /* webpackMode: "lazy" */
      /* webpackInclude: /\.vue$/ */
      'components/common/block-profile.vue')),
    'header-with-backbutton': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "common-header" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/layouts/header-with-backbutton.vue'
      )
    ),
  },
  setup () {
    const slide = ref(0);
      const loaded = ref(true)
      Loading.show()
    return {
      loaded,
       blockedAcc : ref(null),
      slide,
      notification: ref(true),
      mode: ref(false),
    }
  },
  created(){
    api.get('blockList').then((res) => {
      Loading.hide()
      this.loaded = false
      this.blockedAcc = res.data
      console.log('--------->>>>> ' + this.blockedAcc.name)
    })
  }
})
</script>
<style lang="scss">
  // $
  .block-ac{
    .common-head{
        // background: $bg3;
        .ch-right{
            a{
                color: $dark-purple;
                font-size: 18px;
            }
        }
    }
    .common-inner{
        padding: 20px;
    }
  }
</style>
