<template>
  <q-page class="search-slist">
    <div class="common-head">
      <div class="ch-left">
        <router-link to="/Allcuisines"><i class="fas fa-arrow-left"></i></router-link> Chinese
      </div>
      <div class="ch-right">
        <router-link class="q-mr-md" to=""><i class="fas fa-search"></i></router-link>
        <router-link to="" @click="showFilter = true"><i class="fas fa-filter"></i></router-link>
      </div>
    </div>
    <div class="common-inner">
        <div class="search-seller-list">
          <div class="search-sl-box">
            <div class="search-sl-img">
              <router-link to="">
                <q-img src="../assets/sl1.jpg"></q-img>
              </router-link>
            </div>
            <div class="search-sl-dis">
              <h6 class="sl-name"><router-link to="">Manisha Bharti's Kitchen</router-link></h6>
              <p class="sl-info"><span class="sp-dot">Sion, Mumnai</span><span><i class="las la-map-marker-alt"></i> 10 Km</span></p>
                <p class="sl-rt"><span class=""><q-img src="../assets/rating.png"></q-img> 3.5</span></p>
            </div>
          </div>
          <div class="search-sl-box">
            <div class="search-sl-img">
              <router-link to="">
                <q-img src="../assets/sl1.jpg"></q-img>
              </router-link>
            </div>
            <div class="search-sl-dis">
              <h6 class="sl-name"><router-link to="">Manisha Bharti's Kitchen</router-link></h6>
              <p class="sl-info"><span class="sp-dot">Sion, Mumnai</span><span><i class="las la-map-marker-alt"></i> 10 Km</span></p>
                <p class="sl-rt"><span class=""><q-img src="../assets/rating.png"></q-img> 3.5</span></p>
            </div>
          </div>
          <div class="search-sl-box">
            <div class="search-sl-img">
              <router-link to="">
                <q-img src="../assets/sl1.jpg"></q-img>
              </router-link>
            </div>
            <div class="search-sl-dis">
              <h6 class="sl-name"><router-link to="">Manisha Bharti's Kitchen</router-link></h6>
              <p class="sl-info"><span class="sp-dot">Sion, Mumnai</span><span><i class="las la-map-marker-alt"></i> 10 Km</span></p>
                <p class="sl-rt"><span class=""><q-img src="../assets/rating.png"></q-img> 3.5</span></p>
            </div>
          </div>
        </div>

        <q-dialog v-model="showFilter" position="bottom">
          <cuisine-filter />
          <div class="bottom-btn">
              <div class="row">
                <div class="col q-pr-sm">
                  <q-btn class="btn btn2 full-width" label="Clear All" />
                </div>
                <div class="col col q-pl-sm">
                  <q-btn class="btn btn1 full-width" label="Apply" />
                </div>
              </div>
          </div>
        </q-dialog>

    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data(){
    return{
      showFilter:false,
    }
  },
  components:{

  },
  name: 'AllcuisinesIndex'
})

</script>
