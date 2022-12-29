<template>
  <div class="select-cus-popup">
    <q-card-section class="row items-center pop-head">
      <h6>{{ $q.lang.addRecipes.PopUpTitle.hashtags }}</h6>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="pop-body popup-fix-bottm">
      <div class="port-type">
        <div class="checkbox-cus q-pb-md">
          <q-option-group :options="cuisines" type="checkbox" v-model="val" />
        </div>
      </div>
      <div class="absolute-bottom q-px-lg q-py-md box-shadow-cus">
        <q-btn
          class="btn full-width btn1"
          flat
          dense
          @click="setData()"
          :label="$q.lang.label.save"
        />
      </div>
    </q-card-section>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'HashtagSelector',
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

    let cuisines = store.getters['master/getCuisineTypeOption']
    console.log(cuisines)
    if (!cuisines || cuisines.length === 0) {
      store.dispatch('master/getCuisines').then(() => {
        cuisines = store.getters['master/getCuisineTypeOption']
      })
    }

    // options: [
    //   { label: 'chinese', value: 'veg' },
    //   { label: 'europian', value: 'nonveg' },
    //   { label: 'indian', value: 'contains' },
    //   { label: 'italian', value: 'vegan' },
    //   { label: 'spanish', value: 'plantbased' },
    //   { label: 'continental', value: 'glutenfree' },
    // ]

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
                this.cuisines.find((cuisine) => cuisine.value === item).label
            )
            .join(','),
          field: this.sendDisplayField,
        })
      }
    },
  },
}
</script>
<style lang="scss">
// $
</style>
