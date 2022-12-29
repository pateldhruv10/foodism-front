<template>
  <q-page class="rewards-page head-fix">
    <div class="common-head fixed-top">
      <div class="ch-left">
        <router-link :to="{ name: '' }"><i class="fas fa-arrow-left"></i></router-link> Total Rewards
      </div>
      <div class="ch-right">
        
      </div>
    </div>
    <div class="common-inner">
      <div class="total-reward">
        <p><span></span> 520 Points</p>
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
            <q-tab name="history" label="My History" />
            <q-tab name="bdetails" label="Bank Details" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="history">
              <div class="history-box">
                <ul>
                  <li><span class="h-left">Add Recipe</span><span class="h-right">100</span></li>
                  <li><span class="h-left">Recipe Reaction</span><span class="h-right">5</span></li>
                  <li><span class="h-left">Register</span><span class="h-right">100</span></li>
                </ul>
                <ul>
                  <li><span class="h-left">Debited</span><span class="h-right">105</span></li>
                </ul>
                <ul>
                  <li><span class="h-left">Total</span><span class="h-right">105</span></li>
                </ul>
              </div>
            </q-tab-panel>

            <q-tab-panel name="bdetails">
              <div class="bdetails-box">
                <ul>
                  <li><span class="h-left">Holder Name</span><span class="h-right">Vyom Shah</span></li>
                  <li><span class="h-left">Bank Name</span><span class="h-right">HDFC Bank</span></li>
                  <li><span class="h-left">IFSC Code</span><span class="h-right">HDFC0021</span></li>
                  <li><span class="h-left">Primary Account</span><span class="h-right">Non</span></li>
                </ul>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
      

    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed , defineAsyncComponent } from 'vue';

export default defineComponent({
  name: 'flpIndex',
  components:{
  },
  setup () {

    return {
      tab: ref('history'),
    }
  }
})
</script>
<style lang="scss">
  // $
  @import '../../css/flp.scss';
</style>
