<template>
  <q-page class="location">
    <div class="common-head">
      <div class="ch-left">
        <router-link :to="{name: 'home'}"><i class="fas fa-arrow-left"></i></router-link> Change Location
      </div>
    </div>
    <div class="common-inner">
      <div class="location-map">
        <GMapMap
          :center="getPosition"
          :zoom="7"
          :options="{ streetViewControl: true }"
          map-type-id="terrain"
          style="width: 100vw; height: 20rem"
          ref="myMapRef"
        >
          <GMapMarker
            :key="index"
            v-for="(m, index) in getMarker"
            :position="m.position"
            :icon="{
              url: require('assets/logo1.png'),
              scaledSize: {width: 30, height: 40},
              labelOrigin: {x: 16, y: -10}
            }"
            :clickable="true"
            :draggable="true"
          />
        </GMapMap>
        <div class="map-btn">
          <div class="row">
            <div class="col q-pr-sm">
              <q-btn icon="gps_fixed" class="btn btn3 full-width" :label="$q.lang.location.currentLocation" />
            </div>
            <div class="col col q-pl-sm">
              <q-btn to="/locationsearch" icon="search" class="btn btn3 full-width" :label="$q.lang.location.searchPlaceholder" />
            </div>
          </div>
        </div>
      </div>
      <div class="fixed-bottom">
        <q-btn class="btn btn1 full-width" :label="$q.lang.location.confirmLocation" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, defineComponent, watch } from 'vue'
import { mapGetters, useStore } from 'vuex'
import { Geolocation } from '@capacitor/geolocation'
import { saveLocation } from 'src/store/location/mutations'

export default defineComponent({
  name: 'LocationIndex',
  setup () {
    const position = ref('determining...')
    const myMapRef = ref();
    const store = useStore()
    let lat = ref(0)
    let lng = ref(0)
    let markers = ref(0)

    function getCurrentPosition() {
      Geolocation.getCurrentPosition().then(newPosition => {
        console.log('Current', newPosition.coords)
        store.commit('location/saveLocation', newPosition.coords)
        store.commit('location/saveCurrentLocation', newPosition.coords)
      })
    }

    let geoId

    onMounted(() => {
      getCurrentPosition()

      // we start listening
      geoId = Geolocation.watchPosition({}, (newPosition, err) => {
        console.log('New GPS position')
        position.value = newPosition
      })
    })

    watch(myMapRef, googleMap => {
      if (googleMap) {
        googleMap.$mapPromise.then(map=> {
          addMyButton(map);
        })
      }
    });

    onBeforeUnmount(() => {
      // we do cleanup
      Geolocation.clearWatch(geoId)
    })

    return {
      lat,
      lng,
      position,
      markers
    }
  },
  computed: {
    ...mapGetters('location', [
      'getPosition',
      'getMarker'
    ])
  }
})
</script>

<style lang="scss" scoped>
  .vue-map-container {
    height: 720px;
  }
</style>
