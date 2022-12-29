<template>
  <q-page class="">
    <div class="search-section">
      <q-img src="~assets/images/bl-details.jpg"></q-img>
      <div class="search-content">
        <h1>Blogs</h1>
        <div class="search-box">
          <p class="q-pl-xl q-pr-xl">Discover recipes, learn kitchen tips & tricks, get information about ingredients and understand various cuisines and cultures from all over at India’s largest food blog collection.</p>
          <div class="flex">
            <input type="text" v-model="keyword" placeholder="Search by keywords">
            <button @click="getBlog()" class="btn btn2"><q-img src="~assets/images/search.png"></q-img></button>
          </div>
        </div>
      </div>
    </div>
    <div class="blog">
      <div class="container">
        <div class="blog-list">
          <div class="row">
            <div class="col-12 col-md-4 text-center" v-if="!getBlogData.length">
              <q-img src="~assets/no-data-found.png"></q-img>
              <h5>No Blog Found</h5>
            </div>
            <div class="col-12 col-md-4" v-for="n in getBlogData.length" :key="`none-${n}`">
              <div class="blog-box">
                <router-link :to="{ name: 'web-blog-detail', params: { slug: getBlogData[n-1].id } }">
                  <div class="blog-img">
                    <div v-if="getBlogData[n-1].blog_image">
                    <q-img :src="getBlogImage(getBlogData[n-1].blog_image)"></q-img>
                    </div>
                    <span class="blog-view">{{getBlogData[n-1].blogViewCount}} Views</span>
                  </div>
                  <div class="blog-content">
                    <h4>{{getBlogData[n-1].blog_title}}</h4>
                    <div class="blg-dis"><span v-html="getBlogData[n-1].blog_desc"></span></div>
                    <span v-if="getBlogData[n-1].blogViewCount <= 1">{{getBlogData[n-1].blogViewCount}} View</span>
                    <span v-if="getBlogData[n-1].blogViewCount > 1">{{getBlogData[n-1].blogViewCount}} Views</span>
                  </div>
                </router-link>
              </div>
            </div>

          </div>
          <div class="pagination-list mt-3" v-if="getBlogData.length">
            <div class="q-pa-lg flex justify-end">
              <q-pagination
                v-model="current"
                :max="lastPage"
                :to-fn="page => ({ query: { page } })"
                direction-links
                boundary-links
                icon-first="skip_previous"
                icon-last="skip_next"
                icon-prev="fast_rewind"
                icon-next="fast_forward"
              />
            </div>
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

export default ({
  name: 'WebBlog',
  setup () {

    return {
      current: ref(1),
      page: ref(1),
      lastPage: ref(1),
      totalRows: ref(''),
      keyword: ref('')
    }
  },

  data(){
    return{
      getBlogData:[],
    }
  },
  methods: {
    getBlog () {
      let params = {
        page: this.page,
        limit: 102,
        search: this.keyword
      }
      this.getBlogData = [];
      this.$store
        .dispatch('blog/getBlogListing', params).then((response) => {
          console.log('response => ', response)
          this.current = response.meta.current_page;
          this.lastPage = response.meta.last_page;
          this.totalRows = response.meta.next_page_url;
          for(var i in response.data) {
            this.getBlogData.push(response.data[i]);
          }
        })
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
    //console.log(this.getBlogData);
  }

})
</script>
