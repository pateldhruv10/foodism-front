<template>
  <div class="cus-popup final-not-popup">
    <q-card-section class="row items-center pop-head">
      <h6><span>If you want add final note</span></h6>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="pop-body">
      <div class="row">
        <div class="col-12 form-group">
          <q-input
            v-model="name"
            type="textarea"
            :label="$q.lang.addRecipes.stepThree.fields.finalNote.label"
            :placeholder="
              $q.lang.addRecipes.stepThree.fields.finalNote.placeHolder
            "
          />
          <span class="ch-limit">0/500 characters</span>
        </div>
        <div class="col-12 cp-btn">
          <q-btn
            class="btn btn1"
            :to="{ name: 'recipe-preview' }"
            v-close-popup
            label="Preview"
          />
          <q-btn class="btn btn2" label="Sav as draft" />
        </div>
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
      import('./add-ingredient.vue')
    ),
    'qty-missing': defineAsyncComponent(() => import('./qty-missing.vue')),
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
