<template>
  <ul
    class="contest-user-list"
    v-if="item.participant && item.participant.length"
    @click="open(isLoggedIn ? 'event-participants' : 'is-logout', item)"
  >
    <li v-if="item.participant[0]">
      <user-image :user_image="item.participant[0].user_id" />
    </li>
    <li v-if="item.participant[1]">
      <user-image :user_image="item.participant[1].user_id" />
    </li>
    <li v-if="item.participant.length > 2" class="plus-count">
      <a href="javascript:void(0)">+ {{ item.participant.length - 2 }}</a>
    </li>
    <li v-if="item.participant.length == 0" class="plus-count">
      <a href="javascript:void(0)">0</a>
    </li>
  </ul>
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
import { computed, defineAsyncComponent } from 'vue'
import useDialog from 'src/composable/useDialog'
import { useStore } from 'vuex'

export default {
  name: 'ParticipantCount',
  props: {
    item: {
      type: Array || Object,
      default: () => [],
    },
  },
  components: {
    'user-image': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "user-image" */
        /* webpackMode: "lazy" */
        'components/user/user-image.vue'
      )
    ),
    'event-participants': defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "event-participants" */
        /* webpackMode: "lazy" */
        './event-participants.vue'
      )
    ),
  },
  setup(props) {
    const store = useStore()
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
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
      isLoggedIn: computed(() => {
        return store.getters['auth/isLoggedIn']
      }),
    }
  },
}
</script>
