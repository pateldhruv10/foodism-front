<template>
  <q-page class="location-search">
    <div class="common-head">
      <div class="ch-left">
        <router-link to="location"><i class="fas fa-arrow-left"></i></router-link> Search Location
      </div>
      <div class="full-width q-pt-md">
        <q-input v-model="search" type="search" placeholder="Search or Filter by for Food" :dense="dense">
            <q-icon name="search"></q-icon>
            <q-icon class="close-icon" name="close"></q-icon>
        </q-input>
      </div>
    </div>
    <div class="common-inner">
      <div class="search-location-list">
        <div class="sl-box">
          <q-icon><i class="las la-map-marker"></i></q-icon>
          <div class="sl-details q-pl-sm">
            <p class="sl-m">Pratiksa junior callage</p>
            <p class="sl-s">Court Area, Ahmedabad</p>
          </div>
        </div>
        <div class="sl-box">
          <q-icon><i class="las la-map-marker"></i></q-icon>
          <div class="sl-details q-pl-sm">
            <p class="sl-m">Pratiksa junior callage</p>
            <p class="sl-s">Court Area, Ahmedabad</p>
          </div>
        </div>
        <div class="sl-box">
          <q-icon><i class="las la-map-marker"></i></q-icon>
          <div class="sl-details q-pl-sm">
            <p class="sl-m">Pratiksa junior callage</p>
            <p class="sl-s">Court Area, Ahmedabad</p>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LocationsearchIndex'
})
</script>
