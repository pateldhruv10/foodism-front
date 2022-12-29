<template>
  <div class="cus-popup">
    <q-card-section class="row items-center pop-head">
      <h6>
        <span>{{ $q.lang.common.deleteAccount.Title }}</span>
      </h6>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="pop-body">
      <p>{{ $q.lang.common.deleteAccount.Description }}</p>
      <div class="cp-btn q-py-md">
        <q-btn class="btn2" label="Cancel" v-close-popup />
        <q-btn
          class="btn1"
          @click="deleteAcc()"
          label="Yes Delete"
        />
      </div>
    </q-card-section>
  </div>
  <q-dialog v-model="allpopup" position="bottom" :class="dialogClass">
    <component
      :is="currentFrom"
      :sendValue="sendValue"
      :fieldName="currentField"
      v-on:selectValue="setValue"
    ></component>
  </q-dialog>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref } from 'vue'
import useDialog from 'src/composable/useDialog'
import api from '../../apis/index'
import { Notify } from 'quasar'

export default {
  name: 'AccDelete',
  components: {
    'acc-deleted': defineAsyncComponent(() => import('./acc-deleted.vue')),
  },
  setup() {
    const { allpopup, currentFrom, currentField, dialogClass, open } =
      useDialog()

    const ingredient = ref(null)
    const utensil = ref(null)
    return {
      allpopup,
      currentFrom,
      currentField,
      dialogClass,
      open,
      ingredient,
      utensil,
      otp: ref('')
    }
  },
  created(){
    this.otp = this.$attrs.sendValue
  },
  methods: {
    deleteAcc(){
      var data = {
        otp : this.otp
      }
      api.delete('deleteAccount', data).then((res)=> {
        if(res.fail == false){
          Notify.create({
            type : 'negative',
            message : res.message
          })
        }else{
          this.open('acc-deleted')
        }
      })
    },
    setValue(data) {
      console.log(data)
      this.allpopup = false
      this[`${data.field}`] = data.value
    },
  },
}
</script>
<style lang="scss">
// $
.cp-btn{
  .q-btn {
    min-width: 100px;
  }
}
</style>
