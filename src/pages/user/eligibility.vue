<template>
  <q-page class="eligibility-page head-fix">
    <div class="common-head fixed-top">
      <div class="ch-left">
        <router-link :to="{ name: 'user-home' }"><i class="fas fa-arrow-left"></i></router-link> Eligibility
      </div>
      <div class="ch-right">

      </div>
    </div>
    <div class="common-inner">
      <div class="q-px-lg q-pb-md">
        <q-timeline class="elig-timeline" v-if="eListing">
          <q-timeline-entry
            :title="info.title"
            icon="done_all"
            :class="info.class_name"
            v-for="info in eListing" :key="info.id"
          >
            <div class="timeline-dis">
              <p>{{info.description}}</p>
              <q-linear-progress size="10px" :value="info.completed_percentage" />
            </div>
          </q-timeline-entry>
        </q-timeline>
        <div class="">
          <q-btn :to="{ name: 'flp' }" class="btn btn4 full-width" label="You are eligible"></q-btn>
        </div>
      </div>

    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed , defineAsyncComponent } from 'vue';
import { api } from 'src/boot/axios'

export default defineComponent({
  name: 'eligibilityIndex',
  components:{
  },
  setup () {
    const eListing = ref(null)
    return {
      eListing,
    }
  },
  created() {
    this.getEligibility();
  },
  methods: {
    /**
     * Get Eligibility
     */
     getEligibility() {
      api
        .get(
          `/flp/user/eligibility`
        )
        .then((response) => {
            this.eListing = response.data.data;

            this.eListing.forEach((index) => {
              if(index.completed_percentage == 100) {
                index.class_name = ' compleate-task';
              } else {
                index.class_name = '';
              }
            })
        })
        .catch((err) => {
          console.log(err)
        });
    }
  }
})
</script>
<style lang="scss">
  // $
  @import '../../css/flp.scss';
</style>
