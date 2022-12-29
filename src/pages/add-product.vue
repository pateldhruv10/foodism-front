<template>
  <q-page class="add-product">
    <header-with-backbutton title="Add a New Product" />
    <div class="common-inner">
      <div class="form-md q-pa-sm">
        <div class="form-group q-mb-md">
          <q-input v-model="productname" label="Product Name" />
        </div>
        <div class="form-group q-mb-md">
          <q-input v-model="productdescription" label="Product description" />
          <span class="ch-limit">0/500 characters</span>
        </div>
        <div class="form-group q-mb-md">
          <q-select
            label="Jump up"
            filled
            v-model="selctgroup"
            :options="options"
          />
        </div>

        <div
          class="fixed-bottom seller-form-btm q-px-lg q-py-md box-shadow-cus"
        >
          <q-stepper-navigation class="q-pa-none">
            <q-btn
              class="btn full-width btn4"
              @click="
                () => {
                  done1 = true
                  step = 2
                }
              "
              label="Next"
            />
          </q-stepper-navigation>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue'
import { ref } from 'vue'

export default defineComponent({
  name: 'AddProduct',
  components: {
    'header-with-backbutton': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "header-with-backbutton" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/layouts/header-with-backbutton.vue'
      )
    ),
  },
  setup() {
    return {
      selctgroup: ref(null),
      options: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'],
    }
  },
  components: {},
  name: 'PageAddProduct',
})
</script>
