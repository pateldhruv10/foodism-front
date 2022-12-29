
<template>
  <div class="cus-popup" v-if="isLoggedIn">
    <div class="center-pop-head relative-position">
      <h6>{{ $q.lang.common.joinContest.Title }}</h6>
      <q-btn
        class="absolute-right"
        icon="close"
        flat
        round
        dense
        v-close-popup
      />
    </div>
    <q-card-section class="pop-body">
      <p>{{ $q.lang.common.joinContest.Description }}</p>
      <div class="cp-btn">
        <q-btn v-close-popup class="btn2" :label="$q.lang.common.btn.cancel" />
        <q-btn
          @click="openNext()"
          class="btn1"
          :label="$q.lang.common.btn.yesConfirm"
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
import { defineComponent, defineAsyncComponent, computed, ref } from 'vue'
import useDialog from 'src/composable/useDialog'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'JoinContest',
  props: {
    sendValue: {
      type: String,
      default: '',
    },
  },
  components: {
    'emoji-selection': defineAsyncComponent(() =>
      import('../../components/common/emoji-selection.vue')
    ),
    'contest-form': defineAsyncComponent(() =>
      import('../../components/common/contest-form.vue')
    ),
  },
  setup(){
    const store = useStore()

    const { allpopup, currentFrom, currentField, dialogClass, open } = useDialog();
    return {
      allpopup,
      currentFrom,
      currentField,
      dialogClass,
      open,
      user: computed(() => {
        return store.getters['auth/getUser']
      }),
      isLoggedIn: computed(() => {
        return store.getters['auth/isLoggedIn']
      }),
    }
  },
  created(){
    this.$store.dispatch('auth/me')
  },
  methods: {
    openNext() {
      if (this.isLoggedIn) {
        this.open('contest-form', this.sendValue)
      } else {
        this.$router.push({ name: 'index' })
      }
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
