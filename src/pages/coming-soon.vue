<template>
  <q-page class="coming-soon-page">
    <div class="common-inner">
        <h3 class="text-center q-pb-lg">Market is opening soon</h3>
        <q-img src="~assets/cm-soon.jpg"></q-img>
        <!-- <p class="text-center">Lorem Ipsum Its a dummy text</p> -->
        <!-- <router-link to=""></router-link> -->
        <p class="text-center q-pb-xl q-pt-lg"><q-btn :to="{ name: 'feedback-form' }" class="btn1">Registration Form</q-btn></p>
    </div>
    <!-- <div class="absolute-bottom cms-img">
      <q-img src="~assets/comming-soon.png"></q-img>
    </div> -->
  </q-page>
</template>

<script>
import { ref, defineComponent,defineAsyncComponent } from 'vue';
export default defineComponent({
  name: 'ComingSoon',
  components:{
    
  },
  setup () {
    return {
    }
  },
})
</script>
<style lang="scss">
  // $
  .coming-soon-page{
    display: flex;
    align-items: center;
    justify-content: center;
    h3{
      line-height: 1.5;
      font-size: 26px;
    }
    .cms-img{
      .q-img{
        width: 190px;
      }
    }
    p{
      margin-bottom: 10px;
      font-size: 20px;
    }
  }
</style>
