<template>
  <q-page class="">
    <div class="blog-detail">
      <div class="banner-cus">
        <q-img src="~assets/images/bl-details.jpg"></q-img>
        <div class="banner-content">
          <!-- <h2>About Us</h2> -->
        </div>
      </div>
      <!-- <div class="blog-img mb-5">
        <img src="~assets/images/bl-details.jpg">
      </div> -->
      <div class="blog-dis">
        <div class="container">
          <div class="row justify-center" v-if="getBlogData[0]">
            <div class="col-md-8">
              <div class="dis-title">
                <h4>{{ getBlogData[0].blog_title }}</h4>
              </div>
              <div class="q-mt-lg detail-dis">
                <div v-if="getBlogData[0].blog_image">
                <q-img class="q-mb-md" :src="getBlogImage(getBlogData[0].blog_image)"></q-img>
              </div>
                <p><span v-html="getBlogData[0].blog_desc"></span></p>
                <!-- <b>1. Honey dipper stick</b>
                <p>Take luscious photos of honey-covered pancakes or even just a bottle of golden sweet honey with a cool dipper stick in the background. And don’t think it is only limited to honey! This little stick works so well for green teas, iced teas and more – suggestive of the addition of honey of course. But it makes for an excellent prop. Get your creative juices flowing and pair it with other things too!</p>
                <b>2. Wooden teaspoons</b>
                <p>There is something absolutely dreamy about wooden things in a frame – especially wooden cutlery. Use this set of six spoons to make pictures of almost any ingredient or dish look better – from salt to curries and even sumptuous bakes, this one’s a great investment for all times!</p>
                <b>3. Wood and flowers backdrop</b>
                <p>Make your flatlays come alive with this placemat that gives a larger than life hue to your dishes and makes your backdrop look as alluring as ever. Give your dishes a floral twist and add a wooden earthy, rustic charm to each picture. </p>
                <b>4. Two-in-one backdrops</b>
                <p>These dual toned backdrops are everything you need to make your photographs look great! Two absolutely contradictory images to ensure that your images look nothing alike! A dreamy, fairy-tale-ish coffee mug placemat that gives you a wintery, cheery and almost Xmassy feel while the other one makes you taste tangerines and oranges and creates a summery effect. For the price it is being sold for, it is surely a catch!</p> -->
              </div>
            </div>
            <!-- <div class="col-md-4">
              <div class="dis-title">
                <h4>Related Blogs</h4>
              </div>
              <div class="rel-blog q-mt-lg">
                <a href="">
                  <div class="rel-blog-box">
                    <div class="rel-blog-img">
                      <q-img src="~assets/images/b1.jpg"></q-img>
                    </div>
                    <div class="rel-bl-dis">
                      <h5>Vegan Mexican Burrito Bowl Recipe</h5>
                      <p>152 Views</p>
                    </div>
                  </div>
                </a>
                <a href="">
                  <div class="rel-blog-box">
                    <div class="rel-blog-img">
                      <q-img src="~assets/images/b1.jpg"></q-img>
                    </div>
                    <div class="rel-bl-dis">
                      <h5>Vegan Mexican Burrito Bowl Recipe</h5>
                      <p>152 Views</p>
                    </div>
                  </div>
                </a>
                <a href="">
                  <div class="rel-blog-box">
                    <div class="rel-blog-img">
                      <q-img src="~assets/images/b1.jpg"></q-img>
                    </div>
                    <div class="rel-bl-dis">
                      <h5>Vegan Mexican Burrito Bowl Recipe</h5>
                      <p>152 Views</p>
                    </div>
                  </div>
                </a>
                <a href="">
                  <div class="rel-blog-box">
                    <div class="rel-blog-img">
                      <q-img src="~assets/images/b1.jpg"></q-img>
                    </div>
                    <div class="rel-bl-dis">
                      <h5>Vegan Mexican Burrito Bowl Recipe</h5>
                      <p>152 Views</p>
                    </div>
                  </div>
                </a>
                <a href="">
                  <div class="rel-blog-box">
                    <div class="rel-blog-img">
                      <q-img src="~assets/images/b1.jpg"></q-img>
                    </div>
                    <div class="rel-bl-dis">
                      <h5>Vegan Mexican Burrito Bowl Recipe</h5>
                      <p>152 Views</p>
                    </div>
                  </div>
                </a>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue';
import api from '../../apis/index';
import { DateTime } from 'luxon';
import { mapActions,mapGetters, useStore } from 'vuex'
import { useRoute } from 'vue-router'


export default defineComponent({
  name: 'WebBlog',
  setup () {
    return {
      current: ref(3)
    }
  },
  data(){
    return{
      getBlogData:[],
      timerCount: 6,
    }
  },
  methods: {
    getBlog () {
      // var getEventData = [];
      const route = useRoute()
    const slug = route.params.slug
    console.log(slug);
      api.get('/blog/blogdetail/'+ slug).then(res => {
        //  console.log(res);
         this.getBlogData.push(res.data);
         this.getBlogData.push(res.user_image);
        //  console.log(getBlogData);
    }).catch(err => {
      console.log(err);
      reject(err)
    });
    },
    getBlogImage(img){
      console.log();
      return (
        process.env.ASSET_URL+img
      )
    },
  },
  created () {
    this.getBlog();
     console.log(this.getBlogData);
  },
  watch: {
            timerCount: {
                handler(value) {

                    if (value > 0) {
                        setTimeout(() => {
                            this.timerCount--;
                        }, 1000);
                    }

                    if(value == 0){
                      const data = {
                        blog_id: this.getBlogData[0].id
                      }
                      api.post('/blog/view-count', data)
                      setTimeout(() => {
                      // this.$q.notify({
                      //   progress: true,
                      //   message: '1 View Completed',
                      //   icon: 'visibility',
                      //   color: 'white',
                      //   textColor: 'primary'
                      // })
                    })
                    }
                },
                immediate: true // This ensures the watcher is triggered upon creation
            }
        },

})
</script>
