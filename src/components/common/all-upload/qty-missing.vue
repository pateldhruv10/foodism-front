<template>
  <div class="cus-popup">
    <q-card-section class="row items-center pop-head">
      <h6><span>Quantity missing</span></h6>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="pop-body">
      <p>
        Few ingeredients have quantity missing. please add quantity & unit or
        delet the existing ingeredients.
      </p>
      <div class="cp-btn q-pt-md">
        <q-btn class="btn2" label="Cancel" v-close-popup />
        <q-btn
          class="btn1"
          @click="open('add-ingredient', ingredient)"
          label="Yes Add"
        />
      </div>
    </q-card-section>
  </div>
  <q-dialog v-model="allpopup" position="bottom" :class="dialogClass">
    <component
      :is="currentFrom"
      :sendValue="sendValue"
      :fieldName="currentField"
      v-on:selectValue="setValue"
    ></component>
  </q-dialog>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref } from 'vue'
import useDialog from 'src/composable/useDialog'
export default {
  name: 'qtymissing',
  components: {
    'add-ingredient': defineAsyncComponent(() =>
      import('../../../components/common/all-upload/add-ingredient.vue')
    ),
    'qty-missing': defineAsyncComponent(() =>
      import('../../../components/common/all-upload/qty-missing.vue')
    ),
  },
  setup() {
    const { allpopup, currentFrom, currentField, dialogClass, open } =
      useDialog()
    const ingredient = ref(null)
    const utensil = ref(null)
    return {
      allpopup,
      currentFrom,
      currentField,
      dialogClass,
      open,
      ingredient,
      utensil,
    }
  },
  methods: {
    setValue(data) {
      console.log(data)
      this.allpopup = false
      this[`${data.field}`] = data.value
    },
  },
}
</script>
<style lang="scss">
// $
</style>
