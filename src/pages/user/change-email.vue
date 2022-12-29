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
          <q-input  v-model="text" type="email" :autofocus="true" label="Email Address" />
        </div>
        <p class="flex justify-end"><q-btn class="btn3" @click="sendOtpReq" label="Send OTP" /></p>
      </div>
      <div class="" v-if="field">
           <h5>{{$q.lang.common.changeEmail.enterCode}}</h5>
        <p>Sent to {{text}}</p>
        <!-- <div class="form-group otp-digit">
          <q-input v-model="text" class="q-mr-md" label="" />
          <q-input v-model="text" class="q-mr-md" label="" />
          <q-input v-model="text" class="q-mr-md" label="" />
          <q-input v-model="text" class="q-mr-md" label="" />
          <q-input v-model="text" class="q-mr-md" label="" />
          <q-input v-model="text" class="q-mr-md" label="" />
        </div> -->
        <div class="form-group otp-digit">
          <otp-input v-model="otp"
              :rules="[
                (val) => required(val, 'otp'),
              ]"
              ref="otpInput"
              input-classes="otp-input"
              separator="-"
              :num-inputs="6"
              inputClasses="q-mr-md"
              :should-auto-focus="true"
              :is-input-num="true"
              @on-change="handleOnChange"
              @on-complete="handleOnComplete"/>
          </div>
        <p class="flex justify-between">
          <q-btn class="btn3" @click="sendOtpReq" label="Resend OTP" /><q-btn
            @click="cahngeEmail()"
            type="submit"
            :disable="otpfield"
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
import { ref, defineComponent, defineAsyncComponent, computed } from 'vue'
import useDialog from 'src/composable/useDialog'
import api from '../../apis/index'
export default defineComponent({
  name: 'changeEmail',
  components: {
     'otp-input': defineAsyncComponent(() => import('components/auth/otp-input.vue')),
      'details-updated': defineAsyncComponent(() =>
      import('../../components/common/details-updated.vue')
    ),
    // 'acc-delete': defineAsyncComponent(() =>
    //   import(
    //     /* webpackChunkName: "acc-delete" */
    //     /* webpackMode: "lazy" */
    //     /* webpackInclude: /\.vue$/ */
    //     'src/components/common/acc-delete.vue'
    //   )
    // ),
  },

  setup() {
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
      otp : ref(''),
      text : ref(null),
      allpopup,
      currentFrom,
      sendValue,
      sendDisplayField,
      currentField,
      dialogClass,
      field: ref(false),
      otpfield : ref(true),
      open,
      user : computed(() => {
        return LocalStorage.getItem('user')
      }),

    }
  },
  created(){
    this.$store.dispatch('auth/me')
  },
  methods: {
     handleOnComplete(value) {
      console.log('OTP completed: ', value);
      this.otp = value;

      // this.onSubmit();
    },
    handleOnChange(value) {
      this.otp = value;
        if(value.length >= 6){
        this.otpfield = false
        }else{
        this.otpfield = true
        }
      console.log('OTP changed: ', value);
    },
    handleClearInput() {
      this.$refs.otpForm.clearInput();
    },
    sendOtpReq(){
      if(this.text.length > 12){
        this.field = true
      }
    },
    cahngeEmail(){
      this.open('details-updated' , 'Email updated successfully !')
    }
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
      .q-mr-md{
        width: 45px !important;
        text-align: center;
      }
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
// .q-card__section--vert {
//   padding-left: 0;
//   padding-right: 0;
// }
</style>
