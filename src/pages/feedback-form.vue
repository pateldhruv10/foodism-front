<template>
  <q-page class="fdb-form head-fix">
    <div class="common-head fixed-top">
      <div class="ch-left">
        <router-link to="/"><i class="fas fa-arrow-left"></i></router-link>
      </div>
      <div class="ch-right">
        <!-- <q-icon name="las la-ellipsis-v"></q-icon> -->
      </div>
    </div>
    <div class="common-inner">

      <feedback-form />

    </div>


  </q-page>
</template>

<script>
import { ref, defineComponent,defineAsyncComponent } from 'vue';
export default defineComponent({
  name: 'Feedbackform',
  components:{
  },

  components: {
    'feedback-form': defineAsyncComponent(() =>
      import('components/common/feedback-form.vue')
    ),
  },
})
</script>
<style lang="scss">
  // $

</style>
