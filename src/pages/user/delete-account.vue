<template>
  <q-page class="delet-acc head-fix">
    <header-with-backbutton
      :title="$q.lang.common.settings.deleteAccount"
      extraClass="fixed-top"
    />
    <div class="common-inner">
      <div class="">
        <h5>Enter mobile number</h5>
        <p>Verify mobile number to permanently delete your account</p>
        <div class="form-group">
          <q-input v-model="text" label="Mobile No" disable />
        </div>
        <p class="flex justify-end">
          <q-btn class="btn3" @click="sendOtpReq" label="Send OTP" />
        </p>
      </div>
      <div class="" v-if="field">
        <h5>Enter your veryfication code</h5>
        <p>Sent to &nbsp;&nbsp; {{ user.ph_number }}</p>
        <!-- <div class="form-group otp-digit">
          <q-input v-model="otp" class="q-mr-md" label="" />
          <q-input v-model="otp" class="q-mr-md" label="" />
          <q-input v-model="otp" class="q-mr-md" label="" />
          <q-input v-model="otp" class="q-mr-md" label="" />
          <q-input v-model="otp" class="q-mr-md" label="" />
          <q-input v-model="otp" class="q-mr-md" label="" />
        </div> -->
        <div class="form-group otp-digit">
          <otp-input
            v-model="otp"
            :rules="[(val) => required(val, 'otp')]"
            ref="otpInput"
            input-classes="otp-input"
            separator="-"
            :num-inputs="6"
            inputClasses="q-mr-md"
            :should-auto-focus="true"
            :is-input-num="true"
            @on-change="handleOnChange"
            @on-complete="handleOnComplete"
          />
        </div>

        <p class="flex justify-between">
          <q-btn class="btn3" @click="sendOtpReq" label="Resend OTP" /><q-btn
            @click="open('acc-delete', otp)"
            :disable="otpfield"
            type="submit"
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
import { LocalStorage, Notify } from 'quasar'
export default defineComponent({
  name: 'DelAccount',

  components: {
    'acc-delete': defineAsyncComponent(() =>
      import('../../components/common/acc-delete.vue')
    ),
    'otp-input': defineAsyncComponent(() =>
      import('components/auth/otp-input.vue')
    ),
    'header-with-backbutton': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "common-header" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        'src/components/layouts/header-with-backbutton.vue'
      )
    ),
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
      text: ref(null),
      allpopup,
      field: ref(false),
      otpfield: ref(true),
      currentFrom,
      sendValue,
      sendDisplayField,
      currentField,
      dialogClass,
      open,
      user: computed(() => {
        return LocalStorage.getItem('user')
      }),
    }
  },
  created() {
    this.$store.dispatch('auth/me').then(() => {
      this.text = this.user.ph_number
    })
  },
  methods: {
    handleOnComplete(value) {
      console.log('OTP completed: ', value)
      this.otp = value

      // this.onSubmit();
    },
    handleOnChange(value) {
      this.otp = value
      console.log(value.length)
      if (value.length >= 6) {
        this.otpfield = false
      } else {
        this.otpfield = true
      }
      console.log('OTP changed: ', value, this.otpfield)
    },
    handleClearInput() {
      this.$refs.otpForm.clearInput()
    },
    // watch(){
    //  if( value.length >= 6){
    //   this.otpfield = true
    //   console.log('------><------')
    //  }
    // },
    sendOtpReq() {
      api.get('deleteAccountReq').then((res) => {
        if (res.success) {
          this.field = true
        }
      })
      // alert('df')
    },
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
  .common-head {
    // background: $primary;
    // color: $whight;
    .ch-left {
      a {
        // color: $whight;
      }
    }
  }
  .common-inner {
    padding-left: 20px;
    padding-right: 20px;
    .otp-digit {
      display: flex;
      justify-content: space-around;
      .q-mr-md {
        width: 13% !important;
        text-align: center;
        margin-right: 0 !important;
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
      input{
        border:0px;
        border-bottom: 1px solid #d2d2d2;
      }
    }
  }
}
.q-card__section--vert {
  padding-left: 0;
  padding-right: 0;
}
</style>
