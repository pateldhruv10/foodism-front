<template>
  <div class="event-btn flex">
    <q-btn
      v-if="!isUserItem && !isParticipant && !participateDisabled"
      @click="open(isLoggedIn ? 'join-contest' : 'is-logout', item.id)"
      class="btn1"
      :label="$q.lang.contest.interested"
    />
    <q-btn
      v-else-if="!isUserItem && isParticipant"
      class="btn3"
      @click="removeParticipant()"
      :label="$q.lang.contest.revoke"
    />

    <participant-count v-if="item.participant" :item="item" />
  </div>
  <!-- <reaction-box /> -->
  <div class="contest-bottom">
    <slot name="contest-bottom" />
  </div>

  <q-dialog v-model="allpopup" position="bottom" :class="dialogClass">
    <component
      :is="currentFrom"
      :sendValue="sendValue"
      :fieldName="currentField"
      :sendDisplayField="sendDisplayField"
      v-on:selectValue="setValue"
    ></component>
  </q-dialog>
</template>

<script>
// used in host event box, event detail page, contest detail page, conttest box
import { defineAsyncComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import useDialog from 'src/composable/useDialog'
import useDate from 'src/composable/useDate'
import api from '../../apis/index'
export default {
  name: 'ContestBottom',
  props: {
    isUserItem: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    'reaction-box': defineAsyncComponent(() =>
      import('components/common/reaction-box.vue')
    ),
    'participant-count': defineAsyncComponent(() =>
      import('components/contest/participant-count.vue')
    ),
    'join-contest': defineAsyncComponent(() =>
      import('components/common/join-contest.vue')
    ),
  },
  setup(props) {
    const {
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
    } = useDialog()

    const { getDiffInHour } = useDate()

    const store = useStore()

    const user = computed(() => {
      return store.getters['auth/getUser']
    })

    return {
      removeContest: ref(false),
      getDiffInHour,
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
      formData: ref({
        event_id: props.item.id,
        full_name: user.value?.name,
        email: user.value?.email,
        phone: user.value?.ph_number,
        communication_preference: 'any',
      }),
      user,
      isLoggedIn: computed(() => {
        return store.getters['auth/isLoggedIn']
      }),
      isParticipant: computed(() => {
        return (
          props.item?.participant?.find((c) => c.user_id == user.value?.id) ??
          false
        )
      }),
    }
  },

  methods: {
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
    removeParticipant() {
      var data = {
        event_id: this.item.id,
        user_id: this.user.id,
      }
      if (this.currentRouteName === 'profile-view') {
        this.$q.dialog({
          title: 'Confirm',
          message: `Are you sure ?`,
          color: 'negative',
          ok: `Yes, I'm sure`,
          cancel: 'Cancel',
          default: 'cancel',
        }).onOk(() =>{
          this.$store.commit('home/removeParticipantProfile', data)
        })
      } else {
        this.$store.commit('home/removeParticipant', data)
      }

      this.$emit('selectValue', {
        value: 'false',
      })
      const formData = new FormData()
      formData.append('event_id', this.item.id)
      console.log(formData)
      api.delete('/event/remove-participant', formData).then((result) => {
        if (result.success) {
          this.allpopup = false
        }
      })
    },
    addContest() {
      if (this.removeContest) {
        this.removeContest = false
      }
    },

    setValue(data) {
      this.allpopup = false
      this.removeContest = true
      this[`${data.field}`] = data.value
    },
  },

  computed: {
    currentRouteName() {
      return this.$route.name
    },
    participateDisabled() {
      if (this.getDiffInHour(this.item.start_date) < 24) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>
<style lang="scss">
// $
.post-btm {
  // border-top: 1px solid $bg5;
  padding-top: 5px;
  ul {
    padding: 0;
    margin-bottom: 0;
    margin-top: 5px;
    li {
      list-style-type: none;
      margin-right: 15px;
      display: flex;
      align-items: center;
      img {
        height: 25px;
      }
      .q-img {
        width: 30px;
      }
      i {
        font-size: 28px;
      }
    }
    li:last-child {
      margin-right: 0;
    }
  }
}
</style>
