<template>
  <q-page class="feedback head-fix">
    <header-with-backbutton
      :title="$q.lang.common.sidebar.feedback"
      extraClass="fixed-top"
    />
    <!-- <div class="common-head fixed-top">
      <div class="ch-left">
        <router-link :to="{ name: 'user-home' }"><i class="fas fa-arrow-left"></i></router-link> {{ $q.lang.common.sidebar.feedback }}
      </div>
    </div> -->
    <div class="common-inner">
      <p class="text-center">
        <q-img src="~assets/th1.png"></q-img>
      </p>
      <h5 class="text-center q-pa-md">
        {{ $q.lang.common.feedbacknew.Description }}
      </h5>
      <div class="form-group">
        <q-input
          v-model="text"
          type="textarea"
          :label="$q.lang.common.feedback.label"
        />
        <div class="ch-limit">
          0/500 {{ $q.lang.common.subLabel.characters }}
        </div>
      </div>
      <div class="fixed-bottom q-px-lg q-py-md box-shadow-cus">
        <q-btn class="full-width btn1 btn" label="submit" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, defineComponent, defineAsyncComponent } from 'vue'
export default defineComponent({
  name: 'FeedbackIndex',
  components: {
    'header-with-backbutton': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "header-with-backbutton" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/layouts/header-with-backbutton.vue'
      )
    ),
  },
  setup() {
    const slide = ref(0)
    return {
      slide,
      phoneNo: ref(true),
      msg: ref(false),
    }
  },
})
</script>
<style lang="scss">
// $
.support-cl {
  font-size: 16px !important;
  color: $text-color2;
  line-height: 1;
}
@import '../css/policies-settings.scss';
</style>
