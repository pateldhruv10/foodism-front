<template>
  <div class="select-cus-popup">
    <q-card-section class="row items-center pop-head">
      <h6>Block User</h6>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="pop-body popup-fix-bottm">
      <div class="user-op-list q-pb-md">
        <q-option-group :options="blockuser" type="radio" v-model="group" />
      </div>

      <div class="absolute-bottom q-px-lg q-py-md box-shadow-cus">
        <q-btn
          class="btn full-width btn1"
          flat
          @click="submit"
          type="submit"
          dense
        >
          Save
        </q-btn>
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
import { computed, defineAsyncComponent, ref } from 'vue'
import api from '../../apis/index'
import useDialog from 'src/composable/useDialog'
import { useStore } from 'vuex'

export default {
  name: 'BlockUser',
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
    const group = ref()
    const store = useStore()
    return {
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      Recipes: computed(() => {
        return store.getters['recipe/recipes']
      }),
      open,
      user_id: ref(0),
      group,
      blockuser: [
        { label: 'Unfollow user', value: 'unfollow' },
        { label: 'Block all content', value: 'fullblock' },
        { label: 'Offensive to me', value: 'offensive' },
      ],
    }
  },
  created() {
    this.id()
  },
  components: {
    'otp-input': defineAsyncComponent(() =>
      import('components/auth/otp-input.vue')
    ),
  },
  methods: {
    id() {
      this.user_id = this.$attrs.sendValue
      // alert(this.user_id)
    },
    thingsToBlock(types) {
      const followingData = {
        following_id: this.user_id,
      }
      api.delete('/unfollow', followingData).then((res) => {
        api.get(`/followers/${this.user_id}`).then((res) => {
          this.$store.commit('auth/setUserFollowers', res.data)
          this.$store.commit('auth/setUnfollow', this.user_id)
        })
      })
      this.$emit('selectValue', {
        field: this.$attrs.fieldName,
      })
        this.$store.commit('auth/setUserListFollowers', this.user_id)
      api.delete(`/followers/remove/${this.user_id}`)
      // api.delete('/unfollow', followingData)
      const data = {
        user_id: this.user_id,
        type: types,
      }
      api.post('block', data)
      // this.$store.commit('recipe/blockUser', this.user_id)
      // this.$store.commit('home/blockUser', this.user_id)
    },

    submit() {
      if (this.group == 'unfollow') {
        this.thingsToBlock('unfollow')
      }
      if (this.group == 'fullblock') {
        this.thingsToBlock('blockallcontent')
      }
      if (this.group == 'offensive') {
        this.thingsToBlock('offensivetome')
      }
    },
  },
}
</script>
<style lang="scss">
// $
</style>
