<template>
  <div class="cus-popup">
    <div class="center-pop-head relative-position">
      <h6>{{$q.lang.common.isLogout.Title}}</h6>
      <q-btn class="absolute-right" icon="close" flat round dense v-close-popup />
    </div>
    <q-card-section class="pop-body">
      <p>{{$q.lang.common.isLogout.Description}}</p>
      <div class="cp-btn">
        <q-btn v-close-popup class="btn2" :label="$q.lang.common.btn.cancel" />
        <q-btn
          @click="openNext()"
          class="btn1"
          :label="$q.lang.common.btn.login"
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
import { defineComponent } from '@vue/runtime-core';
import useDialog from 'src/composable/useDialog';

export default defineComponent({
  name: "IsLogout",
  props: {
    sendValue: {
      type: String,
      default: '',
    },
  },
  setup(){
    const { allpopup, currentFrom, currentField, dialogClass, open } = useDialog();
    return {
      allpopup,
      currentFrom,
      currentField,
      dialogClass,
      open
    }
  },
  methods: {
    openNext() {
      this.$router.push({ name: 'index' })
    }
  },
})
</script>
<style lang="scss">
// $
.cp-btn {
  .q-btn {
    @extend .border-radius2;
    margin-right: 15px;
    text-transform: capitalize;
    min-width: 115px;
  }
}
</style>
