<template>
  <q-page class="delet-acc head-fix">
    <div class="common-head fixed-top">
      <div class="ch-left">
        <router-link :to="{ name: 'changeDetails' }"
          ><i class="fas fa-arrow-left"></i
        ></router-link>
        {{ $q.lang.common.settings.changeEmail }}
      </div>
    </div>
    <div class="common-inner">
      <div class="">
        <h5>{{$q.lang.common.changeEmail.enter}}</h5>
        <p>{{$q.lang.common.changeEmail.verify}}</p>
        <div class="form-group">
          <q-input v-model="text" label="Email Address" />
        </div>
        <p class="flex justify-end"><q-btn class="btn3" label="Send OTP" /></p>
      </div>
      <div class="">
        <h5>{{$q.lang.common.changeEmail.enterCode}}</h5>
        <p>Sent to info@gmail.com</p>
        <div class="form-group otp-digit">
          <q-input v-model="text" class="q-mr-md" label="" />
          <q-input v-model="text" class="q-mr-md" label="" />
          <q-input v-model="text" class="q-mr-md" label="" />
          <q-input v-model="text" class="q-mr-md" label="" />
          <q-input v-model="text" class="q-mr-md" label="" />
          <q-input v-model="text" class="q-mr-md" label="" />
        </div>
        <p class="flex justify-between">
          <q-btn class="btn3" label="Resend OTP" /><q-btn
            @click="open('acc-delete', acdelete)"
            class="btn3"
            label="Submit"
          />
        </p>
      </div>
    </div>
    <q-dialog v-model="allpopup" position="bottom" :class="dialogClass">
      <component
        :is="currentFrom"
        :sendValue="sendValue"
        :fieldName="currentField"
        :sendDisplayField="sendDisplayField"
        :sendOptions="sendOptions"
        v-on:selectValue="setValue"
      >
      </component>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, defineComponent, defineAsyncComponent } from 'vue'
import useDialog from 'src/composable/useDialog'
export default defineComponent({
  name: 'changeEmail',
  components: {
    'acc-delete': defineAsyncComponent(() =>
      import('../components/common/acc-delete.vue')
    ),
  },

  setup() {
    const { allpopup, currentFrom, currentField, dialogClass, open } =
      useDialog()
    return {
      allpopup,
      currentFrom,
      currentField,
      dialogClass,
      open,
    }
  },
  methods: {
    setValue(data) {
      console.log(data)
      this.allpopup = false
      this[`${data.field}`] = data.value
    },
  },
})
</script>
<style lang="scss">
// $
.delet-acc {
  // .common-head {
  //   background: $blue;
  //   color: $whight;
  //   .ch-left {
  //     a {
  //       color: $whight;
  //     }
  //   }
  // }
  .common-inner {
    padding-left: 20px;
    padding-right: 20px;
    .otp-digit {
      display: flex;
      .q-field {
        width: 15%;
        text-align: center;
        background: transparent;
        border: 0;
        border-bottom: 1px solid $text-color1;
        color: $text-color1;
        input {
          text-align: center;
        }
      }
    }
  }
}
.q-card__section--vert {
  padding-left: 0;
  padding-right: 0;
}
</style>
