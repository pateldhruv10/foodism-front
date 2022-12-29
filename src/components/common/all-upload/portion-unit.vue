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
          <p>Unit</p>
          <VueScrollPicker
            v-model="unit"
            empty="Select a Unit Type"
            :options="units"
          />
        </div>
      </div>
      <div class="absolute-bottom q-px-lg q-py-md box-shadow-cus">
        <q-btn
        class="btn full-width btn1"
        flat
        dense
        @click="setData()" > Done </q-btn>
      </div>

    </q-card-section>
  </div>
</template>

<script>
import { ref } from 'vue';
import { VueScrollPicker } from 'vue-scroll-picker'
import { useStore } from 'vuex'

const qutList = []
const maxqut = 100

for (let i = 0; i < maxqut; i++) {
  qutList.push(i + 1)
}

export default {
  name: "quantityUnitSelector",
  props: {
    currentIndex: {
      type: Number,
      default: 0
    },
    edit : {
      type: Object || Array,
      default: {
        quantity: 0,
        unit: 0
      },
    },
  },
  components: {
    VueScrollPicker
  },
  created(){
    this.quantity = this.edit.quantity;
    this.unit = this.edit.unit;
  },
  setup () {
    const store = useStore();

    const data = store.getters['master/getUnits'];
    if(data.length  == 0) {
      store.dispatch('master/getUnits')
    }

    return {
      qutList: ref(qutList),
      quantity: ref(null),
      unit: ref(0),
    }
  },
  methods:{
    setData() {
      if(this.quantity != ''){
        if(this.quantity < 1){
          this.quantity= 1*this.quantity;
        }
        this.$emit('selectValueAtIndex', {
          index: this.currentIndex,
          quantity: this.quantity,
          unit: this.unit,
          unitName: this.units.find(item => item.value === this.unit ).name,
        })
      }
    }
  },
  computed: {
    units() {
      return this.$store.getters['master/getUnits']
    }
  }
}
</script>
<style lang="scss">
// $
  @import '../../../css/components/quantity-selector.scss';
  @import 'vue-scroll-picker/lib/style.css';
</style>
