<template>
  <div class="contest-box">
    <div class="contest-card">
      <contest-slider />
      <div class="contest-dis">
        <div class="contest-title q-mt-sm">
          <h5>
            <router-link :to="{ name: 'contest-details' }">
              You are my cup cake event</router-link
            >
          </h5>
        </div>
        <div class="contest-head flex items-center">
          <!-- <div class="rec-user-img">
            <router-link to=""><q-img src="~assets/pr-pic.jpg"></q-img></router-link>
          </div> -->
          <div class="contest-detail">
            <p class="contest-date">
              <router-link to=""
                >08 Feb <span class="q-px-sm">To</span> 14 Feb</router-link
              >
            </p>
          </div>
        </div>
        <p class="q-py-md">
          You are my cup cake event experience that offers an impressive array
          of punchy salads, sweet and sour curries, healthy stir-fry, mains,
          endless...
        </p>
        <contest-bottom />
      </div>
    </div>
  </div>
  <q-dialog v-model="allpopup" position="bottom" :class="dialogClass">
    <component
      :is="currentFrom"
      :sendValue="sendValue"
      :fieldName="currentField"
      :sendDisplayField="sendDisplayField"
      v-on:selectValue="setValue"
    ></component>
  </q-dialog>
</template>
<script>
import { defineAsyncComponent, ref } from 'vue'
import useDialog from 'src/composable/useDialog'
export default {
  components: {
    // 'user-option': defineAsyncComponent(() => import('../common/user-option.vue')),

    'contest-bottom': defineAsyncComponent(() =>
      import('components/common/contest-bottom.vue')
    ),
    'contest-slider': defineAsyncComponent(() =>
      import('components/common/contest-slider.vue')
    ),
  },
  setup() {
    const savedraft = ref(false)
    const { allpopup, currentFrom, currentField, dialogClass, open } =
      useDialog()
    const emojiselection = ref(false)
    const joincontest = ref(false)

    return {
      allpopup,
      currentFrom,
      currentField,
      dialogClass,
      open,
      savedraft,
      joincontest,

      emojiselection,
      sendValue: ref(null),
      sendDisplayField: ref(null),
      slide: ref(1),
      autoplay: ref(true),
    }
  },
  methods: {
    setValue(data) {
      console.log(data)
      this.allpopup = false
      this[`${data.field}`] = data.value
    },
  },
  name: 'ConestCards',
}
</script>
<style lang="scss">
// $
@import '../../css/components/contest-cards.scss';
</style>
