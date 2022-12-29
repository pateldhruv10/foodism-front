<template>
  <q-page class="search-page">
    <div class="common-head">
      <div class="search-head">
        <div class="ch-left">
          <router-link to="/"><i class="fas fa-arrow-left"></i></router-link>
        </div>
        
           <q-input v-model="search" type="search" placeholder="Search or Filter by for Food" :dense="dense">
          
            <q-icon name="search"></q-icon>
            </q-input>
          
        
      </div>
  
    </div>
    <div class="common-inner">
      <div class="search-st">
        <h5>Popular Searches</h5>
        <div class="cui-list q-pb-lg">
          <div class="cui-box">
            <div class="cui-img">
              <router-link to="">
                <q-img src="../assets/img1.jpg"></q-img>
              </router-link>
            </div>
            <p><router-link to="">Bakery</router-link></p>
          </div>
          <div class="cui-box">
            <div class="cui-img">
              <router-link to="">
                <q-img src="../assets/img1.jpg"></q-img>
              </router-link>
            </div>
            <p><router-link to="">Bakery</router-link></p>
          </div>
          <div class="cui-box">
            <div class="cui-img">
              <router-link to="">
                <q-img src="../assets/img1.jpg"></q-img>
              </router-link>
            </div>
            <p><router-link to="">Bakery</router-link></p>
          </div>
          <div class="cui-box">
            <div class="cui-img">
              <router-link to="">
                <q-img src="../assets/img1.jpg"></q-img>
              </router-link>
            </div>
            <p><router-link to="">Bakery</router-link></p>
          </div>
          <div class="cui-box">
            <div class="cui-img">
              <router-link to="">
                <q-img src="../assets/img1.jpg"></q-img>
              </router-link>
            </div>
            <p><router-link to="">Bakery</router-link></p>
          </div>
          <div class="cui-box">
            <div class="cui-img">
              <router-link to="">
                <q-img src="../assets/img1.jpg"></q-img>
              </router-link>
            </div>
            <p><router-link to="">Bakery</router-link></p>
          </div>
          <div class="cui-box">
            <div class="cui-img">
              <router-link to="">
                <q-img src="../assets/img1.jpg"></q-img>
              </router-link>
            </div>
            <p><router-link to="">Bakery</router-link></p>
          </div>
        </div>
      </div>
      <div class="search-sb">
        <h5 class="">Popular Seller</h5>
        <div class="p-seller-list">
          <div class="p-seller-box">
            <div class="p-seller-img">
              <router-link to="">
                <q-img src="../assets/lg1.png"></q-img>
              </router-link>
            </div>
            <p><router-link to="">Sangita's Kitchen</router-link></p>
          </div>
          <div class="p-seller-box">
            <div class="p-seller-img">
              <router-link to="">
                <q-img src="../assets/lg1.png"></q-img>
              </router-link>
            </div>
            <p><router-link to="">Sangita's Kitchen</router-link></p>
          </div>
          <div class="p-seller-box">
            <div class="p-seller-img">
              <router-link to="">
                <q-img src="../assets/lg1.png"></q-img>
              </router-link>
            </div>
            <p><router-link to="">Sangita's Kitchen</router-link></p>
          </div>
          <div class="p-seller-box">
            <div class="p-seller-img">
              <router-link to="">
                <q-img src="../assets/lg1.png"></q-img>
              </router-link>
            </div>
            <p><router-link to="">Sangita's Kitchen</router-link></p>
          </div>

        </div>
        <div class="search-recipe-list">
          <div class="search-rc-box">
            <div class="search-rc-img">
              <router-link to="">
                <q-img src="../assets/c3.jpg"></q-img>
                <div class="veg-box"><div class="veg-box-circle"></div></div>
              </router-link>
            </div>
            <div class="search-rc-dis">
              <h6 class="rc-name"><router-link to="">Summer Sun lceream with chocolate</router-link></h6>
              <p class="wh-pr"><span class="sp-dot">1kg</span> <span> ₹ 400 </span></p>
              <p class="rc-info"><span class="sp-dot hd-name">Manisha Bharti's Kitchen</span><span class="sp-dot"><q-img src="../assets/rating.png"></q-img> 3.5</span><span><i class="las la-map-marker-alt"></i> 10 Km</span></p>
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
              <h6 class="rc-name"><router-link to="">Summer Sun lceream with chocolate</router-link></h6>
              <p class="wh-pr"><span class="sp-dot">1kg</span> <span> ₹ 400 </span></p>
              <p class="rc-info"><span class="sp-dot hd-name">Manisha Bharti's Kitchen</span><span class="sp-dot"><q-img src="../assets/rating.png"></q-img> 3.5</span><span><i class="las la-map-marker-alt"></i> 10 Km</span></p>
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
              <h6 class="rc-name"><router-link to="">Summer Sun lceream with chocolate</router-link></h6>
              <p class="wh-pr"><span class="sp-dot">1kg</span> <span> ₹ 400 </span></p>
              <p class="rc-info"><span class="sp-dot hd-name">Manisha Bharti's Kitchen</span><span class="sp-dot"><q-img src="../assets/rating.png"></q-img> 3.5</span><span><i class="las la-map-marker-alt"></i> 10 Km</span></p>
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
              <h6 class="rc-name"><router-link to="">Summer Sun lceream with chocolate</router-link></h6>
              <p class="wh-pr"><span class="sp-dot">1kg</span> <span> ₹ 400 </span></p>
              <p class="rc-info"><span class="sp-dot hd-name">Manisha Bharti's Kitchen</span><span class="sp-dot"><q-img src="../assets/rating.png"></q-img> 3.5</span><span><i class="las la-map-marker-alt"></i> 10 Km</span></p>
            </div>
          </div>
        </div>
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
        <div class="no-search-result">
          <q-img src="../assets/no-search.jpg"></q-img>
          <h5>Sorry!</h5>
          <p>We Can't find any product <br> matching your search.</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchIndex'
})
</script>
<style lang="scss">
// $
  @import '../css/page/search.scss';
</style>
