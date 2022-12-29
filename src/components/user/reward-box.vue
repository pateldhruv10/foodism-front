<template>
  <div class="reward-box">
    <div class="reward-inner">
      <div class="rewrd-left" v-if="balanceinfo">
        <h5>Toral FLP Points</h5>
        <p>{{balanceinfo.totalAvailableFLPPoints}} Points</p>
      </div>
      <div class="reward-right">
        <q-img src="~assets/coins.png"></q-img>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineAsyncComponent, ref } from 'vue'
import { api } from 'src/boot/axios'

export default {
  name: 'useroption',
  setup () {
    const balanceinfo = ref(null)
    return {
      balanceinfo,
    }
  },
  created() {
    this.getBalance();
  },
  methods: {
    /**
     * Get User Balance
     */
     getBalance() {
      api
        .get(
          `/flp/user/balance`
        )
        .then((response) => {
            this.balanceinfo = response.data.data;
        })
        .catch((err) => {
          console.log(err)
        });
    }
  }

}

</script>
