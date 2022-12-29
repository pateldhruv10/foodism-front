<template>
  <q-layout view="lHh Lpr lFf">
    <Sidebar />

    <user-header />

    <q-footer class="footer text-primary">
      <div class="fd-container">
        <user-footer />
      </div>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Sidebar from 'components/sidebar/index.vue';
import { defineAsyncComponent, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'UserLayout',
  components: {
    'user-footer': defineAsyncComponent(() => import('src/components/layouts/user-footer.vue')),
    'user-header': defineAsyncComponent(() => import('src/components/layouts/user-header.vue')),
    Sidebar
  },
})
</script>
