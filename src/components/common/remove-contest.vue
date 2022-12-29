<template>
  <div class="cus-popup">
    <div class="center-pop-head relative-position">
      <h6>{{$q.lang.common.removeContest.Title}}</h6>
      <q-btn class="absolute-right" icon="close" flat round dense v-close-popup />
    </div>
    <q-card-section class="pop-body">
      <p>{{$q.lang.common.removeContest.Description}}</p>
      <div class="cp-btn">
        <q-btn v-close-popup class="btn2" :label="$q.lang.common.btn.cancel" />
        <q-btn @click="removeParticipant(val)" class="btn1" :label="$q.lang.common.btn.yesConfirm"/>
      </div>
    </q-card-section>
  </div>
  <q-dialog v-model="allpopup" position="bottom" :class="dialogClass">
    <component :is="currentFrom" :sendValue="sendValue" :fieldName="currentField" v-on:selectValue="setValue"></component>
  </q-dialog>
</template>

<script>
import { defineComponent, defineAsyncComponent,computed,ref } from 'vue';
import useDialog from 'src/composable/useDialog';
import { useStore } from 'vuex';
import api from '../../apis/index';

export default defineComponent({
  name: "removeContest",
   props: {
    sendValue : {
      type: Object || Array,
      default: [],
    }
  },

  setup(props){

    const store = useStore()
    const { allpopup, currentFrom, currentField,  dialogClass, open } = useDialog();
    const event_id = ref(props.sendValue)
    return {
      allpopup, currentFrom, currentField,  dialogClass, open ,
      user : computed(() => {
        return store.getters['auth/getUser'];
      }),
      isLoggedIn: computed( () => {
        return store.getters['auth/isLoggedIn'];
      }),

      event_id

    }
  },
  methods: {
    setValue(data) {
      console.log(data)
      this.allpopup = false
      this[`${data.field}`] = data.value
    },
    removeParticipant(){
      var data = {
        event_id : this.event_id,
        user_id : this.user.id
      }
      this.$store.commit('home/removeParticipant', data)
      this.$emit('selectValue',{
        value:"false"
      })
      const formData = new FormData()
      formData.append('event_id', this.event_id)
      console.log(formData)
      api.delete('/event/remove-participant' , formData ).then((result) =>{
        if(result.success){
            this.allpopup = false;
        }
      })
    }
  }
})
</script>
<style lang="scss">
// $
.cp-btn{
  .q-btn{
    @extend .border-radius2;
    margin-right: 15px;
    text-transform: capitalize;
    min-width: 115px;
  }
}
</style>
