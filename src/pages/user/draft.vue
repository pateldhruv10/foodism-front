<template>
  <q-page class="draft-page">
    <div class="">
      <header-with-backbutton :title="$q.lang.common.sidebar.drafts" />
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
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="recipes">
            <div class="rc-grid row q-col-gutter-sm">
              <recipe-list v-for="item in myRecipe" :key="item" :item="item">
                <template v-slot:recipeName>
                  <div class="rc-title ellipsis-2-lines">
                    {{ item.recipeName }}
                  </div>
                </template>
                <template v-slot:controls>
                  <div class="rcp-control">
                    <router-link
                      :to="{
                        name: 'written-recipe',
                        params: { slug: item.id },
                      }"
                    >
                      <i class="las la-pen"></i>
                    </router-link>
                    <i
                      class="las la-trash"
                      @click="removeRecipeDraft(item.id)"
                    ></i>
                    <!-- removeRecipeDraft(item.id) -->
                  </div>
                </template>
              </recipe-list>
              <not-added :item = "'recipe'"  v-if="myRecipe.length == 0" />
            </div>
          </q-tab-panel>
          <q-tab-panel name="bites">
            <div class="rc-grid row q-col-gutter-sm">
              <vlog-list
                v-for="item in myPreview"
                :key="item"
                :item="item"
                :link="slug"
              >
                <template v-slot:controls>
                  <div class="rcp-control">
                    <router-link
                      :to="{ name: 'add-vlog', params: { slug: item.id } }"
                    >
                      <i class="las la-pen"></i>
                    </router-link>
                    <i
                      class="las la-trash"
                      @click="removeVlogDraft(item.id)"
                    ></i>
                    <!-- removeVlogDraft(item.id) -->
                  </div>
                </template>
              </vlog-list>
               <not-added :item = "'Vlog'"  v-if="myPreview.length == 0" />
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
import { defineComponent, ref, defineAsyncComponent } from 'vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
import useDialog from 'src/composable/useDialog'
import { Dialog, useQuasar } from 'quasar'

export default defineComponent({
  name: 'DraftIndex',
  components: {
    'recipe-list': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "recipe-list" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'components/common/recipe-list.vue'
      )
    ),
    'vlog-list': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "vlog-list" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/common/vlog-list.vue'
      )
    ),
    'search-recipes': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "search-recipes" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'components/common/search-recipes.vue'
      )
    ),
    'header-with-backbutton': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "common-header" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/layouts/header-with-backbutton.vue'
      )
    ),
      'not-added' : defineAsyncComponent(() =>
      import('src/components/common/notAddedYet.vue')
    ),
  },

  setup() {
    const {
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
    } = useDialog()
    const $q = useQuasar()
    const store = useStore()
    const myPreview = computed(() => {
      return store.getters['event/getvlogPreview']
    })
    const myRecipe = computed(() => {
      return store.getters['recipe/getRecipeData']
    })

    return {
      $q,
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
      myPreview,
      myRecipe,
      tab: ref('recipes'),
      removeVlogDraft: (item_id) => {
        $q.dialog({
          title: 'Confirm',
          message: `Are you sure to delete this Draft....?`,
          color: 'negative',
          ok: `Yes, I'm sure`,
          cancel: 'Cancel',
          default: 'cancel',
        }).onOk(() =>{
        store.commit('event/removeDraft', item_id)
        })
        // store.commit('event/removeDraft', item_id)
      },
      removeRecipeDraft(item_id) {
        this.$q.dialog({
          title: 'Confirm',
          message: `Are you sure to delete this Draft....?`,
          color: 'negative',
          ok: `Yes, I'm sure`,
          cancel: 'Cancel',
          default: 'cancel'
        }).onOk(() =>{
         store.commit('recipe/removeRecipeDraft', item_id)
        })
        // store.commit('recipe/removeRecipeDraft', item_id)
      },
    }
  },
  methods: {
    setValue(data) {
      console.log(data)
      this.allpopup = false
      this[`${data.field}`] = data.value
    },

    // swipePage(obj) {
    //   // alert('ff')
    //   var delta
    //   switch (obj.direction) {
    //     case 'right':
    //       delta = -1
    //       this.tab = 'recipes'
    //       break
    //     case 'left':
    //       delta = 1
    //       this.tab = 'bites'
    //       break
    //     default:
    //       return
    //   }
    // },
  },
})
</script>
<style lang="scss">
// $
.draft-page {
  .common-head {
    // background: $light-orange;
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
    display: block;
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
