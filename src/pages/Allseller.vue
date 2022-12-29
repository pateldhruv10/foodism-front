<template>
  <q-page class="all-seller">
    <header-with-backbutton title="sellers" extraClass="fixed-top">
      <template #right>
        <router-link to="/Searchcuisines"
          ><i class="fas fa-search"></i
        ></router-link>
      </template>
    </header-with-backbutton>
    <div class="common-inner">
      <div class="search-seller-list">
        <div class="search-sl-box">
          <div class="search-sl-img">
            <router-link to="">
              <q-img src="../assets/sl1.jpg"></q-img>
            </router-link>
          </div>
          <div class="search-sl-dis">
            <h6 class="sl-name">
              <router-link to="">Manisha Bharti's Kitchen</router-link>
            </h6>
            <p class="sl-info">
              <span class="sp-dot">Sion, Mumnai</span
              ><span><i class="las la-map-marker-alt"></i> 10 Km</span>
            </p>
            <p class="sl-rt">
              <span class=""
                ><q-img src="../assets/rating.png"></q-img> 3.5</span
              >
            </p>
          </div>
        </div>
        <div class="search-sl-box">
          <div class="search-sl-img">
            <router-link to="">
              <q-img src="../assets/sl1.jpg"></q-img>
            </router-link>
          </div>
          <div class="search-sl-dis">
            <h6 class="sl-name">
              <router-link to="">Manisha Bharti's Kitchen</router-link>
            </h6>
            <p class="sl-info">
              <span class="sp-dot">Sion, Mumnai</span
              ><span><i class="las la-map-marker-alt"></i> 10 Km</span>
            </p>
            <p class="sl-rt">
              <span class=""
                ><q-img src="../assets/rating.png"></q-img> 3.5</span
              >
            </p>
          </div>
        </div>
        <div class="search-sl-box">
          <div class="search-sl-img">
            <router-link to="">
              <q-img src="../assets/sl1.jpg"></q-img>
            </router-link>
          </div>
          <div class="search-sl-dis">
            <h6 class="sl-name">
              <router-link to="">Manisha Bharti's Kitchen</router-link>
            </h6>
            <p class="sl-info">
              <span class="sp-dot">Sion, Mumnai</span
              ><span><i class="las la-map-marker-alt"></i> 10 Km</span>
            </p>
            <p class="sl-rt">
              <span class=""
                ><q-img src="../assets/rating.png"></q-img> 3.5</span
              >
            </p>
          </div>
        </div>
        <div class="search-sl-box">
          <div class="search-sl-img">
            <router-link to="">
              <q-img src="../assets/sl1.jpg"></q-img>
            </router-link>
          </div>
          <div class="search-sl-dis">
            <h6 class="sl-name">
              <router-link to="">Manisha Bharti's Kitchen</router-link>
            </h6>
            <p class="sl-info">
              <span class="sp-dot">Sion, Mumnai</span
              ><span><i class="las la-map-marker-alt"></i> 10 Km</span>
            </p>
            <p class="sl-rt">
              <span class=""
                ><q-img src="../assets/rating.png"></q-img> 3.5</span
              >
            </p>
          </div>
        </div>
        <div class="search-sl-box">
          <div class="search-sl-img">
            <router-link to="">
              <q-img src="../assets/sl1.jpg"></q-img>
            </router-link>
          </div>
          <div class="search-sl-dis">
            <h6 class="sl-name">
              <router-link to="">Manisha Bharti's Kitchen</router-link>
            </h6>
            <p class="sl-info">
              <span class="sp-dot">Sion, Mumnai</span
              ><span><i class="las la-map-marker-alt"></i> 10 Km</span>
            </p>
            <p class="sl-rt">
              <span class=""
                ><q-img src="../assets/rating.png"></q-img> 3.5</span
              >
            </p>
          </div>
        </div>
        <div class="search-sl-box">
          <div class="search-sl-img">
            <router-link to="">
              <q-img src="../assets/sl1.jpg"></q-img>
            </router-link>
          </div>
          <div class="search-sl-dis">
            <h6 class="sl-name">
              <router-link to="">Manisha Bharti's Kitchen</router-link>
            </h6>
            <p class="sl-info">
              <span class="sp-dot">Sion, Mumnai</span
              ><span><i class="las la-map-marker-alt"></i> 10 Km</span>
            </p>
            <p class="sl-rt">
              <span class=""
                ><q-img src="../assets/rating.png"></q-img> 3.5</span
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue'

export default defineComponent({
  name: 'AllcuisinesIndex',
  components: {
    'header-with-backbutton': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "header-with-backbutton" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/layouts/header-with-backbutton.vue'
      )
    ),
  },
})
</script>
