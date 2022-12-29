<template>
  <div class="cmn-ftab">
    <q-splitter v-model="splitterModel" class="">
      <template v-slot:before>
        <q-tabs v-model="tab" vertical class="text-teal">
          <q-tab
            name="type"
            label="Type"
            v-if="currentRouteName !== 'user-home'"
          />
          <q-tab name="mode" label="Mode" />
          <q-tab
            v-if="groupMode.includes('offline')"
            name="city"
            label="City"
          />
          <q-tab
            v-if="$store.state.home.eventTab == 'upcoming'"
            name="date-range"
            label="date-range"
          />
          <q-tab name="sort" label="sort" />
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
          <q-tab-panel name="type" v-if="currentRouteName !== 'user-home'">
            <div class="q-pa-xs">
              <q-option-group
                :options="typeOptions"
                type="checkbox"
                v-model="groupType"
                left-label
              />
            </div>
          </q-tab-panel>
          <q-tab-panel name="mode">
            <div class="q-pa-xs">
              <q-option-group
                :options="modeOptions"
                type="checkbox"
                v-model="groupMode"
                left-label
              />
            </div>
          </q-tab-panel>

          <q-tab-panel name="date-range">
            <div class="q-pa-xs">
              <label class="filter-label">Select Date Range</label>

              <div class="col-12 form-group">
                <q-input
                  filled
                  :model-value="startDate"
                  label="Start Date"
                  @click="$refs.startDateProxy.show()"
                >
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                        ref="startDateProxy"
                        class="center-popup"
                      >
                        <div>
                          <q-date v-model="startDate">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                              <q-btn
                                v-close-popup
                                label="Ok"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </div>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-12 form-group">
                <q-input
                  filled
                  :model-value="endDate"
                  label="End Date"
                  @click="$refs.endDateProxy.show()"
                >
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                        ref="endDateProxy"
                        class="center-popup"
                      >
                        <div>
                          <q-date v-model="endDate" :options="optionsEndFn">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                              <q-btn
                                v-close-popup
                                label="Ok"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </div>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
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

          <q-tab-panel v-if="groupMode.includes('offline')" name="city">
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
    if (this.currentRouteName === 'user-home') {
      this.tab = 'mode'
    } else {
      this.tab = 'type'
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const groupCity = ref(store.getters['event/getSearchCity'] || [])
    const groupType = ref(store.getters['event/getSearchType'] || [])

    const groupMode = ref(store.getters['event/getSearchMode'] || [])

    const daterange = ref(
      store.getters['event/getDateRange'] || { from: '', to: '' }
    )
    const groupSort = ref(store.getters['event/getSortOption'] || 'asc')

    const startDate = ref(daterange.value.from)
    const endDate = ref(daterange.value.to)

    function applyFilter() {
      if (groupMode.value[0] === 'online') {
        console.log(groupMode.value[0])

        store.commit('event/setSearchCity', [])
      } else {
        store.commit('event/setSearchCity', groupCity.value)
      }

      store.commit('event/setSearchType', groupType.value)

      store.commit('event/setSearchMode', groupMode.value)
      store.commit('event/setDateRange', {
        from: startDate.value,
        to: endDate.value,
      })
      store.commit('event/setSort', groupSort.value)
      emit('filterApplied', 'event') // Emit to parent
    }

    let cities = store.getters['event/getEventCityOption']
    let cityOption = ref(cities)

    if (cities.length === 0) {
      store.dispatch('event/getEventCitiesApi').then(() => {
        cities = store.getters['event/getEventCityOption']
        cityOption.value = cities
      })
    }

    const searchCity = ref(null)

    function convert(str) {
      return date.formatDate(str, 'DD-MM-YYYY')
    }

    const showDateRange = ref(
      daterange.value.from && daterange.value.to
        ? convert(daterange.value.from) + ' to ' + convert(daterange.value.to)
        : null
    )
    watch(daterange, (val) => {
      console.log(val)
      showDateRange.value =
        val && typeof val == 'object'
          ? convert(val.from) + ' - ' + convert(val.to)
          : null
      if (typeof val == 'string') {
        daterange.value = { from: val, to: val }
      }
    })

    return {
      startDate,
      endDate,
      showDateRange,
      searchCity,
      cityOption,
      applyFilter,
      filterFn() {
        if (searchCity.value === '') {
          cityOption.value = cities
          return
        } else {
          const needle = searchCity.value.toLowerCase()
          cityOption.value = cities.filter((v) => {
            if (v.label.toLowerCase().startsWith(needle)) {
              return v
            }
          })
          return
        }
      },
      optionsEndFn(d) {
        return (
          d >= date.formatDate(startDate.value, 'YYYY/MM/DD') &&
          d >= date.formatDate(new Date(), 'YYYY/MM/DD')
        )
      },
      tab: ref('type'),
      splitterModel: ref(25),
      groupCity,
      groupType,
      groupMode,
      groupSort,
      daterange,
      typeOptions: [
        {
          value: 'current',
          label: 'Current',
        },
        {
          value: 'upcoming',
          label: 'Upcoming',
        },
      ],
      modeOptions: [
        {
          value: 'online',
          label: 'Online',
        },
        {
          value: 'offline',
          label: 'Offline',
        },
      ],
      sortOption: [
        {
          label: 'Latest First',
          value: 'u2c',
        },
        {
          label: 'Oldest First',
          value: 'c2u',
        },
      ],
    }
  },
}
</script>
