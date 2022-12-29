<template>
  <q-header class="mob-view">
    <div class="header flex justify-between items-center">
      <div class="header-left">
        <router-link :to="{ name: 'web-home' }"><q-img src="~assets/logo.png"></q-img></router-link>
      </div>
      <div class="header-right">
        <ul class="flex">
          <!-- <li><q-icon
              name="las la-exclamation-circle"
              @click="open('event-review')"
            ></q-icon></li> -->
          <!-- <li>
            <router-link to=""
              ><q-img src="~assets/comment.svg"></q-img
            ></router-link>
          </li> -->
          <!-- <li>
            <router-link :to="{ name: 'notification' }"
              ><q-img src="~assets/notification.svg"></q-img
            ></router-link>
          </li> -->
        </ul>
      </div>
    </div>
    <div class="sub-menu">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="left"
        narrow-indicator
        @update:model-value="changeTab"
      >
        <q-tab :ripple="false" name="recipes" label="Recipes" />
        <q-tab :ripple="false" name="events" label="Events" />
        <q-tab :ripple="false" name="vlog" label="vlog" />
        
      </q-tabs>
    </div>
  </q-header>
  <!-- <q-header class="web-view">
    <div class="header flex justify-between items-center">
      <div class="header-left">
        <router-link to=""><q-img src="~assets/logo.png"></q-img></router-link>
      </div>
      <div class="sub-menu">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="left"
          narrow-indicator
          @update:model-value="changeTab"
          >
            <q-tab name="recipes" label="Recipes" />
            <q-tab name="bites" label="vlog" />
            <q-tab name="events" label="Events" />
        </q-tabs>
      </div>
      <div class="header-right">
        <ul class="flex">
          <li><router-link to=""><q-img src="~assets/comment.svg"></q-img></router-link></li>
          <li><router-link to=""><q-img src="~assets/notification.svg"></q-img></router-link></li>
        </ul>
      </div>
    </div>

  </q-header> -->
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
import { ref, defineAsyncComponent } from 'vue'
import { useStore } from 'vuex'
import useDialog from 'src/composable/useDialog'

export default {
  name: 'UserHeader',
  components: {
    'event-review': defineAsyncComponent(() =>
      import('components/common/event-review.vue')
    ),
  },
  setup() {
    const store = useStore()
    const useroption = ref(false)

    const {
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
    } = useDialog()

    return {
      useroption,
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
      setValue(data) {
        this.allpopup = false
        this[`${data.field}`] = data.value
      },
      tab: ref(store.state.home.currentTab),
    }
  },
  methods: {
    changeTab() {
      this.$store.dispatch('event/resetEvents')
      this.$store.dispatch('recipe/resetRecipes')
      this.$store.commit('home/changeTab', this.tab)
    },
  },
}
</script>
<style lang="scss">
// $
@import '../../css/layout/header.scss';
</style>
