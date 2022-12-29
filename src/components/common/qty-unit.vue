<template>
  <div class="select-cus-popup">
    <q-card-section class="row items-center pop-head">
      <h6>{{ $q.lang.addRecipes.PopUpTitle.quantityUnit }}</h6>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="pop-body">
      <div class="port-type">
        <div class="radio-cus-popup">
          
          <q-option-group
            :options="options"
            type="radio"
            v-model="dishcateory"
          />
        </div>
      </div>

    </q-card-section>
  </div>
</template>

<script>
import {  ref } from 'vue';


export default {
  name: "dishcategory",
  setup () {
    return {
      //portion: ref('false'),
      dishcateory: ref(null),

      options: [
        { label: 'piece', value: 'piece' },
        { label: 'grams', value: 'grams' },
        { label: 'kilogram', value: 'kilogram' },
        { label: 'millilitre', value: 'millilitre' },
        { label: 'litre', value: 'litre' },
        { label: 'dozen', value: 'dozen' },
      ]
    }
  }
}
</script>
<style lang="scss">
// $
</style>
