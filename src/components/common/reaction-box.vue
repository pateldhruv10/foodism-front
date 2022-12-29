<template>
  <div class="reaction-box">
    <ul v-if="item">
      <li>
        <!-- Check if user is loggedin and have reaction -->
        <template v-if="item.reaction">
        <component v-if="item.reaction" :is="item.reaction"></component>
        </template>

        <!-- Check if user is not loggedin and have reaction -->
        <!-- Show first reaction -->
        <component v-for="(item, index) in showableReactions" :key="index" :is="item"></component>

        <!-- Show second reaction -->
        <!-- <component v-if="reactions.length > 1" :is="reactions[1]"></component> -->

        <!-- Show third reaction if current user not have any reaction-->
        <!-- <component
          v-if="
            !item.reaction && item.reaction !== 'Clear' && reactions.length > 2
          "
          :is="reactions[2]"
        ></component> -->

        <span
          v-if="
            item.reactionCount > 3
          "
          >and {{ valtypes(item.reactionCount - 3) }} others</span
        >
      </li>
    </ul>

    <span v-if="item.iMadeItCount == 1"
      >{{ item?.iMadeItCount ?? 0 }} Person made it</span
    >
    <span v-else-if="item.iMadeItCount > 1">
      {{ valtypes(item?.iMadeItCount) }} People made it
    </span>
  </div>
</template>

<script>
  import { computed, defineAsyncComponent, ref, watch } from 'vue'
  import { useStore } from 'vuex'
  import rcounts from 'src/composable/reactionCounts'
  export default {
    name: 'ReactionBox',
    props: {
      item: {
        type: Object,
      },
    },
    components: {
      Drool: defineAsyncComponent(() =>
        import(
          /* webpackChunkName: "img-svg" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          'src/components/svg/Drool.vue'
        )
      ),
      Hot: defineAsyncComponent(() =>
        import(
          /* webpackChunkName: "img-svg" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          'src/components/svg/Hot.vue'
        )
      ),
      Yummy: defineAsyncComponent(() =>
        import(
          /* webpackChunkName: "img-svg" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          'src/components/svg/yummy.vue'
        )
      ),
      Chef: defineAsyncComponent(() =>
        import(
          /* webpackChunkName: "img-svg" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          'src/components/svg/Chef.vue'
        )
      ),
      LoveLike: defineAsyncComponent(() =>
        import(
          /* webpackChunkName: "img-svg" */
          /* webpackMode: "lazy" */
          /* webpackInclude: /\.vue$/ */
          'src/components/svg/Love.vue'
        )
      ),
    },
    setup(props) {
      const store = useStore()
      const { valtypes } = rcounts()
      const user = computed(() => {
        return store.getters['auth/getUser']
      })

      const reactions = computed(() => {
        const tempReactions = _.cloneDeep(props.item.reactions);
        const index = tempReactions.indexOf(props.item.reaction);
        console.log(`Found ${props.item.reaction} emozi on index ${index}`);
        if (index > -1) {
          tempReactions.splice(index, 1);
          return tempReactions;
        }

        return tempReactions
      })

      const showableReactions = computed(() => {
        let tempShowReaction = [];
        if(reactions.value && reactions.value.length > 0) {
          const tempReactions = _.cloneDeep(props.item.reactions);
          const index = tempReactions.indexOf(props.item.reaction);
          console.log(`Found ${props.item.reaction} emozi on index ${index}`);
          if (index > -1) {
            tempReactions.splice(index, 1);
          }


          if(props.item.reaction) {
            tempShowReaction.push(props.item.reaction);
            tempShowReaction.push(tempReactions[0]);
            tempShowReaction.push(tempReactions[1]);
          } else {
            tempShowReaction.push(tempReactions[0]);
            tempShowReaction.push(tempReactions[1]);
            tempShowReaction.push(tempReactions[2]);
          }
          return tempShowReaction;
        }

        return [];
      });

      // watch(reactions.value, (newVal, oldVal) => {
      //   const tempReactions = _.cloneDeep(newVal.value);
      //   const reactions = [];
      //   if(props.item.reaction) {
      //     reactions.push(props.item.reaction);
      //     reactions.push(tempReactions[0]);
      //     reactions.push(tempReactions[1]);
      //   } else {
      //     reactions.push(tempReactions[0]);
      //     reactions.push(tempReactions[1]);
      //     reactions.push(tempReactions[2]);
      //   }
      //   return reactions
      // })


      console.log(reactions.value);
      return {
        valtypes,
        reactions,
        showableReactions,
        user,
        isLoggedIn: computed(() => {
          return store.getters['auth/isLoggedIn']
        }),
      }
    },
  }
</script>
<style lang="scss">
  // $
  .reaction-box {
    // padding: 5px 0px;
    // margin: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #d2d2d2;

    ul {
      // background: $light-orange;
      margin: 0;
      padding: 5px 0px;
      @extend .border-radius2;
      display: flex;
      border-top-left-radius: 0;
      li {
        list-style-type: none;
        padding: 0 10px 0 5px;
        display: flex;
        align-items: center;
        @extend .primary-font-semibold;
        .q-img {
          width: 20px;
          height: 20px;
          margin-right: 2px;
          .q-img__container {
            img {
              object-fit: inherit !important;
            }
          }
        }
        span {
          margin-left: 5px;
          display: flex;
          line-height: 1;
          margin-top: 3px;
        }
      }
    }
  }
</style>
