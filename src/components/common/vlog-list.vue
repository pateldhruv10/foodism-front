<template>
  <div class="rc-list col-6" >
    <div class="draft-box">
      <div class="bites-cover">
        <q-img :src="item?.image" :loading="eager" :decoding="async" :crossorigin="anonymous"></q-img>
        <div class="ply-btn absolute-center">
          <q-img src="~assets/video.svg"></q-img>
        </div>
      </div>
      <div class="rc-title ellipsis-2-lines">{{item?.name}}</div>

      <slot name="controls"/>
    </div>
  </div>

</template>

<script setup>
const props = defineProps({
   item: {
      type: Object,
      required: true,
    },
     link:{
      type: Object,
      required: true,
    }
})

</script>
<style lang="scss">
  // $
  .rc-grid{
    padding: 0 10px;
    .rc-list{
      position: relative;
      .draft-box{
        background: $bg7;
        display: flex;
        flex-direction: column;
        @extend .border-radius2;
        .bites-cover{
          position: relative;
          .q-img{
            height: 150px;
            @extend .border-radius2;
          }
          .ply-btn{
            width: 55px;
            background: rgba(0,0,0,0.6);
            padding: 10px;
            @extend .border-radius3;
            .q-img{
              height: 100%;
            }
          }
        }
        .rc-title{
          padding: 5px 10px;
          @extend .primary-font-semibold;
          height: 50px;
        }
      }
    }
    .rc-list.video{
      .q-icon{
        background: rgba(0,0,0,0.6);
        font-size: 26px;
        padding: 5px;
        @extend .border-radius2;
        color: $whight;
      }
    }
  }
/***  media query  ***/
@media only screen and (max-width: 479px) {
  .rc-grid.op1{
    .rc-list{
      a{
        .q-img{
          height: 120px;
        }
      }
    }
  }
}

</style>
