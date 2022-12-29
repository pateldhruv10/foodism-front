<template>
  <div class="select-cus-popup">
    <q-card-section class="row items-center pop-head">
      <h6>{{ $q.lang.addRecipes.PopUpTitle.portionQuantity }}</h6>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="pop-body popup-fix-bottm">
      <div class="qut-box qut-cus-box">
        <div class="qut-no">
          <p>Qty</p>
          <!-- <VueScrollPicker
            v-model="quantity"
            empty="Select a Number"
            :options="qutList"
          /> -->
          <q-input
            v-model="quantity"
            type="number"
            maxlength="3"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            label="Enter Qty"
            placeholder="Ex. 3"
          />
        </div>
        <div class="qut-type">
          <p>Type</p>
          <VueScrollPicker
            v-model="portionType"
            empty="Select a Portion Type"
            :options="portionTypes"
          />
        </div>
      </div>
      <div class="absolute-bottom q-px-lg q-py-md box-shadow-cus">
        <q-btn class="btn full-width btn1" flat dense @click="setData()">
          Done
        </q-btn>
      </div>
    </q-card-section>
  </div>
</template>

<script>
import { ref } from 'vue'
import { VueScrollPicker } from 'vue-scroll-picker'

const qutList = []
const maxqut = 100

for (let i = 0; i < maxqut; i++) {
  qutList.push(i + 1)
}

import { useStore } from 'vuex'

export default {
  name: 'PortionSelector',
  props: {
    sendValue: {
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
    },
  },
  components: {
    VueScrollPicker,
  },
  created() {
    if (this.sendValue && this.sendValue.length > 0) {
      this.quantity = this.sendValue[0]
      this.portionType = this.sendValue[1]
    }
  },
  setup() {
    const store = useStore()

    const data = store.getters['master/getServingTypes']
    if (data == null || data.length == 0) {
      store.dispatch('master/getServingTypes')
    }

    return {
      qutList: ref(qutList),
      quantity: ref(null),
      portionType: ref(null),
      textqty: ref(),
    }
  },
  methods: {
    setData() {
      this.$emit('selectValue', {
        value: [this.quantity, this.portionType],
        field: this.fieldName,
      })

      if (this.sendDisplayField !== null) {
        this.$emit('selectValue', {
          value:
            this.quantity +
            ' ' +
            this.portionTypes.find((item) => item.value === this.portionType)
              .name,
          field: this.sendDisplayField,
        })
      }
    },
  },
  computed: {
    portionTypes() {
      return this.$store.getters['master/getServingTypes']
    },
  },
}
</script>
<style lang="scss">
// $
@import '../../css/components/quantity-selector.scss';
@import 'vue-scroll-picker/lib/style.css';
</style>
