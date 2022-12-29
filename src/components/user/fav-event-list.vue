<template>
  <div
    class="fv-event-list col-6"
    v-for="fevEvent in myFevEvents"
    :key="fevEvent"
  >
    <div v-if="fevEvent">
      <q-btn
        class="text-capitalize de-btn"
        icon="delete"
        @click="deleteFevEvent(fevEvent.id)"
      />
      <!-- <router-link class="de-btn fs-cus" to=""><i class="las la-trash"></i></router-link>  -->
      <router-link
        :to="{ name: 'event-details', params: { slug: fevEvent.slug } }"
      >
        <div class="draft-box">
          <q-img :src="fevEvent.image" :loading="eager" :decoding="async" :crossorigin="anonymous"></q-img>
          <div class="fv-event-title ellipsis-2-lines">
            {{ fevEvent.name }}
          </div>
        </div>
      </router-link>
    </div>
  </div>
   <not-added :item = "'Event'"  v-if="myFevEvents.length == 0" />

</template>

<script>
import shareImage from 'src/composable/shareImage'
import { useStore } from 'vuex'
import { computed, defineAsyncComponent } from 'vue'

export default {
  name: 'EventList',
  setup() {
    const { showImage, GetUrl } = shareImage()
    const store = useStore()
    // store.dispatch('event/fetchFevEvents');
    return {
      GetUrl,
      showImage,
      store,
      myFevEvents: computed(() => {
        return store.getters['event/getFevEvents']
      }),
      deleteFevEvent(eventId) {
        store.dispatch('event/removeBookmark', eventId)
      },
    }
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
