<template>
  <div class="select-cus-popup">
    <q-card-section class="row items-center pop-head">
      <h6>{{ $q.lang.addRecipes.PopUpTitle.dishType }}</h6>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="pop-body">
      <div class="port-type">
        <div class="radio-cus-popup">
          <q-option-group
            :options="dishes"
            type="radio"
            v-model="model"
            @update:model-value="setData"
          />
        </div>
      </div>
      <!-- <div class="absolute-bottom q-px-lg q-py-md box-shadow-cus">
        <q-btn
          class="btn full-width btn1"
          flat
          dense
          @click="setData()"
        >
          Done
        </q-btn>
      </div> -->
    </q-card-section>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex'

export default {
  name: "dishType",
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
    const store = useStore();

    let dishes = store.getters['master/getdishTypeOption'];

    if(!dishes || dishes.length === 0) {
      store.dispatch('master/getdishTypes');
    }

    return {
      model: ref(null)
    }
  },
  created(){
    if(this.sendValue) {
      this.val = this.sendValue;
    }
  },
  methods:{
    setData() {
      this.$emit('selectValue', {
        value: this.model,
        field: this.fieldName
      })

      if(this.sendDisplayField !== null) {
        this.$emit('selectValue', {
          value: this.dishes.find(item => item.value === this.model).label,
          field: this.sendDisplayField
        })
      }
    }
  },
  computed: {
    dishes() {
      return this.$store.getters['master/getdishTypeOption'];
    }
  }
}
</script>
<style lang="scss">
// $
</style>
