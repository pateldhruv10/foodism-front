<template>
  <div class="cmn-ftab">
    <q-splitter
      v-model="splitterModel"
      class=""
    >

      <template v-slot:before>
        <q-tabs
          v-model="tab"
          vertical
          class="text-teal"
        >
          <q-tab class="" name="cuisine" label="Cuisines" />
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
          <q-tab-panel name="cuisine">
            <div class="q-pa-xs">
                <q-option-group
                :options="optionscuisine"
                type="checkbox"
                v-model="group"
                left-label
                />
            </div>
          </q-tab-panel>

          <q-tab-panel name="sort">
            <div class="q-pa-xs">
                <q-option-group
                :options="optionsort"
                type="radio"
                v-model="groupradio"
                />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </template>

    </q-splitter>
  </div>
</template>
<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
        tab: ref('cuisine'),
        splitterModel: ref(25),
        group: ref([]),
        optionscuisine: [
            { label: 'afghan', value: 'afghan' },
            { label: 'Chinese', value: 'Chinese' },
            { label: 'african', value: 'african' },
            { label: 'american', value: 'american' },
            { label: 'andhra', value: 'andhra' },
            { label: 'arabian', value: 'arabian' },
            { label: 'asian', value: 'asian' },
            { label: 'bakery', value: 'bakery' },
            { label: 'Friend request', value: 'friend1' },
            { label: 'Friend request', value: 'friend2' },
            { label: 'Friend request', value: 'friend3' },
            { label: 'Picture uploaded', value: 'upload' },
            { label: 'Friend request', value: 'friend4' },
            { label: 'Friend request', value: 'friend5' },
            { label: 'Friend request', value: 'friend6' },
            { label: 'Picture uploaded', value: 'upload4' },
            { label: 'Friend request', value: 'friend7' },
            { label: 'Friend request', value: 'friend8' },
            { label: 'Friend request', value: 'friend9' },
            { label: 'Picture uploaded', value: 'upload2' }
        ],
        groupradio: ref([]),
        optionsort: [
            { label: 'popular', value: 'popular' },
            { label: 'location nearby', value: 'location' },
            { label: 'ratings', value: 'ratings' }
        ]
    }
  }
}
</script>