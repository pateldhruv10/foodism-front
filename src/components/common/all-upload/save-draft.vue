<template>
  <div class="cus-popup">
    <q-card-section class="pop-body text-center">
      <q-img src="~assets/no-search.jpg"></q-img>
      <h6>{{ $q.lang.addRecipes.saveDraft.title }}</h6>
      <p>{{ $q.lang.addRecipes.saveDraft.description }}</p>
      <div class="cp-btn q-pt-md">
        <q-btn class="btn2" :label="$q.lang.addRecipes.saveDraft.close" @click="close()" v-close-popup />
        <q-btn class="btn1" :label="$q.lang.addRecipes.saveDraft.saveInDraft" @click="saveInDraft()" />
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
  props: {
    sendValue : {
      type: String,
      default: '',
    },
    fieldName: {
      type: String,
      default: '',
    },
    sendDisplayField: {
      type: String,
      default: null,
    }
  },
  methods: {
    saveInDraft() {
      // history.go(-1)
      this.$router.push({name : 'user-home'})
      this.$emit('selectValue',{
        value : 'draft'
      })
    },
    close(){
       history.go(-1)
    }
  }
}
</script>
<style lang="scss">
// $

</style>
