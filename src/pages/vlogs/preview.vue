<template>
  <q-page class="add-bites bites-preview">
    <div class="common-head">
      <div class="ch-left">
        <router-link :to="{name:'add-vlog'}"><i class="fas fa-arrow-left"></i></router-link> {{ $q.lang.vlog.preview }}
      </div>
    </div>

    <div class="common-inner">
      <!-- <vlog-post /> -->
       <div class="bites-post" >
    <user-head :user="user" />
    <div class="bites-title">
      <h5>{{ myPreview.name }}</h5>
    </div>
    <div class="bites-video">
      <router-link class="flex relative-position" to="">
        <video class="video-cus" style="width: 100%" controls>
          <source type="video/mp4" :src="myPreview.video" />
        </video>
      </router-link>
    </div>
    <reaction-box />
    <post-bottom />
    <div class="col-12 q-mb-sm q-pt-lg" v-if="myPreview.video_category">
      <div class="relative-position">
        <p class="detail-title" >
          {{ $q.lang.vlog.fields.videoCategory.label }}
        </p>
        <!-- <div class="absolute-right edit-option">
          <i class="las la-pen"></i>
        </div> -->
      </div>
      <div class="taglist"  >
        <ul>
          <li v-for="item in myPreview.video_category" :key="item">
            <q-btn :label="item" />
          </li>
        </ul>
      </div>
    </div>
    <div class="col-12 bites-dis">
      <p>{{ myPreview.desc }}</p>
      <div class="img-after-upload" v-if="myPreview.image">
        <q-img class="upload-img" :src="myPreview.image" alt="image" />
      </div>
    </div>
  </div>
      <div class="fixed-bottom add-bites-btm box-shadow-cus">
          <q-btn class="btn btn2" label="Save as Draft" @click="draft"/>
          <q-btn class="btn btn1 float-right" label="Submit" />
        </div>

    </div>

  </q-page>
</template>

<script>
import { defineAsyncComponent, ref } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'vlogpreview',
  setup(){
     const store = useStore()
    return{
       myPreview: computed(() => {
        return store.getters['event/getPreviewData']
      }),
      user: computed(() => {
        return store.getters['auth/getUser'];
      }),
    }
  },
  // components: {
  //   'vlog-post': defineAsyncComponent(() => import('../../components/home/vlog-post.vue')),
  // },
  methods:{
   async draft(){
      // alert('saved to draft')
      this.$store.commit('event/saveToDraft')
      this.$router.push({ 'name' : 'user-home' })
    }
  }

}
</script>
<style lang="scss">
// $

</style>
