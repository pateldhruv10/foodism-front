<template>
  <div class="full-h contest-form">
    <q-form ref="contestForm" @submit="submitForm()">
      <q-card-section class="row items-center pop-head">
        <h6>
          <span class="q-mr-sm" v-close-popup>
            <i class="fas fa-arrow-left"></i>
          </span>
          {{ $q.lang.contest.contestForm.title }}
        </h6>
        <q-space />
      </q-card-section>

      <q-card-section class="pop-body popup-fix-bottm">
        <div class="">
          <div class="row">
            <div class="col-12 form-group">
              <q-input
                v-model="formData.full_name"
                :label="$q.lang.contest.contestForm.fullName.label"
                :placeholder="$q.lang.contest.contestForm.fullName.placeHolder"
                :rules="[(val) => required(val, 'name')]"
              />
            </div>
            <div class="col-12 form-group">
              <q-input
                v-model="formData.email"
                :label="$q.lang.contest.contestForm.email.label"
                :placeholder="$q.lang.contest.contestForm.email.placeHolder"
                :rules="[
                  (val) => required(val, 'email'),
                  (val) => isEmail(val),
                ]"
              />
            </div>
            <div class="col-12 form-group">
              <q-input
                maxlength="10"
                v-model="formData.phone"
                :label="$q.lang.contest.contestForm.mobile.label"
                :placeholder="$q.lang.contest.contestForm.mobile.placeHolder"
                :rules="[(val) => required(val, 'mobile number')]"
              />
            </div>
            <div class="col-12 form-group">
              <div>
                <label for="communication_preffrence"
                  >Communication Preference</label
                >
              </div>
              <div class="cmp">
                <q-radio
                  v-model="formData.communication_preference"
                  val="phone"
                  label="Phone"
                />
                <q-radio
                  v-model="formData.communication_preference"
                  val="email"
                  label="Email"
                />
                <q-radio
                  v-model="formData.communication_preference"
                  val="any"
                  label="Any"
                /><br />
              </div>
            </div>
          </div>
          <div class="fixed-bottom q-px-lg q-py-md box-shadow-cus">
            <q-btn
              type="submit"
              class="btn full-width btn1"
              flat
              dense
              :label="$q.lang.common.btn.register"
            />
          </div>
        </div>
      </q-card-section>
      <q-dialog v-model="allpopup" position="bottom" :class="dialogClass">
        <component
          :is="currentFrom"
          :sendValue="sendValue"
          :fieldName="currentField"
          v-on:selectValue="setValue"
        ></component>
      </q-dialog>
    </q-form>
  </div>
</template>

<script>
import { defineAsyncComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import useDialog from 'src/composable/useDialog'
import api from '../../apis/index'
import notification from 'src/boot/notification'
export default {
  name: 'contestForm',
  props: {
    sendValue: {
      type: Object || Array,
      default: [],
    },
  },
  components: {
    'registration-success': defineAsyncComponent(() =>
      import('../../components/common/registration-success.vue')
    ),
  },
  setup(props) {
    const { allpopup, currentFrom, currentField, dialogClass, open } =
      useDialog()
    const store = useStore()
    const user = computed(() => {
      return store.getters['auth/getUser']
    })

    return {
      user,
      allpopup,
      currentFrom,
      currentField,
      dialogClass,
      open,
      formData: ref({
        event_id: props.sendValue,
        full_name: user.value.name,
        email: user.value.email_visibility == 1 ? user.value.email : '',
        phone: user.value.mobile_visibility == 1 ? user.value.ph_number : '',
        communication_preference: 'any',
      }),
    }
  },

  methods: {
    setValue(data) {
      console.log(data)
      this.allpopup = false
      this[`${data.field}`] = data.value
    },
    submitForm() {
      console.log(this.formData)
      api
        .post('/event/add-participant', this.formData)
        .then((result) => {
          if (result.success) {
            const userData = {
              user_id: this.user.id,
              event_id: result.data.event_id,
            }
            this.$store.commit('home/addParticipant', userData)
            this.open('registration-success')
            // notification.success(result.message)
          } else {
            this.allpopup = false
            notification.error(result.message)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
<style lang="scss">
// $
.contest-form {
  .pop-head {
    @extend .background1;
    border-radius: 0;
    padding-bottom: 30px;
    h6 {
      @extend .primary-font-semibold;
    }
  }
  .pop-head::after {
    background: $whight;
    height: 15px;
    width: 100%;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .cmp {
    margin-left: -10px;
    .q-radio {
      margin-right: 20px;
    }
  }
}
</style>
