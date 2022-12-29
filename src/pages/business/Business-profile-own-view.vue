<template>
  <q-page class="bus-pr-owen-view">
    <div class="mp-header">
      <div class="mp-head-left">
        <h5><router-link class="q-pr-md" to="/"><i class="fas fa-arrow-left"></i></router-link> Business Profile</h5>
      </div>
      <div class="mp-head-right">
        <div class="mp-profile">
          <router-link to="">
            <div class="mp-profile-img">
              <q-img src="~assets/pr-pic.svg"></q-img>

            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="cover-img">
      <div class="row items-start cus-uplode">
        <q-uploader
                url="http://localhost:4444/upload"
                style="max-width: 100%"
              />
      </div>
    </div>
    <div class="page-inner">
      <div class="sp-bv-box">
        <div class="sp-bv-img">
          <q-img src="~assets/lg1.png"></q-img>
          <div class="cmn-rev-box">
            <q-img src="~assets/rating.png"></q-img>
            <span>4.5</span>
          </div>
        </div>
        <div class="sp-bv-info">
          <div class="sp-info-top q-pt-lg">
            <div class="sp-info-tl">
              <h5>Manisha Bharani's Kitchen</h5>
              <p class="sl-info"><span class="q-mr-sm"><i class="las la-map-marker-alt"></i> Sion, Dadar, Bandra, Vikroli, Parel</span><router-link to="/locationlist"> <i class="las la-pen"></i></router-link></p>
            </div>
          </div>
          <div class="sp-info-btm q-pt-md">
            <p class="q-pt-md q-px-lg">Fusion Dishes, Relaxed Atmosphere, Comfortable Sea:ng Area, South Indian Food, Packed on Weekends, Cute Packaging</p>
          </div>
        </div>
        <div class="text-center">
           <q-btn class="btn btn1 q-mr-lg" label="Boost Profile" /><q-btn :to="{ name: 'business-profile-edit' }" class="btn btn2" label="Edit Profile" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue';

export default defineComponent({
  data(){
    return{
      showFilter:false,
      greenModel: ref(true),
      tab: ref('products')
    }
  },
  components:{
  },
  name: 'Business-profile-own-view-Index'
})
</script>
<style lang="scss">
  // $
  @import '../../css/business-profile.scss';
</style>

