<template>
  <q-page class="all-occasion">
    <header-with-backbutton :title="Occasions" extraClass="fixed-top">
      <template #right>
        <router-link to="/"><i class="fas fa-search"></i></router-link>
      </template>
    </header-with-backbutton>
    <div class="common-inner">
      <div class="occasion-list oc-listing">
        <occasions-box />
        <occasions-box />
        <occasions-box />
        <occasions-box />
        <occasions-box />
        <occasions-box />
        <occasions-box />
        <occasions-box />
        <occasions-box />
        <occasions-box />
        <occasions-box />
        <occasions-box />
        <occasions-box />
        <occasions-box />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue'

export default defineComponent({
  name: 'AlloccasionsIndex',
  components: {
    'occasions-box': require('src/components/home/occasions-box.vue').default,
    'header-with-backbutton': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "header-with-backbutton" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/layouts/header-with-backbutton.vue'
      )
    ),
  },
})
</script>
