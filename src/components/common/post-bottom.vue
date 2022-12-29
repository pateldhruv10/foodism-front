<template>
  <div class="post-btm flex justify-between">
    <div class="post-btm-left">
      <ul class="flex">
        <slot name="left"/>
        <!-- <li @click="open('emoji-selection', emojiselection)">
          <img src="~assets/like.svg">
        </li>
        <li @click="open('share-popup', emojiselection)"><img src="~assets/share.svg"></li> -->
      </ul>
    </div>
    <div class="post-btm-right">
      <ul class="flex">
        <slot name="right"/>
      </ul>
    </div>
  </div>
</template>

<script>
// used in contest bottom component, bite post, recipe box, video recipe box

import { ref } from 'vue'

export default {
  name: "PostBottom",
  // components:{
  //   'emoji-selection': defineAsyncComponent(() => import('../../components/common/emoji-selection.vue')),
  //   'share-popup': defineAsyncComponent(() => import('../../components/common/share-popup.vue')),
  // },
  setup(){
    const savedraft = ref(false)
    const emojiselection = ref(false)

    return {
      savedraft,
      emojiselection,
    }

  },
  methods: {
    setValue(data) {
      console.log(data);
      this.allpopup = false
      this[`${data.field}`] = data.value
    }
  },
}
</script>
<style lang="scss">
  // $
  .post-btm{
    // border-top: 1px solid $bg5;
    padding-top: 5px;
    ul{
      padding: 0;
      margin-bottom: 0;
      margin-top: 5px;
      li{
        list-style-type: none;
        margin-right: 20px;
        display: flex;
        align-items: center;
        img{
          height: 25px;
        }
        .q-img{
          width: 30px;
        }
        i{
          font-size: 28px;
        }
      }
      li:last-child{
        margin-right: 0;
      }
    }
    .post-btm-right{
      ul{
        li{
          margin-right: 0;
        }
      }
    }
  }
</style>
