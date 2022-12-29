<template>
  <div class="select-cus-popup">
    <q-card-section class="row items-center pop-head">
      <h6>Report User</h6>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="pop-body popup-fix-bottm">
      <div class="user-op-list q-pb-md">
        <q-option-group
          :options="reportuser"
          type="radio"
          v-model="group"
        />
        <div class="col-12 q-pl-sm form-group">
          <q-input v-model="text" label="Something else" />
        </div>

      </div>
      <div class="absolute-bottom q-px-lg q-py-md box-shadow-cus">
        <q-btn
        class="btn full-width btn1"
        flat
        dense> Save </q-btn>
      </div>

    </q-card-section>
  </div>

</template>

<script>
import { ref } from 'vue'

export default {
  name: "ReportUser",
  setup () {
    return {
      group: ref(null),

      reportuser: [
        { label: 'Spam', value: 'spam' },
        { label: 'Not related to Foodism', value: 'notrelated', },
        { label: 'False symbols', value: 'falsesymbol',},
        { label: 'Harassment', value: 'harassment',},
        { label: 'plagiarized', value: 'plagiarized',},
        { label: 'Something else', value: 'somthing else',}
      ]
    }
  }

}
</script>
<style lang="scss">
// $
.user-op-list{
  ul{
    margin-top: 0;
    li{
      font-size: 18px;
      padding: 5px 0;
    }
  }
}
</style>
