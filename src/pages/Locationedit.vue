<template>
  <q-page class="location-edit">
    <div class="common-head">
      <div class="ch-left">
        <router-link to="location"><i class="fas fa-arrow-left"></i></router-link> Edit Location
      </div>
    </div>
    <div class="common-inner">
      <div class="q-pa-md">
                <div class="form-group q-mb-md">
                  <q-input v-model="locationtitle" label="Location Title" />
                </div>
                <div class="form-group q-mb-md loc-icon">
                  <q-input v-model="location" label="Location" />
                  <router-link to="location"><span class="material-icons absolute-right">gps_fixed</span></router-link>
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
