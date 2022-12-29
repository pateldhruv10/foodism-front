<template>
  <div class="cmn-ftab">
    <q-splitter v-model="splitterModel" class="">
      <template v-slot:before>
        <q-tabs v-model="tab" vertical class="text-teal">
          <q-tab name="diet_category" label="Diet Category" />
          <q-tab name="cuisine" label="Cuisines Type" />
          <q-tab name="cooking_time" label="Cooking Time" />
          <q-tab name="ingredients_used" label="Ingredients Used" />
          <q-tab name="dish_type" label="Dish Type" />
          <!-- <q-tab name="step" label="Steps" /> -->
          <q-tab name="sort" label="Sort" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="diet_category">
            <div class="q-pa-xs">
              <q-option-group
                :options="dietCategoryOptions"
                type="checkbox"
                v-model="groupDietCategory"
                left-label
              />
            </div>
          </q-tab-panel>
          <q-tab-panel name="cuisine">
            <div class="q-pa-xs">
              <q-option-group
                :options="cuisineOptions"
                type="checkbox"
                v-model="groupCuisine"
                left-label
              />
            </div>
          </q-tab-panel>
          <q-tab-panel name="cooking_time">
            <div class="q-pa-md">
              <q-option-group
                :options="cookingTimeOptions"
                type="radio"
                v-model="groupCookingTime"
                
              />
            </div>
          </q-tab-panel>
          <q-tab-panel name="ingredients_used">
            <div class="q-pa-md">
              <q-option-group
                :options="ingredientsUsedOptions"
                type="radio"
                v-model="groupIngredientsUsed"
              />
            </div>
          </q-tab-panel>
          <q-tab-panel name="dish_type">
            <div class="q-pa-md">
              <q-option-group
                :options="dishTypeOptions"
                type="checkbox"
                v-model="groupDishType"
                left-label
              />
            </div>
          </q-tab-panel>
          <q-tab-panel name="step">
            <div class="q-pa-xs">
              <q-option-group
                :options="stepOptions"
                type="radio"
                v-model="groupStep"
              />
            </div>
          </q-tab-panel>

          <q-tab-panel name="sort">
            <div class="q-pa-xs">
              <q-option-group
                :options="sortOption"
                type="radio"
                v-model="groupSort"
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
</template>
<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
export default {
  setup(props, { emit }) {
    const store = useStore()

    let cuisines = store.getters['master/getPreferredCuisine']
    console.log(cuisines)
    if (!cuisines || cuisines.length === 0) {
      store.dispatch('master/getCuisines').then(() => {
        cuisines = store.getters['master/getPreferredCuisine']
      })
    }
    const groupDietCategory = ref(
      store.getters['recipe/getSearchDietCategory'] || []
    )
    const groupCuisine = ref(store.getters['recipe/getSearchCuisineType'] || [])
    const groupCookingTime = ref(
      store.getters['recipe/getSearchCookingTime'] || []
    )
    const groupSort = ref(store.getters['recipe/getSearchSort'] || [])
    const groupIngredientsUsed = ref(
      store.getters['recipe/getSearchIngredientsUsed'] || []
    )
    const groupDishType = ref(store.getters['recipe/getSearchDishType'] || [])
    const groupStep = ref(store.getters['recipe/getSearchSteps'] || [])

    function applyFilter() {
      store.commit('recipe/setSearchDietCategory', groupDietCategory.value)
      store.commit('recipe/setSearchCuisine', groupCuisine.value)

      store.commit('recipe/setSearchCookingTime', groupCookingTime.value)
      store.commit('recipe/setSearchSort', groupSort.value)
      store.commit(
        'recipe/setSearchIngredientsUsed',
        groupIngredientsUsed.value
      )
      store.commit('recipe/setSearchDishType', groupDishType.value)
      store.commit('recipe/setSearchStep', groupStep.value)
      emit('filterApplied', 'recipes') // Emit to parent
    }

    return {
      tab: ref('diet_category'),
      splitterModel: ref(25),
      standard: ref({
        min: 0,
        max: 50000,
      }),
      group: ref([]),
      groupDietCategory,
      groupCuisine,
      groupCookingTime,
      groupSort,
      groupIngredientsUsed,
      groupDishType,
      groupStep,
      dietCategoryOptions: computed(() => {
        return store.getters['master/getDietCategoryOption']
      }),
      cuisineOptions: computed(() => {
        return store.getters['master/getPreferredCuisineOption']
      }),
      cookingTimeOptions: [
        {
          label: 'Less than 30 minutes',
          value: '30',
        },
        {
          label: '30 minutes to 60 minutes',
          value: '30-60',
        },
        {
          label: '60 minutes +',
          value: '60+',
        },
      ],
      ingredientsUsedOptions: [
        {
          label: 'Less than 5 Ingredients',
          value: '5',
        },
        {
          label: '5 to 7 Ingredients',
          value: '5-7',
        },
        {
          label: 'More than 7 Ingredients',
          value: '7+',
        },
      ],
      dishTypeOptions: computed(() => {
        return store.getters['master/getdishTypeOption']
      }),
      stepOptions: [
        {
          label: 'Less than 5 Steps',
          value: '5',
        },
        {
          label: '5 to 7 Steps',
          value: '5-7',
        },
        {
          label: 'More than 7 Steps',
          value: '7+',
        },
      ],
      sortOption: [
        { label: 'popular', value: 'popular' },
        { label: 'Oldest', value: 'asc' },
        { label: 'Latest', value: 'desc' },
        // { label: 'Delivery Time', value: 'delivery time' },
        // { label: 'Location nearby', value: 'location nearby' },
        // { label: 'ratings', value: 'ratings' },
      ],
      applyFilter,
    }
  },
}
</script>
