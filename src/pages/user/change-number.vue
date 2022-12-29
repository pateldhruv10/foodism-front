<template>
  <q-page class="delet-acc head-fix">
    <div class="common-head fixed-top">
      <div class="ch-left">
        <router-link :to="{ name: 'changeDetails' }"
          ><i class="fas fa-arrow-left"></i
        ></router-link>
        {{ $q.lang.common.settings.changeMobileNo }}
      </div>
    </div>
    <div class="common-inner">
      <div class="">
        <h5>{{ $q.lang.common.changeMobNum.enter }}</h5>
        <p>
          {{ $q.lang.common.changeMobNum.verify }}
        </p>
        <div class="form-group">
          <q-input
            maxlength="10"
            :autofocus="true"
            type="number"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            v-model="text"
            label="Mobile No"
          />
        </div>
        <p class="flex justify-end">
          <q-btn class="btn3" @click="sendOtpReq" label="Send OTP" />
        </p>
      </div>
      <div class="" v-if="field">
        <h5>{{ $q.lang.common.changeMobNum.enterCode }}</h5>
        <p>Sent to +91 {{ text }}</p>
        <!-- <div class="form-group otp-digit">
          <q-input v-model="text" class="q-mr-md" label="" />
          <q-input v-model="text" class="q-mr-md" label="" />
          <q-input v-model="text" class="q-mr-md" label="" />
          <q-input v-model="text" class="q-mr-md" label="" />
          <q-input v-model="text" class="q-mr-md" label="" />
          <q-input v-model="text" class="q-mr-md" label="" />
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
            @click="changeNum()"
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
import { LocalStorage, Notify } from 'quasar'
export default defineComponent({
  name: 'ChangeNumber',
  components: {
    'details-updated': defineAsyncComponent(() =>
      import('../../components/common/details-updated.vue')
    ),
    'otp-input': defineAsyncComponent(() =>
      import('components/auth/otp-input.vue')
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
      otp: ref(''),
      text: ref(null),
      allpopup,
      otpfield: ref(true),
      field: ref(false),
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
    this.$store.dispatch('auth/me')
  },
  methods: {
    handleOnComplete(value) {
      console.log('OTP completed: ', value)

      // this.onSubmit();
    },
    handleOnChange(value) {
      this.otp = value

      if (value.length >= 6) {
        this.otpfield = false
      } else {
        this.otpfield = true
      }
      console.log('OTP changed: ', value)
    },
    handleClearInput() {
      this.$refs.otpForm.clearInput()
    },
    sendOtpReq() {
      var new_num = '+91' + this.text
      console.log(this.user.ph_number)
      console.log(new_num)
      if (this.user.ph_number == new_num) {
        Notify.create({
          type: 'negative',
          message: 'Mobile number already exist !',
          timeout: 500,
        })
        // alert('same hi to h')
      } else {

        var data = {
          new_phone_number: '+91' + this.text,
        }
        api.post('changeDetails/mobile', data).then((res) => {
          if (res.success) {
            Notify.create({
              type : 'positive',
              message :'Otp sent successfully',
              timeout: 1000
            })
            this.field = true
          }
        })
      }
      // alert('df')
    },
    changeNum() {
      var data = {
        new_phone_number: '+91' + this.text,
        otp: this.otp,
      }
      api.put('changeDetails/mobile/verify', data).then((res) => {
        // console.log('--------> ' + res.fail)
        // alert('gg')
        if (res.fail == false) {
          Notify.create({
            type: 'negative',
            message: res.message,
            timeout: 500,
          })
          // alert('otp to sahi dal bhai')
        } else {
          this.open('details-updated', 'Mobile number updated successfully !')
        }
      })
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
      .q-mr-md {
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
.q-card__section--vert {
  padding-left: 0;
  padding-right: 0;
}
</style>
