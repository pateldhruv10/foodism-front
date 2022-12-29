<template>
  <div class="cus-popup">
    <q-card-section class="pop-body text-center">
      <q-img src="~assets/no-search.jpg" :loading="eager" :decoding="async" fetch-priority="high" no-spinner></q-img>
      <h6>{{ $q.lang.contest.contestForm.finalPopUp.title }}</h6>
      <p>{{ $q.lang.contest.contestForm.finalPopUp.dis }}</p>
      <div class="cp-btn q-py-md">
        <q-btn v-close-popup="3" class="btn1" :label="$q.lang.common.btn.okay"/>
      </div>
    </q-card-section>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: "Registrationsuccess",
  methods:{
    ...mapActions({
      'getEvent': 'home/fetchEvents'
    })
  }
}
</script>
<style lang="scss">
// $
p{
  color: $text-color2 !important;
}

</style>
