<template>
  <div class="full-h search-city">
    <q-card-section class="row items-center pop-head">
      <div class="full-width flex">
        <h6>City</h6>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </div>
      <div class="full-width">
        <q-form class="ing-search">
          <q-input v-model="search" type="search" placeholder="Eg.ahmedabad" @keyup="filterFn">
            <q-icon name="search"></q-icon>
          </q-input>
        </q-form>
      </div>
    </q-card-section>
    <q-card-section class="pop-body popup-fix-bottm">
      <div class="search-city-box">
        <q-list bordered separator>
          <q-item v-for="item in cityOption" :key="item.value" clickable @click="selectCity(item.value)">
            <q-item-section>
              <q-item-label>{{ item.label }}</q-item-label>
              <!-- <q-item-label caption>{{ item.state }}</q-item-label> -->
            </q-item-section>
          </q-item>
        </q-list>

        <div class="fixed-bottom q-px-lg q-py-md box-shadow-cus">
          <q-btn
          class="btn full-width btn1"
          flat
          dense > {{ $q.lang.label.save }} </q-btn>
        </div>
      </div>
    </q-card-section>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: "CitySelector",
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
    let cities = store.getters['master/getCityOption'];

    if(cities.length === 0) {
      store.dispatch('master/getCitiesApi').then(() => {
        cities = store.getters['master/getCityOption'];
      });
    }
    const cityOption = ref([]);
    const search = ref(null);
    return {
      search,
      model: ref(null),
      cityOption,
      filterFn () {
        if (search.value === '') {
            cityOption.value = cities
          return
        } else {
          const needle = search.value.toLowerCase()
          cityOption.value = cities.filter(v => {
            if(v.label.toLowerCase().startsWith(needle)) {
              return v;
            }
          });
          return
        }
      },
      setModel (val) {
        model.value = val
      },
    }
  },
  methods:{
    selectCity(value) {
      this.model = value;
      this.setData()
    },
    setData() {
      this.$emit('selectValue', {
        value: this.model,
        field: this.fieldName
      })

      if(this.sendDisplayField !== null) {
        this.$emit('selectValue', {
          value: this.cityOption.find(item => item.value === this.model).label,
          field: this.sendDisplayField
        })
      }
    }
  }
}
</script>
