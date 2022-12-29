<template>
  <div class="cmn-flt">
    <q-card class="popup-cm">
      <q-card-section class="row items-center pop-head">
        <h6>{{ sendValue }} Filter</h6>

        <q-space />

        <q-btn
          icon="filter_alt_off"
          @click="clearFilter()"
          flat
          round
          dense
          v-close-popup
        />

        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="pop-body popup-fix-bottm">
        <component :is="component" @filterApplied="applyFilter">
          <template v-slot:buttonTitle> Apply </template>
        </component>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { defineComponent, defineAsyncComponent, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'GlobalSearch',
  emits: ['filterApplied'],
  props: {
    sendValue: {
      type: String,
      default: 'Global',
    },
    fieldName: {
      type: String,
      default: '',
    },
    sendDisplayField: {
      type: String,
      default: null,
    },
  },
  setup(props, { emit }) {
    const store = useStore()

    const component = computed(() =>
      defineAsyncComponent(() =>
        import(`src/components/tabbing/${props.sendValue}-filter-tabs.vue`)
      )
    )

    function applyFilter(data) {
      console.log('Reached to parent')
      emit('filterApplied', data)
    }

    function clearFilter() {
      store.dispatch('event/resetEvents')
      store.dispatch('recipe/resetRecipes')
      store.dispatch('home/resetProfile')

      emit('filterApplied', props.sendValue)
    }

    return {
      component,
      applyFilter,
      clearFilter,
    }
  },
  components: {
    'event-filter-tabs': defineAsyncComponent(() =>
      import('src/components/tabbing/event-filter-tabs.vue')
    ),
  },
})
</script>
