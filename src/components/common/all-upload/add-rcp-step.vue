<template>
  <div class="full-h">
    <q-card-section class="row items-center pop-head">
      <h6>{{ $q.lang.addRecipes.stepThree.recepstep.stepNo }} 1</h6>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="pop-body popup-fix-bottm">
      <div class="row q-col-gutter-x-lg">
        <div class="col-12 form-group">
          <q-input
            v-model="name"
            :label="$q.lang.addRecipes.stepThree.fields.stepDescription.label"
            :placeholder="
              $q.lang.addRecipes.stepThree.fields.stepDescription.placeHolder
            "
            :rules="[
              (val) =>
                required(
                  val,
                  $q.lang.addRecipes.stepThree.fields.stepDescription.label
                ),
            ]"
          />
          <span class="ch-limit">0/500 characters</span>
        </div>
        <div class="col-12 form-group q-pt-md">
          <q-btn
            class="btn btn2 full-width"
            icon="add"
            label="add ingredients for step 1"
            @click="open('add-ingredient', ingredient)"
          />
          <div class="st-tag q-pt-sm">
            <span class="error">*</span><b>3 ingredients</b> were auto-added
            from the description. Please tap below on ingredient to view and add
            quantity.
            <ul>
              <li>
                <q-btn color="light-green" icon-right="close" label="Oil" />
              </li>
              <li><q-btn color="indigo-2" icon-right="close" label="Oil" /></li>
              <li><q-btn color="pink-2" icon-right="close" label="Oil" /></li>
              <li>
                <q-btn color="light-blue-2" icon-right="close" label="Oil" />
              </li>
              <li><q-btn color="teal-3" icon-right="close" label="Oil" /></li>
            </ul>
          </div>
        </div>
        <div class="col-12 form-group">
          <q-btn
            class="btn btn2 full-width"
            icon="add"
            label="add utensils for step 1"
            @click="open('add-utensil', utensil)"
          />
          <div class="st-tag q-pt-sm">
            <span class="error">*</span><b>1 utensil</b> were auto-added from
            the description.
            <ul>
              <li>
                <q-btn
                  color="light-green"
                  icon-right="close"
                  label="Sauce Pan"
                />
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 form-group q-py-md">
          <div class="row items-start cus-uplode">
            <div
              class="upload-option"
              @click="open('upload-option', uploadoption)"
            >
              <div class="icon">
                <i class="las la-camera-retro"></i>
                <span>Add Photo</span>
              </div>
            </div>
          </div>
          <span class="ch-limit">Max.imgage size:00x00</span>
        </div>
      </div>
      <div class="fixed-bottom q-px-lg q-py-md box-shadow-cus">
        <q-btn
          class="btn full-width btn1"
          flat
          dense
          @click="open('qty-missing', missingqty)"
        >
          {{ $q.lang.label.save }}
        </q-btn>
      </div>
    </q-card-section>
    <q-dialog v-model="allpopup" position="bottom" :class="dialogClass">
      <component
        :is="currentFrom"
        :sendValue="sendValue"
        :fieldName="currentField"
        v-on:selectValue="setValue"
      ></component>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref } from 'vue'
import useDialog from 'src/composable/useDialog'
export default {
  name: 'Addsteps',
  components: {
    'add-ingredient': defineAsyncComponent(() =>
      import('../../../components/common/all-upload/add-ingredient.vue')
    ),
    'add-utensil': defineAsyncComponent(() =>
      import('../../../components/common/all-upload/add-utensil.vue')
    ),
    'qty-missing': defineAsyncComponent(() =>
      import('../../../components/common/all-upload/qty-missing.vue')
    ),
    'upload-option': defineAsyncComponent(() => import('./upload-option.vue')),
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
