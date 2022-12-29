<template>
  <div>
    <q-splitter v-model="splitterModel" class="">
      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="recipe">
            <div class="q-pa-xs">
              <q-option-group
                :options="tabOptions"
                type="radio"
                v-model="groupTab"
                
              />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
  <div class="absolute-bottom q-px-lg q-py-md box-shadow-cus">
    <q-btn
      @click="applyFilter"
      v-close-popup
      class="btn full-width btn1"
      flat
      dense
    >
      <slot name="buttonTitle" />
    </q-btn>
  </div>
  <q-dialog v-model="allpopup" position="bottom" :class="dialogClass">
    <component
      :is="currentFrom"
      :sendValue="sendValue"
      :fieldName="currentField"
      :sendDisplayField="sendDisplayField"
      :sendOptions="sendOptions"
      v-on:selectValue="setValue"
      v-on:filterApplied="filterApplied"
    >
    </component>
  </q-dialog>
</template>
<script>
import { ref, defineAsyncComponent } from 'vue'
import useDialog from 'src/composable/useDialog'
import { useStore } from 'vuex'
export default {
  name: 'all-filter-tabs',
  components: {
    'search-filter': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "search-filter" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'components/popups/search-filter.vue'
      )
    ),
  },

  setup(props, { emit }) {
    const {
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
    } = useDialog()
    const store = useStore()
    const groupTab = ref(store.getters['recipe/getTab'] || [])
    function applyFilter() {
      console.log(groupTab.value)
      store.commit('recipe/setTab', groupTab.value)
      emit('filterApplied', groupTab.value)
    }
    return {
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
      applyFilter,
      tab: ref('recipe'),
      splitterModel: 0,
      tabOptions: [
        {
          label: 'RECIPES',
          value: 'recipes',
        },
        // {
        //   label: 'VLOGS',
        //   value: 'vlogs',
        // },
        {
          label: 'PROFILES',
          value: 'profiles',
        },
        {
          label: 'EVENT',
          value: 'event',
        },
      ],
      groupTab,
      sendTab: ref(groupTab.value),
    }
  },
   created(){
      this.$store.commit('recipe/setMyRecipes' ,[])
      // this.$store.commit('event/')
  },
}
</script>
