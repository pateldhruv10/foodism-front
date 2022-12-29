<template>
  <q-page class="bv-recipe-detail">
    <div class="common-head">
      <div class="ch-left">
        <router-link to="/"><i class="fas fa-arrow-left"></i></router-link>
      </div>
      <div class="ch-right">
        <div class="nt-av">Not Availabel</div>
      </div>
    </div>
    <div class="rc-details">
      <div class="rc-slider">
        <q-carousel
          animated
          v-model="slide"
          navigation
          infinite
          :autoplay="autoplay"
        >
          <q-carousel-slide :name="1" img-src="../assets/c1.jpg">

          </q-carousel-slide>
          <q-carousel-slide :name="2" img-src="../assets/c2.jpg">
          </q-carousel-slide>
          <q-carousel-slide :name="3" img-src="../assets/c3.jpg">
          </q-carousel-slide>
          <q-carousel-slide :name="4" img-src="../assets/c4.jpg">
          </q-carousel-slide>
          
        </q-carousel>
        <div class="veg-box">
          <div class="veg-box-circle"></div>
        </div>
      </div>
      <div class="rc-info">
        <div class="rc-title-dis q-pt-md">
          <div class="flex justify-between">
            <h5>Fruit Caramel Custard</h5>
            <div class="cmn-rev-box">
                        <q-img src="../assets/rating.png"></q-img>
                        <span>4.5</span>
                      </div>
          </div>
          <recipe-price />
          <p class="sl-info q-pt-sm"><span class="sp-dot">Sion, Mumnai</span><span class="q-pl-sm"><i class="las la-map-marker-alt"></i> 10 Km</span></p>
        </div>
        <div class="rc-dis q-pt-sm">
          <p>Delicious hot Caramel Jam coffee. Try this delicious flavour of hot caramel coffee recipe. I tried this one to relax and change my mood and its awesome.</p>
          <div class="row">
            <div class="col-6">
              <p class="dis-title q-mb-none">Delivery time</p> 
              <p class="dis-dt">4 hrs</p>
            </div>
            <div class="col-6">
              <p class="dis-title q-mb-none">Delivery radius</p> 
              <p class="dis-dt">Within 10 Km</p>
            </div>
            <div class="col-12">
              <p class="dis-title q-mb-none">ADDITIONAL INFORMATION</p> 
              <p class="">Delicious hot Caramel Jam coffee. Try this delicious flavour of hot caramel coffee.</p>
            </div>
            <div class="col-12 rc-seller-info">
              <p class="dis-title q-mb-none">SELLER INFORMATION</p> 
              <div class="sp-bv-info q-pb-xl">
                <div class="sp-info-top q-pt-sm">
                  <div class="sp-info-tl">
                    <div class="rc-pimg">
                      <q-img src="../assets/lg1.png"></q-img>
                    </div>
                    <div class="rc-pinfo">
                      <h6>Manisha Bharani's Kitchen</h6>
                      <p class="sl-info"><span class="">Sion</span></p>
                    </div>
                  </div>
                  <div class="rt-box">
                    <q-img src="../assets/rating.png"></q-img>
                    <span>4.5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fixed-bottom contact-seller">
        <q-btn @click="open('bottom')" class="btn btn1 full-width" label="Contact Seller" />
        
      </div>
      <q-dialog class="sc-form" v-model="showcontactsellerform" :position="position">
      
        <q-card class="popup-cm">
            <q-card-section class="row items-center pop-head">
              <h6>Contact Seller</h6>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section class="pop-body">
              <div class="form-group q-mb-md">
                <q-input v-model="mobileno" label="Mobile Number" />
              </div>
              <div class="form-group q-mb-md">
                <q-input v-model="email" label="Email" />
              </div>
              <div class="form-group q-mb-md qua-unit">
                <q-input v-model="quantity" label="Quantity" />
                <span class="uni-btn">kilogram</span>
              </div>
              <div class="form-group q-mb-xl">
                <q-input v-model="message" type="textarea" label="Enter Message" />
                <span class="ch-limit">0/500 characters</span>
              </div>
              
            </q-card-section>
            <div class="flex justify-between btm-shadow q-pa-md items-center">
                <div class="rc-btm-price">
                  <p>₹ 199</p>
                  <span>per kg</span>
                </div>
                <div class="cs-submit">
                  <q-btn to="/thank-you" label="Submit" class="btn btn4" />
                </div>
              </div>
        </q-card>
    </q-dialog>
      
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue';

export default defineComponent({
  setup () {
    const showcontactsellerform = ref(false)
    const position = ref('top')
    return {
      showcontactsellerform,
      position,
      open (pos) {
        position.value = pos
        showcontactsellerform.value = true
      },
      slide: ref(1),
      autoplay: ref(true)
    }
  },
  components:{
    'recipe-price' : require('components/product-box/recipe-price.vue').default,
  },
  name: 'Buyer-view-recipe-detail'
})
</script>
