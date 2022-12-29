<template>
  <div class="select-cus-popup">
    <q-card-section class="row items-center pop-head">
      <h6>{{$q.lang.event.fields.event_type.label}}</h6>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="pop-body">
      <div class="port-type">
        <div class="radio-cus-popup">
          <q-option-group
            :options="options"
            type="radio"
            v-model="val"
            @update:model-value="setData"
          />
        </div>
      </div>
    </q-card-section>
  </div>
</template>

<script>
import {  ref } from 'vue';

export default {
  name: "EventTypeSelector",
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
      val: ref(null),

      options: [
        { label: 'Online Events', value: 'Online' },
        { label: 'Offline Events', value: 'Offline' },
      ]
    }
  },
  methods:{
    setData() {
      this.$emit('selectValue', {
        value: this.val,
        field: this.fieldName
      })
    }
  }
}
</script>
<style lang="scss">
// $
</style>
