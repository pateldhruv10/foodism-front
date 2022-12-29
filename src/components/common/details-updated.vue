<template>
  <div class="cus-popup">
    <q-card-section class="pop-body text-center">
      <q-img src="~assets/no-search.jpg"></q-img>
      <h6>{{this.$attrs.sendValue}}</h6>
      <p></p>
      <div class="cp-btn q-py-md">
        <q-btn class="btn1" label="Okay" @click="close" v-close-popup/>
      </div>
    </q-card-section>
  </div>
  <q-dialog v-model="allpopup" position="bottom" :class="dialogClass">
    <component :is="currentFrom" :sendValue="sendValue" :fieldName="currentField" v-on:selectValue="setValue"></component>
  </q-dialog>
</template>

<script>
export default {
  name: "SaveDraft",
  methods: {
    close(){
      history.go(-1)
      // this.$router.push({name : 'user-home'})
    },

  }
}
</script>
<style lang="scss">
// $
.cp-btn{
  .q-btn{
    min-width: 100px;
  }
}
</style>
