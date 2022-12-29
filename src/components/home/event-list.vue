<template>
  <div class="scroll">
    <q-pull-to-refresh @refresh="refresh" scroll-target="body" draggable="false">
      <div class="scroll-y">
        <q-infinite-scroll @load="getEvent" :offset="350" scroll-target="body" ref="scrollEvent">
          <host-event-box v-for="event in events" :key="event.slug" :item="event" />
          <span class="no-event" v-if="!loading && events.length == 0" color="primary" size="40px" >
            <q-img src="~assets/no-event.png"></q-img>
            {{ $q.lang.event.noRecord }}
          </span>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots v-if="loading" color="primary" size="40px" />
              <!-- <span v-else color="primary" size="40px">No More Data</span> -->
            </div>
          </template>
        </q-infinite-scroll>
      </div>
    </q-pull-to-refresh>
  </div>
</template>

<script>
import { defineAsyncComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { date } from 'quasar'

export default {
  name: 'EventList',
  components: {
    'host-event-box': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "event-component" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/home/host-event-box.vue'
      )
    ),
  },
  setup() {
    const store = useStore()
    const loading = ref(true)
    const currentPage = ref(1)
    const limit = ref(5)
    const eventTab = computed(() => store.state.home.eventTab)

    function convert(str) {
      return date.formatDate(str, 'YYYYMMDD')
    }

    function fetchEvent() {
      const event = store.getters['event/getDateRange'].from && store.getters['event/getDateRange'].to ? 'custom' : eventTab.value

      const postData = {
        event_list: event, // Using tab
        event_type: store.getters['event/getSearchMode'] || [],
        city_id: store.getters['event/getSearchCity'] || [],
        order: store.getters['event/getSortOption'] || [],
        start_date: store.getters['event/getDateRange'].from ? convert(store.getters['event/getDateRange'].from) : null,
        end_date: store.getters['event/getDateRange'].to ? convert(store.getters['event/getDateRange'].to) : null,
        page: currentPage.value,
        limit: limit.value,
      }
      return store.dispatch('home/fetchEvents', postData)
    }
    return {
      loading,
      scrollEvent: ref('body'),
      eventTab,
      currentPage,
      limit,
      fetchEvent,
      events: computed(() => {
        return store.getters['home/events']
      }),
      refresh(done) {
        store.commit('home/setEvents', [])
        currentPage.value = 1

        fetchEvent().then((res) => {
          if (res.success && res.data.data.length > 0) {
            done()
          } else {
            loading.value = false
            done(true)
          }
        })
      },
      async getEvent(index, done) {
        fetchEvent().then((res) => {
          if (res.success && res.data.data.length > 0) {
            currentPage.value = currentPage.value + 1
            done()
          } else {
            loading.value = false
            done(true)
          }
        })
      },
    }
  },
  methods: {
    applyFilter() {
      console.log('Top Parent Apply Filter')
      this.currentPage = 1
      this.$store.commit('home/setEvents', [])
      this.$refs.scrollEvent.reset()
      this.$refs.scrollEvent.resume()
      this.$refs.scrollEvent.trigger()
    },
  },
}
</script>
