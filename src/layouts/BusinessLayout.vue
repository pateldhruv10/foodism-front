<template>
  <q-layout view="lHh Lpr lFf">
   
    <Sidebar />
    <q-footer class="footer bus-pr-ftr text-primary">
      <div class="fd-container">
        <business-footer />
      </div>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Sidebar from 'components/sidebar/index.vue'
import { defineAsyncComponent } from 'vue';
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'BusinessLayout',

  components: {
    'business-footer': defineAsyncComponent(() => import('src/components/layouts/business-footer.vue')),
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
