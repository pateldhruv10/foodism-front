<template>
  <q-page class="refer-eran head-fix">
    <header-with-backbutton :title="$q.lang.common.sidebar.refer" extraClass="fixed-top">
      <template #right>
        <router-link :to="{ name: 'rewards' }">
          {{ $q.lang.common.sidebar.reward }}
        </router-link>
      </template>
    </header-with-backbutton>
    <!-- <div class="common-head fixed-top">
      <div class="ch-left">
        <router-link to="/"><i class="fas fa-arrow-left"></i></router-link> {{ $q.lang.common.sidebar.refer }}
      </div>
      <div class="ch-right">
        <router-link :to="{ name: 'rewards' }">
          {{ $q.lang.common.sidebar.reward }}
        </router-link>
      </div>
    </div> -->
    <div class="common-inner">
      <div class="ref-img">
        <q-img src="~assets/refer.jpg"></q-img>
      </div>
      <div class="text-center q-pa-md refer-text">
        <h5 class="q-mb-md">Send Invite & Earn Rewards</h5>
        <p>Earn 25 Foodism Points with every <br> friends that joins our community</p>
      </div>
      <div class="text-center">
        <div class="refer-link">
          https://foodism-xyz.youtrack.cloud/agiles/121-3/current
        </div>
        <!-- <div class="refer-count">
          <span><b>5</b> Refer Friends</span> <span><b>125</b> Foodism Coin Earn</span>
        </div> -->
        <div class="refer-share-link">
          <router-link to=""><q-img src="~assets/wts.svg"></q-img></router-link>
          <router-link to=""><q-img src="~assets/fb.svg"></q-img></router-link>
          <router-link to=""><q-img src="~assets/twt.svg"></q-img></router-link>
          <router-link to=""><q-img src="~assets/lin.svg"></q-img></router-link>
          <router-link to=""><q-img src="~assets/share-other.svg"></q-img></router-link>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue';

export default defineComponent({
  name: "ReferIndex",
  components: {
    'header-with-backbutton': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "common-header" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/layouts/header-with-backbutton.vue'
      )
    ),
  },
})
</script>
<style lang="scss">
  // $
  @import '../../css/refer-earn.scss';
</style>
