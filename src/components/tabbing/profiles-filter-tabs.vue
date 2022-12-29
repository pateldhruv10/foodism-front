<template>
  <div class="cmn-ftab">
    <q-splitter v-model="splitterModel" class="">
      <template v-slot:before>
        <q-tabs v-model="tab" vertical class="text-teal">
          <q-tab name="type" label="Filter" />
          <q-tab name="city" label="City" />
          <!-- <q-tab name="sort" label="Sort" /> -->
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="type">
            <div class="q-pa-xs">
              <q-option-group
                :options="filterOptions"
                type="checkbox"
                v-model="groupFilter"
                left-label
              />
            </div>
          </q-tab-panel>

          <q-tab-panel name="sort">
            <div class="q-pa-xs">
              <q-option-group
                :options="sortOption"
                type="radio"
                v-model="groupSort"
                left-label
              />
            </div>
          </q-tab-panel>

          <q-tab-panel name="city">
            <div class="q-pa-xs">
              <q-form class="filter-search">
                <q-input
                  v-model="searchCity"
                  type="search"
                  placeholder="Eg.ahmedabad"
                  @keyup="filterFn"
                >
                  <q-icon name="search"></q-icon>
                </q-input>
              </q-form>

              <q-option-group
                :options="cityOption"
                type="checkbox"
                v-model="groupCity"
                left-label
              />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>

  <div class="absolute-bottom q-px-lg q-py-md box-shadow-cus">
    <!-- @click="applyFilter" -->
    <q-btn
      @click="applyFilter"
      v-close-popup
      class="btn full-width btn1"
      flat
      dense
    >
      <slot name="buttonTitle" />
    </q-btn>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { date } from 'quasar'

export default {
  name: 'event-filter-tabs',
  computed: {
    currentRouteName() {
      return this.$route.name
    },
  },
  mounted() {
    // if (this.currentRouteName === 'user-home') {
    //   this.tab = 'mode'
    // } else {
    //   this.tab = 'type'
    // }
  },
  setup(props, { emit }) {
    const store = useStore()
    const groupCity = ref(store.getters['home/getSearchCity'] || [])
    const groupFilter = ref(store.getters['home/getFilterOption'] || [])
    // const groupSort = ref(store.getters['home/getSortOption'] || 'asc')

    function applyFilter() {
      store.commit('home/setSearchCity', groupCity.value)
      store.commit('home/setFilter', groupFilter.value)
      emit('filterApplied', 'profiles') // Emit to parent
    }

    let cities = store.getters['master/getCityOption']


    // let cityOption = cities

    if (cities.length === 0) {
      store.dispatch('event/getCitiesApi').then(() => {
        cities = store.getters['event/getCityOption']
        // cityOption.value = cities
      })
    }

    const searchCity = ref(null)
    const cityOption = ref([])
    return {
      searchCity,
      cityOption,
      applyFilter,
      filterFn () {

        if (searchCity.value === '') {
            cityOption.value = cities
          return
        } else {
          const needle = searchCity.value.toLowerCase()
          cityOption.value = cities.filter(v => {
            if(v.label.toLowerCase().startsWith(needle)) {
              return v;
            }
          });
          return
        }
      },
      tab: ref('type'),
      splitterModel: ref(25),
      groupCity,
      groupFilter,
      // groupSort,
      filterOptions: [
        {
          value: 'mutual_following',
          label: 'Mutual Follow/Following',
        },
        {
          value: 'cuisine_preferences',
          label: 'Similar cuisine',
        },
        {
          value: 'diet_preference',
          label: 'Similar Diet',
        },
      ],

      sortOption: [
        {
          label: 'Popularity',
          value: 'c2u',
        },
        {
          label: 'Newest First',
          value: 'u2c',
        },
      ],
    }
  },
}
</script>
