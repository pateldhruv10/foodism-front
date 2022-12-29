<template>
  <div class="select-cus-popup">
    <q-card-section class="row items-center pop-head">
      <h6>Block User</h6>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="pop-body popup-fix-bottm">
      <div class="user-op-list q-pb-md">
        <q-option-group
          :options="blockuser"
          type="radio"
          v-model="group"
        />

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
  name: "BlockUser",
  setup () {
    return {
      group: ref(null),

      blockuser: [
        { label: 'Unfollow user', value: 'spam' },
        { label: 'Block all content', value: 'notrelated', },
        { label: 'Offensive to me', value: 'falsesymbol',}
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
