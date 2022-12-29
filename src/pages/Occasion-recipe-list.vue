<template>
  <q-page class="occasion-rc-list">
    <div class="common-head">
      <div class="ch-left">
        <router-link to="/alloccasions"><i class="fas fa-arrow-left"></i></router-link> New Year
      </div>
    </div>
    <div class="common-inner">
      <div class="pr-top">
        <div class="veg-togal-btn">
          <q-toggle
            :label="`Veg Only`"
            v-model="greenModel"
            color="green"
          />
        </div>
        <div class="pr-top-right">
          <router-link class="q-mr-md" to=""><i class="fas fa-search"></i></router-link>
          <router-link to="" @click="showFilter = true"><i class="fas fa-filter"></i></router-link>
        </div>
      </div>
      <div class="oc-rcp-list flex">
        <food-box />
        <food-box />
        <food-box />
        <food-box />
        <food-box />
        <food-box />
        <food-box />
        <food-box />
      </div>

      <q-dialog v-model="showFilter" position="bottom">
        <recipe-filter />
        <div class="bottom-btn">
          <div class="row">
            <div class="col q-pr-sm">
              <q-btn class="btn btn2 full-width" label="Clear All" />
            </div>
            <div class="col col q-pl-sm">
              <q-btn class="btn btn1 full-width" label="Apply" />
            </div>
          </div>
        </div>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue';

export default defineComponent({
  data(){
    return{
      showFilter:false,
      greenModel: ref(true),
      tab: ref('products')
    }
  },
  components:{
    'food-box' : require('src/components/home/food-box.vue').default,
  },
  name: 'occasion-recipe-list'
})

</script>
