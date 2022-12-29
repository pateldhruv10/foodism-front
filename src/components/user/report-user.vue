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
          <q-input v-model="text" label="Other" v-if="group == 'Other'"/>
        </div>

      </div>
      <div class="absolute-bottom q-px-lg q-py-md box-shadow-cus">
        <q-btn
        @click="reports"
        class="btn full-width btn1"
        flat
        dense> Save </q-btn>
      </div>

    </q-card-section>
  </div>
  <q-dialog v-model="allpopup" position="bottom" :class="dialogClass">
    <component
      :is="currentFrom"
      :sendValue="sendValue"
      :fieldName="currentField"
      :sendDisplayField="sendDisplayField"
      :sendOptions="sendOptions"
      v-on:selectValue="setValue"
    ></component>
  </q-dialog>
</template>

<script>
import { ref } from 'vue'
import api from '../../apis/index'
import useDialog from 'src/composable/useDialog'
import notification from 'src/boot/notification'
export default {
  name: "ReportUser",
  setup () {
     const {
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
    } = useDialog()
    return {
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
      text: ref(''),
      user_id : ref(0),
      group: ref(null),
      reportuser: [
        { label: 'Spam', value: 'Spam' },
        { label: 'Not related to Foodism', value: 'Not related to foodism', },
        { label: 'False symbols', value: 'False symbols',},
        { label: 'Harassment', value: 'Harassment',},
        { label: 'plagiarized', value: 'Plagiarized',},
        { label: 'Other', value: 'Other',}
      ]
    }
  },
  created() {
    this.id()
  },
  methods:{
     id() {
      this.user_id = this.$attrs.sendValue
      // alert(this.user_id)
    },
    reports(){
      var data = {
        user_id: this.user_id,
        type : this.group,
        reason : this.text
      }
      api.post('user/report', data).then((res) => {
        if(res.success) {
          if(res.message == 'User already reported') {
            notification.info('User already reported')
          } else {
            notification.success('Thank you for reporting, we will get back to you soon!')
          }
        }
        this.$emit('selectValue', {
          field: this.$attrs.fieldName,
        })
      })
      // alert (this.group)
    }
  }

}
</script>
<style lang="scss">
// $

</style>
