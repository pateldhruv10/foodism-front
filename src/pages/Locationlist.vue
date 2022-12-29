<template>
  <q-page class="location-list">
    <div class="common-head">
      <div class="ch-left">
        <router-link to="business-profile-own-view"><i class="fas fa-arrow-left"></i></router-link> Locations
      </div>
    </div>
    <div class="common-inner">
      <div class="q-px-sm">
        <div class="loc-box q-pa-md q-mb-md">
            <div class="loc-img">
              <q-img src="../assets/map.jpg"></q-img>
            </div>
            <div class="loc-detail q-pl-md">
              <p>Sion Branch</p>
              <span class="q-mb-sm flex">Pratiksha Nagar Depot Road, Pratiksha Nagar, Koliwada, Sion</span>
              <p>
                <q-btn class="btn3" to="locationedit" label="Edit"></q-btn><q-btn class="btn3" label="Delete"></q-btn>
              </p>
            </div>
          </div>
          <div class="loc-box q-pa-md q-mb-md">
            <div class="loc-img">
              <q-img src="../assets/map.jpg"></q-img>
            </div>
            <div class="loc-detail q-pl-md">
              <p>Sion Branch</p>
              <span class="q-mb-sm flex">Pratiksha Nagar Depot Road, Pratiksha Nagar, Koliwada, Sion</span>
              <p>
                <q-btn class="btn3" to="locationedit" label="Edit"></q-btn><q-btn class="btn3" label="Delete"></q-btn>
              </p> 
            </div>
          </div>
        <div class="fixed-bottom q-pa-md loc-btn">
          <q-btn class="btn btn2 full-width" label="Add Location" icon="add"  to="location" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LocationlistIndex'
})
</script>
