<template>
  <div class="cmn-ftab">
    <q-splitter v-model="splitterModel" class="">
      <template v-slot:before>
        <q-tabs v-model="tab" vertical class="text-teal">
          <q-tab name="tips" label="Tips" />
          <q-tab name="travel_logs" label="Travel logs" />
          <q-tab name="health" label="Health" />
          <q-tab name="growth" label="Growth" />
          <q-tab name="photography" label="Photography" />
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
          <q-tab-panel name="tips">
            <div class="q-pa-xs">
              <q-option-group
                :options="tipsOptions"
                type="checkbox"
                v-model="groupTips"
                left-label
              />
            </div>
          </q-tab-panel>
          <q-tab-panel name="travel_logs">
            <div class="q-pa-xs">
              <q-option-group
                :options="travelLogsOptions"
                type="checkbox"
                v-model="groupTravelLogs"
                left-label
              />
            </div>
          </q-tab-panel>
          <q-tab-panel name="health">
            <div class="q-pa-md">
              <q-option-group
                :options="healthOptions"
                type="checkbox"
                v-model="groupHealth"
                left-label
              />
            </div>
          </q-tab-panel>
          <q-tab-panel name="growth">
            <div class="q-pa-md">
              <q-option-group
                :options="growthOptions"
                type="radio"
                v-model="groupGrowth"
              />
            </div>
          </q-tab-panel>
          <q-tab-panel name="photography">
            <div class="q-pa-md">
              <q-option-group
                :options="photographyOptions"
                type="checkbox"
                v-model="groupPhotography"
                left-label
              />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const groupTips = ref([])
    const groupTravelLogs = ref([])
    const groupHealth = ref([])
    const groupPhotography = ref([])
    const groupGrowth = ref([])

    return {
      tab: ref('cuisine'),
      splitterModel: ref(25),
      standard: ref({
        min: 0,
        max: 50000,
      }),
      groupTips,
      groupTravelLogs,
      groupHealth,
      groupPhotography,
      groupGrowth,

      tipsOptions: [
        {
          label: 'Tips',
          value: 'tips',
        },
      ],
      travelLogsOptions: [
        {
          label: 'Travel logs',
          value: 'travel_logs',
        },
      ],
      healthOptions: [
        {
          label: 'Health',
          value: 'health',
        },
      ],
      photographyOptions: [
        {
          label: 'Photography',
          value: 'photography',
        },
      ],
      growthOptions: [
        {
          label: 'Growth',
          value: 'growth',
        },
      ],
    }
  },
}
</script>
