<template>
  <div class="select-cus-popup">
    <q-card-section class="row items-center pop-head">
      <h6>{{ $q.lang.addRecipes.PopUpTitle.portionType }}</h6>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="pop-body">
      <div class="port-type">
        <div class="radio-cus-popup">

          <q-option-group
            :options="options"
            type="radio"
            v-model="portion"
            @update:model-value="setData"
          />
        </div>
      </div>

    </q-card-section>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "portionType",
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
    return {
      portion: ref(null),

      options: [
        { label: 'Pieces', value: 'Pieces' },
        { label: 'Servings', value: 'Servings' },
      ]
    }
  },
  methods:{
    // get(val) {
    //   this
    // },
    setData() {
      this.$emit('selectValue', {
        value: this.portion,
        field: this.fieldName
      })
    }
  }
}
</script>
<style lang="scss">
// $
</style>
