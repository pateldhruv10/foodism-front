<template>
  <div class="select-cus-popup">
    <q-card-section class="row items-center pop-head">
      <h6>{{ $q.lang.common.userOption.Title }}</h6>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="pop-body">
      <div class="user-op-list">
        <ul>
          <li @click="profile">
            <router-link to=""
              ><span>{{ $q.lang.common.userOption.Profile }}</span
              ><q-img src="~assets/right-arrow.svg"></q-img
            ></router-link>
          </li>
          <li @click="open('block-user', user_id)">
            <span>{{ $q.lang.common.userOption.Block }}</span
            ><q-img src="~assets/right-arrow.svg"></q-img>
          </li>
          <li @click="open('report-user', user_id)">
            <span>{{ $q.lang.common.userOption.Report }}</span
            ><q-img src="~assets/right-arrow.svg"></q-img>
          </li>
        </ul>
      </div>
      <!-- <div class="absolute-bottom q-px-lg q-py-md box-shadow-cus">
        <q-btn
        class="btn full-width btn1"
        flat
        dense> Save </q-btn>
      </div> -->
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
import { defineAsyncComponent, ref, computed } from 'vue'
import useDialog from 'src/composable/useDialog'

export default {
  name: 'useroption',
  components: {
    'block-user': defineAsyncComponent(() =>
      import('src/components/user/block-user.vue')
    ),
    'report-user': defineAsyncComponent(() =>
      import('src/components/user/report-user.vue')
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
    const useroption = ref(false)

    return {
      allpopup,
      currentFrom,
      currentField,
      sendValue,
      sendDisplayField,
      dialogClass,
      open,
      user_id: ref(0),
      useroption,

      share: computed(() => {
        return {
          type: 'recipe',
          title: 'Idli Sambhar',
          images: 'https://localhost:8080/img/c7.35cba6d3.jpg',
          date: '2020-06-01',
          slug: 'idli-sambhar',
        }
      }),
    }
  },
  created() {
    this.test()
    // this.$emit('selectValue', {
    //     field: this.$attrs.fieldName,
    //   })
  },
  methods: {
    test() {
      this.user_id = this.$attrs.fieldName
      // alert(this.user_id)
    },
    setValue(data) {
      // console.log(data)
      this.allpopup = false
      this.$emit('selectValue')
      // this[`${data.field}`] = data.value
    },
    profile() {
      this.$router.push({
        name: 'profile-view',
        params: { slug: this.user_id },
      })
    },
  },
}
</script>
<style lang="scss">
// $
.user-op-list {
  ul {
    padding-left: 0;
    margin-top: 0;
    // li{
    //   font-size: 18px;
    //   padding: 5px 0;
    //   // list-style-type: none;
    // padding-left: 0;
    // margin-top: 0;
    li {
      font-size: 18px;
      padding: 15px 0;
      color: $text-color2;
      list-style-type: none;
      border-bottom: 1px solid #d2d2d2;
      display: flex;
      justify-content: space-between;
      align-items: center;
      a {
        color: $text-color2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }
      .q-img {
        width: 10px;
        opacity: 0.5;
      }
    }
    li:first-child {
      padding-top: 0;
    }
  }
}
</style>
