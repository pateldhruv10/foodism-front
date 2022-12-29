<template>
  <div class="select-cus-popup">
    <q-card-section class="row items-center pop-head">
      <h6>{{ $q.lang.addRecipes.PopUpTitle.ingredient }}</h6>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="pop-body">
      <div class="ed-popup">
        <div class="q-py-sm flex items-center"><i class="las la-edit"></i> <span>Edit Ingredient</span></div>
        <div class="q-py-sm flex items-center"><i class="las la-trash"></i> <span>Delet Ingredient</span></div>
      </div>
    </q-card-section>
  </div>
</template>

<script>
import {  ref } from 'vue';


export default {
  name: "portionQuantity",
  components: {
  },
  data () {
    return {


    }
  },
}
</script>
<style lang="scss">
// $

</style>
