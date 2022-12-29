<template>
  <q-page class="myFav-page">
    <div class="">
      <header-with-backbutton :title="$q.lang.common.sidebar.myFavorites" />
    </div>
    <div class="common-inner">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="recipes" label="Recipes" />
          <!-- <q-tab name="bites" label="Vlogs" /> -->
          <q-tab name="events" label="Events" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="recipes">
            <div class="rc-grid row q-col-gutter-sm">
              <fav-recipe-list />
            </div>
          </q-tab-panel>
          <!-- <q-tab-panel name="bites">
            <div class="rc-grid row q-col-gutter-sm">
              <fav-vlog-list/>
            </div>
          </q-tab-panel> -->
          <q-tab-panel name="events">
            <div class="rc-grid row q-col-gutter-sm">
              <fav-event-list />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
    <q-dialog v-model="allpopup" position="bottom" :class="dialogClass">
      <component
        :is="currentFrom"
        :sendValue="sendValue"
        :fieldName="currentField"
        :sendDisplayField="sendDisplayField"
        :sendOptions="sendOptions"
        v-on:selectValue="setValue"
      >
      </component>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, defineAsyncComponent, computed } from 'vue'
import useDialog from 'src/composable/useDialog'
import api from '../../apis/index'

export default defineComponent({
  name: 'myFavIndex',
  components: {
    'fav-event-list': defineAsyncComponent(() =>
      import('src/components/user/fav-event-list.vue')
    ),
    'fav-recipe-list': defineAsyncComponent(() =>
      import('src/components/user/fav-recipe-list.vue')
    ),
    'fav-vlog-list': defineAsyncComponent(() =>
      import('src/components/user/fav-vlog-list.vue')
    ),
    'recipe-list': defineAsyncComponent(() =>
      import('components/common/recipe-list.vue')
    ),
    'vlog-list': defineAsyncComponent(() =>
      import('src/components/common/vlog-list.vue')
    ),
    'search-recipes': defineAsyncComponent(() =>
      import('components/common/search-recipes.vue')
    ),
    'header-with-backbutton': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "common-header" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/layouts/header-with-backbutton.vue'
      )
    ),
  },

  setup() {
    const { allpopup, currentFrom, currentField, dialogClass, open } =
      useDialog()
    return {
      // myPreview,

      tab: ref('recipes'),
      allpopup,
      currentFrom,
      currentField,
      dialogClass,
      open,
    }
  },
  created(){

  },
  methods: {
    setValue(data) {
      console.log(data)
      this.allpopup = false
      this[`${data.field}`] = data.value
    },
  },
})
</script>
<style lang="scss">
// $
.myFav-page {
  .common-head {
    @extend .background1;
  }
  .common-inner {
    padding: 20px 0px;
    .q-card {
      box-shadow: none;
      .q-tabs {
        .q-tabs__content {
          .q-tab {
            .q-tab__label {
              text-transform: capitalize;
              font-size: 18px;
            }
            .q-tab__indicator {
              bottom: 5px;
            }
          }
        }
      }
      .q-tab-panels {
        .q-tab-panel {
          padding: 15px 0;
        }
      }
    }
  }
  .rcp-control {
    position: absolute;
    top: 10px;
    right: 0;
    display: none;
    i {
      margin-right: 5px;
      font-size: 16px;
      background: rgba(0, 0, 0, 0.5);
      @extend .border-radius;
      padding: 5px;
      color: $whight;
    }
  }
}
</style>
