<template>
  <div class="winner-box">
    <div class="contest-img">
      <q-img src="~assets/contest-winner.jpg"></q-img>
    </div>
    <div class="contest-title q-mt-sm">
      <h5><router-link :to="{ 'name': 'contest-details' }"> You are my cup cake event</router-link></h5>
    </div>
    <div class="contest-detail q-pt-sm">
      <p class="contest-date"><router-link to="">08 Feb <span class="q-px-sm">To</span> 14 Feb</router-link></p>
    </div>
    <div class="winner-section">
      <h5>{{ $q.lang.contest.winner }} (148)</h5>
      <div class="winner-list">
        <div class="row q-col-gutter-x-md">
          <div class="col-4">
            <router-link to="">
              <div class="winner-user">
                <div class="wu-img">
                  <q-img src="~assets/pr-pic.jpg"></q-img>
                </div>
                <div class="wu-detail">
                  <p class="name">Sangeeta davra Sangeeta davra Sangeeta davra</p>
                  <p class="view">Views: 1023</p>
                  <p class="price">Price: 1000rs</p>
                </div>
              </div>
            </router-link>
          </div>
          <div class="col-4">
            <router-link to="">
              <div class="winner-user">
                <div class="wu-img">
                  <q-img src="~assets/pr-pic.jpg"></q-img>
                </div>
                <div class="wu-detail">
                  <p class="name">Sangeeta davra Sangeeta davra Sangeeta davra</p>
                  <p class="view">Views: 1023</p>
                  <p class="price">Price: 1000rs</p>
                </div>
              </div>
            </router-link>
          </div>
          <div class="col-4">
            <router-link to="">
              <div class="winner-user">
                <div class="wu-img">
                  <q-img src="~assets/pr-pic.jpg"></q-img>
                </div>
                <div class="wu-detail">
                  <p class="name">Sangeeta davra Sangeeta davra Sangeeta davra</p>
                  <p class="view">Views: 1023</p>
                  <p class="price">Price: 1000rs</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <div class="q-pt-lg text-center">
          <q-btn class="btn1" :label="$q.lang.contest.moreWinner" />
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import { defineAsyncComponent, ref } from 'vue'
export default {
  components:{
    
  },
  
  name: "Conestwinner",
}
</script>
<style lang="scss">
// $
.winner-box{
  padding: 20px;
  .contest-img{
    .q-img{
      @extend .border-radius3;
      max-height: 250px;
    }
  }
  .contest-date{
    font-size: 18px;
    @extend .primary-font-semibold;
  }
  .winner-section{
    h5{
      font-size: 22px;
    }
    .winner-list{
      padding-top: 15px;
      .winner-user{
        .wu-img{
          text-align: center;
          .q-img{
            width: 80px;
            height: 80px;
            @extend .border-radius;
            border:3px solid $whight;
          }
        }
        .wu-detail{
          background: $whight;
          padding: 5px 10px;
          @extend .border-radius2;
          margin-top: -5px;
          p{
            margin: 0;
            font-size: 16px;
            @extend .primary-font-semibold;
          }
          .name{
            -webkit-line-clamp: 1;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
          }
          .view{
            color: $text-color2;
            font-size: 14px;
          }
          .price{
            font-size: 18px;
            color: $primary;
            @extend .title-font;
          }
        }
      }
      .q-btn{
        width:70%;
        @extend .border-radius2;
        text-transform: capitalize;
        padding: 10px 0;
        font-size: 16px;
      }
    }
  }
}
.winner-box:nth-child(5n+1){
  background: $deep-purple-11;
}
.winner-box:nth-child(5n+2){
  background: $light-pink;
}
.winner-box:nth-child(5n+3){
  background: $light-green;
}
.winner-box:nth-child(5n+4){
  background: $light-yello;
}
.winner-box:nth-child(5n+5){
  background: $light-blue;
}
/***  media query  ***/
@media only screen and (max-width: 479px) {
  .winner-box{ 
    .winner-section{ 
      .winner-list{ 
        .winner-user{
          .wu-detail{
            padding: 5px;
            .name{
              font-size: 14px;
            }
            .view{
              font-size: 12px;
            }
            .price{
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>
