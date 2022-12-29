<template>
  <div
    class="fv-event-list col-6"
    v-for="fevVlog in myFevVlogs"
    :key="fevVlog"
  >
    <div v-if="fevVlog">
      <q-btn
        class="text-capitalize de-btn"
        icon="delete"
        @click="removeVlogBookmark(fevVlog.id)"
      />
      <router-link
        :to="{ name: 'recipe-details', params: { slug: fevVlog.id } }"
      >
        <div class="draft-box">
          <q-img :src="getCoverPhoto(fevVlog.image)" :loading="eager" :decoding="async" :crossorigin="anonymous"></q-img>
          <div class="fv-event-title ellipsis-2-lines">
            {{ fevVlog.name }}
          </div>
        </div>
      </router-link>
    </div>
  </div>
   <not-added :item = "'Vlog'"  v-if="myFevVlogs.length == 0" />
</template>

<script>
import shareImage from 'src/composable/shareImage'
import { mapActions, useStore } from 'vuex'
import { computed, ref, defineAsyncComponent } from 'vue'
import coverImage from 'src/composable/coverPhoto'
import api from '../../apis/index'

export default {
  name: 'EventList',
  setup() {
         const {getCoverPhoto} = coverImage()
    const { showImage, GetUrl } = shareImage()
    const store = useStore()
    // store.dispatch('event/fetchFevEvents');
    return {
      GetUrl,
      getCoverPhoto,
      showImage,
      store,
      myFevVlogs:computed(() => {
        return store.getters['recipe/get_fev_recipes']
      }),

    }
  },
  methods:{
    ...mapActions('recipe', ['removeVlogBookmark']),
  },
  created(){
    // ...mapActions('recipe', ['removeVlogBookmark']),
    this.$store.dispatch('recipe/fetchFevVlog')
  },
  components:{
       'not-added' : defineAsyncComponent(() =>
      import('src/components/common/notAddedYet.vue')
    ),
  }

}
</script>
<style lang="scss">
// $
.rc-grid {
  padding: 0 10px;
  .fv-event-list {
    position: relative;
    .draft-box {
      background: $bg7;
      display: flex;
      flex-direction: column;
      @extend .border-radius2;
      .q-img {
        height: 150px;
        @extend .border-radius2;
      }
      .q-img::after {
        background: linear-gradient(
          180deg,
          rgba(2, 0, 36, 0.1516981793) 0%,
          rgba(94, 98, 97, 0) 0%,
          rgba(0, 0, 0, 0.8715861345) 100%
        );
        width: 100%;
        left: 0;
        top: 0;
        content: '';
        position: absolute;
        height: 100%;
      }
      .fv-event-title {
        padding: 5px 10px;
        @extend .primary-font-semibold;
        // height: 50px;
      }
    }
  }
}
.fv-event-list {
  .de-btn {
    color: #fff;
    position: absolute;
    padding: 0;
    top: 120px;
    right: 10px;
    z-index: 111;
  }
}
/***  media query  ***/
@media only screen and (max-width: 479px) {
  .rc-grid.op1 {
    .fv-event-list {
      a {
        .q-img {
          height: 120px;
        }
      }
    }
  }
}
</style>
