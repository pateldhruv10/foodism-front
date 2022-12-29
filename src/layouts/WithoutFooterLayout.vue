<template>
  <q-layout view="lHh Lpr lFf">
    
    <Sidebar />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Sidebar from 'components/sidebar/index.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'BusinessLayout',

  components: {
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
