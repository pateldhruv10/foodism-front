<template>
  <div class="full-h search-ing-cus">
    <q-card-section class="row items-center pop-head">
      <div class="full-width flex">
        <h6>Search ingredient</h6>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </div>
      <div class="full-width">
        <q-form class="ing-search">
          <q-input v-model="search" type="search" placeholder="Search or ingredient eg.apple" :dense="dense">
            <q-icon name="search"></q-icon>
          </q-input>
        </q-form>
      </div>
    </q-card-section>
    <q-card-section class="pop-body popup-fix-bottm">
      <div class="search-ing-box">
        123
        
        <div class="fixed-bottom q-px-lg q-py-md box-shadow-cus">
          <q-btn
          class="btn full-width btn1"
          flat
          dense > {{ $q.lang.label.save }} </q-btn>
        </div>
      </div>
    </q-card-section>    
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref } from 'vue';


export default {
  name: "searchingredient",


  
}
</script>
<style lang="scss">
// $
</style>
