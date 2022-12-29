<template>
  <q-layout view="lHh Lpr lFf" class="web-page-cus">

    <Sidebar />
    <web-header />
    <q-page-container>
      <router-view />
    </q-page-container>

        <web-footer />

  </q-layout>
</template>

<script>
import Sidebar from 'components/sidebar/index.vue'
import { defineAsyncComponent } from 'vue';
import { defineComponent, ref } from 'vue';
import {
  useGoogleTagManager,
  useLinkedinInsightTag,
} from "@dreamonkey/quasar-app-extension-tracking";


export default defineComponent({
  name: 'WebLayout',

  components: {
    'web-footer': defineAsyncComponent(() => import('src/components/layouts/web-footer.vue')),
    'web-header': defineAsyncComponent(() => import('src/components/layouts/web-header.vue')),
    Sidebar
  },

  methods: {
    redirectToVideo() {
      this.$router.push('/videos')
    },
    redirectToSearch() {
      this.$router.push('/search')
    },
    redirectToHome() {
      this.$router.push('/')
    }
  },

  setup () {
    const leftDrawerOpen = ref(false)
    // Add Google Tag Manager script
    useGoogleTagManager("GTM-W2L28NC");

    return {
      // essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        console.log(leftDrawerOpen.value);
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
<style lang="scss">
// $
@import 'src/css/web-page.scss';
</style>
