<template>
  <div
    class="fv-event-list col-6"
    v-for="fevRecipe in myFevRecipes"
    :key="fevRecipe"
  >
    <div v-if="fevRecipe">
      <q-btn
        class="text-capitalize de-btn"
        icon="delete"
        @click="removeRecipeBookmark(fevRecipe.id)"
      />
      <!-- <router-link class="de-btn fs-cus" to=""><i class="las la-trash"></i></router-link>  -->
      <router-link
        :to="{ name: 'recipe-details', params: { slug: fevRecipe.id } }"
      >
        <div class="draft-box">
          <q-img :src="getCoverPhoto(fevRecipe.image)" :loading="eager" :decoding="async" :crossorigin="anonymous">
            <div v-if="fevRecipe.recipe_type == 'Video'" class="ply-btn absolute-center">
              <q-img src="~assets/video.svg"></q-img>
            </div>
          </q-img>

          <div class="fv-event-title ellipsis-2-lines">
            {{ fevRecipe.name }}
          </div>
        </div>
      </router-link>
    </div>
  </div>
   <not-added :item = "'Recipe'"  v-if="myFevRecipes.length == 0" />
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
      myFevRecipes:computed(() => {
        return store.getters['recipe/get_fev_recipes']
      }),

    }
  },
  methods:{
    ...mapActions('recipe', ['removeRecipeBookmark']),
  },
  created(){
    // ...mapActions('recipe', ['removeRecipeBookmark']),
    this.$store.dispatch('recipe/fetchFevRecipe')
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
      .ply-btn{
            width: 55px;
            background: rgba(0,0,0,0.6);
            padding: 10px;
            z-index: 9;
            @extend .border-radius3;
             position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%) !important;
            .q-img{
              height: 100%;
            }
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
        bottom: 0;
        content: '';
        position: absolute;
        height: 28%;
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
  .de-btn.fs-cus{
    font-size: 24px;
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
