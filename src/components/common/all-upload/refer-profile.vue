<template>
  <div class="refer-profile-box" v-for="n in 5" :key="`${n}`">
    <div class="profile-left">
      <router-link to="">
        <q-img src="~assets/pr-pic.svg"></q-img>
      </router-link>
      <div class="profile-details">
        <div class="name"><router-link to="">Sangeeta Davara </router-link></div>
        <div class="location">Ahmedabad</div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref  } from 'vue';

export default defineComponent({
  name: "referralProfile",

})
</script>
<style lang="scss">
// $
.refer-profile-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 0 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid $bg5;
  .profile-left{
    display: flex;
    align-items: center;
    .q-img{
      width: 60px;
      @extend .border-radius2;
    }
    .profile-details{
      margin-left: 15px;
      .name{
        font-size: 18px;
        @extend .primary-font-semibold;
      }
      .location{
        font-size: 16px;
        color: $text-color2;
      }
    }
  }
  .profile-right{
    .q-btn{
      @extend .border-radius2;
      @extend .primary-font-semibold;
    }
  }
}

</style>
