<template>
  <div class="select-cus-popup">
    <q-card-section class="row items-center pop-head">
      <h6>Cuisine Preference</h6>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="pop-body popup-fix-bottm">
      <div class="">
        <div class="ac-list">
          <div class="ac-box" v-for="(cuisine, index) in cuisines" :key="index">
            <q-checkbox v-model="val" :val="cuisine.id">
              <div class="ac-info">
                <q-img src="~assets/c2.jpg"></q-img>
                <p>{{ cuisine.name }}</p>
              </div>
            </q-checkbox>
          </div>
        </div>
      </div>
      <div class="fixed-bottom q-px-lg q-py-md box-shadow-cus">
        <q-btn class="btn full-width btn1" label="Done" @click="setData()" />
      </div>
    </q-card-section>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'CusineSelector',
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
  setup() {
    const store = useStore()

    let cuisines = store.getters['master/getPreferredCuisine']
    console.log(cuisines)
    if (!cuisines || cuisines.length === 0) {
      store.dispatch('master/getCuisines').then(() => {
        cuisines = store.getters['master/getPreferredCuisine']
      })
    }

    return {
      cuisines,
      val: ref([]),
    }
  },
  created() {
    if (this.sendValue) {
      this.val = this.sendValue.split(',').map(Number)
    }
  },
  methods: {
    setData() {
      this.$emit('selectValue', {
        value: this.val.join(','),
        field: this.fieldName,
      })

      if (this.sendDisplayField !== null) {
        this.$emit('selectValue', {
          value: this.val
            .map(
              (item) =>
                this.cuisines.find((cuisine) => cuisine.id === item).name
            )
            .join(','),
          field: this.sendDisplayField,
        })
      }
    },
  },
}
</script>
