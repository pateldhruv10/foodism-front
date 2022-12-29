<template>
  <div class="select-cus-popup">
    <q-card-section class="row items-center pop-head">
      <h6>{{ $q.lang.addRecipes.PopUpTitle.dietCategory }}</h6>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="pop-body">
      <div class="port-type">
        <div class="radio-cus-popup">
          <q-option-group
            :options="diets"
            type="radio"
            v-model="model"
            @update:model-value="setData"
          />
        </div>
      </div>

    </q-card-section>
  </div>
</template>

<script>
import {  ref } from 'vue';
import { useStore } from 'vuex';
import { computed } from 'vue'

export default {
  name: "dietCategory",
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
  setup () {
     const store = useStore()

    const diets =  store.getters['master/getDietCategoryOption']

     if(!diets || diets.length === 0) {
      store.dispatch('master/getDietCat');
    }


    return {
      //portion: ref('false'),
      model: ref(null),
      diets
    }
  },
  created(){
    if(this.sendValue) {
      this.val = this.sendValue;
    }
  },
  methods: {
    setData() {
      this.$emit('selectValue', {
        value: this.model,
        field: this.fieldName
      })

      if(this.sendDisplayField !== null) {
        this.$emit('selectValue', {
          value: this.diets.find(item => item.value === this.model).label,
          field: this.sendDisplayField
        })
      }
    }
  },
  computed: {
    dishes() {
      return this.$store.getters['master/getDietCategoryOption'];
    }
  }


}
</script>
<style lang="scss">
// $
</style>
