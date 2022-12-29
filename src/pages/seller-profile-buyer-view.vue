<template>
  <q-page class="sp-bv">
    <div class="cover-img">
      <q-img src="../assets/c9.jpg"></q-img>
      <div class="back-arrow">
        <router-link to="/"><i class="fas fa-arrow-left"></i></router-link>
      </div>
    </div>
    <div class="page-inner">
      <div class="sp-bv-box">
        <div class="sp-bv-img">
          <q-img src="../assets/lg1.png"></q-img>
        </div>
        <div class="sp-bv-info">
          <div class="sp-info-top q-pt-md">
            <div class="sp-info-tl">
              <h5>Manisha Bharani's Kitchen</h5>
              <p class="sl-info"><span class="sp-dot">Sion, Mumnai</span><span class="q-pl-sm"><i class="las la-map-marker-alt"></i> 10 Km</span></p>
            </div>
            <div class="rt-box">
              <q-img src="../assets/rating.png"></q-img>
              <span>4.5</span>
            </div>
          </div>
          <p class="v-more">View More...</p>
          <div class="sp-info-btm q-pt-md">
            <div class="tags">
              <span>South Indian</span><span>north indian</span><span>chinese</span><span>pizza</span><span>beverages</span><span>desserts</span><span>fast food</span>
            </div>
            <p class="q-pt-md">Fusion Dishes, Relaxed Atmosphere, Comfortable Sea:ng Area, South Indian Food, Packed on Weekends, Cute Packaging</p>
          </div>
        </div>
      </div>
      <div class="seller-product">
        <div class="seller-product-tab">
          <div class="q-gutter-y-md" style="max-width: 600px">
            <q-card class="no-shadow">
              <q-tabs
                v-model="tab"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                narrow-indicator
              >
                <div class="tab-left">
                  <q-tab name="products" label="Products" />
                  <q-tab name="reviews" label="Reviews" />
                </div>
                <div class="tab-right">

                </div>

              </q-tabs>

              <q-tab-panels v-model="tab">
                <q-tab-panel name="products">
                  <div class="pr-top">
                    <div class="veg-togal-btn">
                      <q-toggle
                        :label="`Veg Only`"
                        v-model="greenModel"
                        color="green"
                      />
                    </div>
                    <div class="pr-top-right">
                      <router-link class="q-mr-md" to=""><i class="fas fa-search"></i></router-link>
                      <router-link to="" @click="showFilter = true"><i class="fas fa-filter"></i></router-link>
                    </div>
                  </div>
                  <div class="recommended-rcp">
                    <div class="title-tag">
                      <h5><span>Explore by Cuisines</span></h5>
                    </div>
                    <div class="recommended-rcp-list">
                      <food-box />
                      <food-box />
                      <food-box />
                      <food-box />
                      <food-box />
                    </div>
                  </div>
                  <div class="all-users-rcp">
                    <div class="title-tag">
                      <h5><span>Bakery</span></h5>
                    </div>
                    <div class="all-rcp-list flex">
                      <food-box />
                      <food-box />
                      <food-box />
                      <food-box />
                      <food-box />
                      <food-box />
                    </div>
                  </div>

                </q-tab-panel>

                <q-tab-panel name="reviews">
                  <div class="review-sec">
                    <div class="review-box">
                      <div class="rev-user-info">
                        <div class="rev-user-left">
                          <q-img src="../assets/img1.jpg"></q-img>
                          <p>Jay Kadam</p>
                        </div>
                        <div class="rev-time">
                          2 month ago
                        </div>
                      </div>
                      <div class="user-commonts">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      </div>
                      <div class="cmn-rev-box q-mt-sm">
                        <q-img src="../assets/rating.png"></q-img>
                        <span>4.5</span>
                      </div>
                    </div>
                    <div class="review-box">
                      <div class="rev-user-info">
                        <div class="rev-user-left">
                          <q-img src="../assets/img1.jpg"></q-img>
                          <p>Jay Kadam</p>
                        </div>
                        <div class="rev-time">
                          2 month ago
                        </div>
                      </div>
                      <div class="user-commonts">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      </div>
                      <div class="cmn-rev-box q-mt-sm">
                        <q-img src="../assets/rating.png"></q-img>
                        <span>4.5</span>
                      </div>
                    </div>
                    <div class="review-box">
                      <div class="rev-user-info">
                        <div class="rev-user-left">
                          <q-img src="../assets/img1.jpg"></q-img>
                          <p>Jay Kadam</p>
                        </div>
                        <div class="rev-time">
                          2 month ago
                        </div>
                      </div>
                      <div class="user-commonts">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      </div>
                      <div class="cmn-rev-box q-mt-sm">
                        <q-img src="../assets/rating.png"></q-img>
                        <span>4.5</span>
                      </div>
                    </div>
                    <div class="review-box">
                      <div class="rev-user-info">
                        <div class="rev-user-left">
                          <q-img src="../assets/img1.jpg"></q-img>
                          <p>Jay Kadam</p>
                        </div>
                        <div class="rev-time">
                          2 month ago
                        </div>
                      </div>
                      <div class="user-commonts">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      </div>
                      <div class="cmn-rev-box q-mt-sm">
                        <q-img src="../assets/rating.png"></q-img>
                        <span>4.5</span>
                      </div>
                    </div>
                  </div>
                </q-tab-panel>
              </q-tab-panels>
            </q-card>


          </div>
        </div>

      </div>
      <q-dialog v-model="showFilter" position="bottom">
          <recipe-filter />
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
    'food-box' : require('src/components/home/food-box.vue').default,
  },
  name: 'seller-profile-buyer-view-Index'
})
</script>

