<template>
  <q-page class="search-cuisines">
    <div class="common-head">
      <div class="search-head">
        <div class="ch-left">
          <router-link to="/Allcuisines"
            ><i class="fas fa-arrow-left"></i
          ></router-link>
        </div>

        <q-input
          v-model="search"
          type="search"
          placeholder="Search or Filter by for Food"
          :dense="dense"
        >
          <q-icon name="search"></q-icon>
        </q-input>
      </div>
    </div>
    <div class="common-inner">
      <div class="no-search-result">
        <q-img src="../assets/no-search.jpg"></q-img>
        <h5>{{ $q.lang.common.searchNotFound.Title }}</h5>
        <p v-html="$q.lang.common.searchNotFound.Description"></p>
      </div>
      <div class="search-sb">
        <div class="search-cuisine-list">
          <div class="search-cui-box">
            <div class="search-cui-img">
              <router-link to="/Searchsellerlist">
                <q-img src="../assets/c7.jpg"></q-img>
              </router-link>
            </div>
            <div class="search-cui-dis">
              <h6><router-link to="/Searchsellerlist">Chinese</router-link></h6>
              <p>Cuisines</p>
            </div>
          </div>
          <div class="search-cui-box">
            <div class="search-cui-img">
              <router-link to="/Searchsellerlist">
                <q-img src="../assets/c7.jpg"></q-img>
              </router-link>
            </div>
            <div class="search-cui-dis">
              <h6><router-link to="/Searchsellerlist">Chinese</router-link></h6>
              <p>Cuisines</p>
            </div>
          </div>
          <div class="search-cui-box">
            <div class="search-cui-img">
              <router-link to="/occasion-recipe-list">
                <q-img src="../assets/oc3.jpg"></q-img>
              </router-link>
            </div>
            <div class="search-cui-dis">
              <h6>
                <router-link to="/occasion-recipe-list">New Year</router-link>
              </h6>
              <p>Occasion</p>
            </div>
          </div>
          <div class="search-cui-box">
            <div class="search-cui-img">
              <router-link to="/occasion-recipe-list">
                <q-img src="../assets/oc3.jpg"></q-img>
              </router-link>
            </div>
            <div class="search-cui-dis">
              <h6>
                <router-link to="/occasion-recipe-list">New Year</router-link>
              </h6>
              <p>Occasion</p>
            </div>
          </div>
        </div>
        <div class="search-recipe-list">
          <h5>Similar Products</h5>
          <div class="search-rc-box">
            <div class="search-rc-img">
              <router-link to="">
                <q-img src="../assets/c3.jpg"></q-img>
                <div class="veg-box"><div class="veg-box-circle"></div></div>
              </router-link>
            </div>
            <div class="search-rc-dis">
              <h6 class="rc-name">
                <router-link to=""
                  >Summer Sun lceream with chocolate</router-link
                >
              </h6>
              <p class="wh-pr">
                <span class="sp-dot">1kg</span> <span> ₹ 400 </span>
              </p>
              <p class="rc-info">
                <span class="sp-dot hd-name">Manisha Bharti's Kitchen</span
                ><span class="sp-dot"
                  ><q-img src="../assets/rating.png"></q-img> 3.5</span
                ><span><i class="las la-map-marker-alt"></i> 10 Km</span>
              </p>
            </div>
          </div>
          <div class="search-rc-box">
            <div class="search-rc-img">
              <router-link to="">
                <q-img src="../assets/c3.jpg"></q-img>
                <div class="veg-box"><div class="veg-box-circle"></div></div>
              </router-link>
            </div>
            <div class="search-rc-dis">
              <h6 class="rc-name">
                <router-link to=""
                  >Summer Sun lceream with chocolate</router-link
                >
              </h6>
              <p class="wh-pr">
                <span class="sp-dot">1kg</span> <span> ₹ 400 </span>
              </p>
              <p class="rc-info">
                <span class="sp-dot hd-name">Manisha Bharti's Kitchen</span
                ><span class="sp-dot"
                  ><q-img src="../assets/rating.png"></q-img> 3.5</span
                ><span><i class="las la-map-marker-alt"></i> 10 Km</span>
              </p>
            </div>
          </div>
          <div class="search-rc-box">
            <div class="search-rc-img">
              <router-link to="">
                <q-img src="../assets/c3.jpg"></q-img>
                <div class="veg-box"><div class="veg-box-circle"></div></div>
              </router-link>
            </div>
            <div class="search-rc-dis">
              <h6 class="rc-name">
                <router-link to=""
                  >Summer Sun lceream with chocolate</router-link
                >
              </h6>
              <p class="wh-pr">
                <span class="sp-dot">1kg</span> <span> ₹ 400 </span>
              </p>
              <p class="rc-info">
                <span class="sp-dot hd-name">Manisha Bharti's Kitchen</span
                ><span class="sp-dot"
                  ><q-img src="../assets/rating.png"></q-img> 3.5</span
                ><span><i class="las la-map-marker-alt"></i> 10 Km</span>
              </p>
            </div>
          </div>
          <div class="search-rc-box">
            <div class="search-rc-img">
              <router-link to="">
                <q-img src="../assets/c3.jpg"></q-img>
                <div class="veg-box"><div class="veg-box-circle"></div></div>
              </router-link>
            </div>
            <div class="search-rc-dis">
              <h6 class="rc-name">
                <router-link to=""
                  >Summer Sun lceream with chocolate</router-link
                >
              </h6>
              <p class="wh-pr">
                <span class="sp-dot">1kg</span> <span> ₹ 400 </span>
              </p>
              <p class="rc-info">
                <span class="sp-dot hd-name">Manisha Bharti's Kitchen</span
                ><span class="sp-dot"
                  ><q-img src="../assets/rating.png"></q-img> 3.5</span
                ><span><i class="las la-map-marker-alt"></i> 10 Km</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SearchIndex',
})
</script>
