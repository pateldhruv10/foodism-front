<template>
  <div class="block-profile-box">
    <div class="profile-left">
      <router-link to="">
         <user-image :user_image="item.user_id" />
      </router-link>

      <div class="profile-details">
        <div class="name"><router-link to="">{{item.name}}</router-link></div>
        <div class="location">{{getCity(item.city_id)}}</div>
      </div>
    </div>
    <div class="profile-right">
      <q-btn class="btn2 text-capitalize" @click="unblock" label="unblock" />
    </div>
  </div>
</template>

<script>
import  {defineAsyncComponent, ref}  from 'vue'
import api from '../../apis/index'
import { mapGetters } from 'vuex'
export default {
  name : 'blocked Account',
  props:{
    item:{
      type:Object
    }
  },
  // setup() {
  //  return{
  //   blockedAcc : ref(null)
  //  }
  // },
  // created(){
  //   api.get('blockList').then((res) => {
  //     this.blockedAcc = res.data
  //   })
  // }
  methods:{
    unblock(){
      //  this.$destroy();
      var data = {
        user_id : this.item.user_id,
        type : 'unblock'
      }
      api.post('block' , data)
        this.$el.parentNode.removeChild(this.$el);
    },
    getCity(id) {
      return this.city.find((item) => item.id === id)?.name
    },
  },
  computed:{
    ...mapGetters({
      city: 'master/getCities',
    }),
  },
  components:{
    'user-image': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "user-image" */
        /* webpackMode: "lazy" */
        'components/user/user-image.vue'
      )
    ),
  }
}
</script>

<style lang="scss">
// $
.block-profile-box{
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
